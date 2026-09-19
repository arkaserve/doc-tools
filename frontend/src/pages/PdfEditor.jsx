import { useState, useEffect, useRef, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import FileUploadZone from '../components/FileUploadZone'
import toast from 'react-hot-toast'

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174'

function hexToRgbLib(hex) {
  const n = parseInt(hex.replace('#',''), 16)
  return rgb(((n>>16)&255)/255, ((n>>8)&255)/255, (n&255)/255)
}

let _id = 0
const uid = () => ++_id

const TOOL_LIST = [
  { id: 'select',    label: 'Select',    icon: '↖' },
  { id: 'text',      label: 'Text',      icon: 'T' },
  { id: 'highlight', label: 'Highlight', icon: '▬' },
  { id: 'whitebox',  label: 'Whiteout',  icon: '□' },
  { id: 'draw',      label: 'Draw',      icon: '✏' },
]

const COLOR_PRESETS = ['#000000','#e53e3e','#dd6b20','#d69e2e','#38a169','#3182ce','#805ad5','#ffffff']

export default function PdfEditor() {
  const [pdfjsReady, setPdfjsReady] = useState(!!window.pdfjsLib)
  const [pdfFile,    setPdfFile]    = useState(null)
  const [pdfBytes,   setPdfBytes]   = useState(null)
  const [pdfjsDoc,   setPdfjsDoc]   = useState(null)
  const [currentPage,setCurrentPage]= useState(1)
  const [numPages,   setNumPages]   = useState(0)
  const [annotations,setAnnotations]= useState({})
  const [history,    setHistory]    = useState([{}])
  const [histIdx,    setHistIdx]    = useState(0)
  const [tool,       setTool]       = useState('text')
  const [color,      setColor]      = useState('#000000')
  const [fontSize,   setFontSize]   = useState(16)
  const [lineWidth,  setLineWidth]  = useState(3)
  const [isDrawing,  setIsDrawing]  = useState(false)
  const [drawStart,  setDrawStart]  = useState(null)
  const [liveDraw,   setLiveDraw]   = useState(null)
  const [editingId,  setEditingId]  = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [saving,     setSaving]     = useState(false)
  const [pageScales, setPageScales] = useState({})

  const pdfCanvasRef  = useRef(null)
  const drawCanvasRef = useRef(null)
  const annotRef      = useRef(null)  // annotation overlay div
  const scrollAreaRef = useRef(null)

  /* ── Load PDF.js CDN ── */
  useEffect(() => {
    if (window.pdfjsLib) return
    const s = document.createElement('script')
    s.src = `${PDFJS_CDN}/pdf.min.js`
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`
      setPdfjsReady(true)
    }
    document.head.appendChild(s)
  }, [])

  /* ── Handle file upload ── */
  const handleFile = async (files) => {
    const file = files[0]
    if (!file) return
    if (!pdfjsReady) { toast.error('PDF engine loading, try again in a second'); return }
    const buf   = await file.arrayBuffer()
    const bytes = new Uint8Array(buf)
    setPdfBytes(bytes)
    setPdfFile(file)
    setAnnotations({})
    setHistory([{}])
    setHistIdx(0)
    setCurrentPage(1)
    setSelectedId(null)
    setEditingId(null)
    const doc = await window.pdfjsLib.getDocument({ data: bytes.slice() }).promise
    setPdfjsDoc(doc)
    setNumPages(doc.numPages)
  }

  /* ── Render page — scale fills scroll area width ── */
  const renderPage = useCallback(async (pageNum) => {
    if (!pdfjsDoc || !pdfCanvasRef.current) return
    const page   = await pdfjsDoc.getPage(pageNum)
    const baseVp = page.getViewport({ scale: 1 })
    const avail  = scrollAreaRef.current ? scrollAreaRef.current.clientWidth - 48 : 900
    const scale  = Math.max(1.0, Math.min(avail / baseVp.width, 2.8))
    const vp     = page.getViewport({ scale })

    const c = pdfCanvasRef.current
    c.width  = vp.width
    c.height = vp.height
    if (drawCanvasRef.current) {
      drawCanvasRef.current.width  = vp.width
      drawCanvasRef.current.height = vp.height
    }
    setPageScales(ps => ({ ...ps, [pageNum]: scale }))

    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise
  }, [pdfjsDoc])

  useEffect(() => { renderPage(currentPage) }, [pdfjsDoc, currentPage, renderPage])

  /* ── Live freehand on overlay canvas ── */
  useEffect(() => {
    const c = drawCanvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    ctx.clearRect(0, 0, c.width, c.height)
    if (!liveDraw || liveDraw.type !== 'draw' || liveDraw.points.length < 2) return
    ctx.beginPath()
    ctx.strokeStyle = liveDraw.color
    ctx.lineWidth   = liveDraw.lineWidth
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    liveDraw.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
    ctx.stroke()
  }, [liveDraw])

  /* ── Undo / Redo ── */
  const pushHistory = (newAnnots) => {
    const stack = history.slice(0, histIdx + 1)
    stack.push(JSON.parse(JSON.stringify(newAnnots)))
    setHistory(stack)
    setHistIdx(stack.length - 1)
    setAnnotations(newAnnots)
  }

  const undo = useCallback(() => {
    if (histIdx <= 0) return
    const prev = history[histIdx - 1]
    setHistIdx(h => h - 1)
    setAnnotations(JSON.parse(JSON.stringify(prev)))
  }, [history, histIdx])

  useEffect(() => {
    const onKey = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo])

  /* ── Pointer position relative to annotation overlay ── */
  const getPos = (e) => {
    const r = annotRef.current.getBoundingClientRect()
    return { x: Math.round(e.clientX - r.left), y: Math.round(e.clientY - r.top) }
  }

  /* ── Mouse handlers ── */
  const onMouseDown = (e) => {
    if (e.target.closest('.annot-el')) return
    setSelectedId(null)
    const pos = getPos(e)

    if (tool === 'text') {
      const id = uid()
      const next = {
        ...annotations,
        [currentPage]: [...(annotations[currentPage] || []),
          { id, type:'text', x:pos.x, y:pos.y, text:'', fontSize, color }],
      }
      pushHistory(next)
      setEditingId(id)
      return
    }
    if (tool === 'draw') {
      setIsDrawing(true)
      setLiveDraw({ type:'draw', points:[pos], color, lineWidth })
      return
    }
    if (tool === 'highlight' || tool === 'whitebox') {
      setIsDrawing(true)
      setDrawStart(pos)
      setLiveDraw({ type:tool, x:pos.x, y:pos.y, w:0, h:0 })
    }
  }

  const onMouseMove = (e) => {
    if (!isDrawing || !liveDraw) return
    const pos = getPos(e)
    if (liveDraw.type === 'draw') {
      setLiveDraw(p => ({ ...p, points:[...p.points, pos] }))
    } else {
      setLiveDraw(p => ({ ...p, w: pos.x - drawStart.x, h: pos.y - drawStart.y }))
    }
  }

  const onMouseUp = () => {
    if (!isDrawing || !liveDraw) return
    setIsDrawing(false)
    const id = uid()

    if (liveDraw.type === 'draw') {
      if (liveDraw.points.length > 3) {
        const next = {
          ...annotations,
          [currentPage]: [...(annotations[currentPage] || []), { ...liveDraw, id }],
        }
        pushHistory(next)
      }
      const c = drawCanvasRef.current
      if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height)
    } else {
      const w = Math.abs(liveDraw.w), h = Math.abs(liveDraw.h)
      if (w > 6 && h > 6) {
        const x = liveDraw.w < 0 ? liveDraw.x + liveDraw.w : liveDraw.x
        const y = liveDraw.h < 0 ? liveDraw.y + liveDraw.h : liveDraw.y
        const next = {
          ...annotations,
          [currentPage]: [...(annotations[currentPage] || []), { id, type:liveDraw.type, x, y, w, h }],
        }
        pushHistory(next)
      }
    }
    setLiveDraw(null)
    setDrawStart(null)
  }

  const deleteAnnot = (id) => {
    const next = {
      ...annotations,
      [currentPage]: (annotations[currentPage] || []).filter(a => a.id !== id),
    }
    pushHistory(next)
    setSelectedId(null)
    setEditingId(null)
  }

  const updateText = (id, text) => {
    setAnnotations(prev => ({
      ...prev,
      [currentPage]: (prev[currentPage] || []).map(a => a.id === id ? { ...a, text } : a),
    }))
  }

  const commitText = (id, text) => {
    if (!text.trim()) { deleteAnnot(id); return }
    const next = {
      ...annotations,
      [currentPage]: (annotations[currentPage] || []).map(a => a.id === id ? { ...a, text } : a),
    }
    pushHistory(next)
    setEditingId(null)
  }

  /* ── Export PDF ── */
  const exportPdf = async () => {
    if (!pdfBytes) return
    setSaving(true)
    try {
      const doc  = await PDFDocument.load(pdfBytes)
      const font = await doc.embedFont(StandardFonts.Helvetica)

      for (const [ps, annots] of Object.entries(annotations)) {
        const pIdx   = parseInt(ps) - 1
        const page   = doc.getPage(pIdx)
        const { width:pw, height:ph } = page.getSize()

        const pdfJsPage = await pdfjsDoc.getPage(parseInt(ps))
        const baseVp    = pdfJsPage.getViewport({ scale: 1 })
        const scale     = pageScales[parseInt(ps)] || 1.5
        const cw        = baseVp.width  * scale   // canvas rendered width
        const ch        = baseVp.height * scale   // canvas rendered height
        const sx        = pw / cw
        const sy        = ph / ch

        for (const a of annots) {
          if (a.type === 'text' && a.text.trim()) {
            const fs = a.fontSize * sy
            page.drawText(a.text, {
              x: a.x * sx,
              y: ph - a.y * sy - fs * 0.85,
              size: fs, font,
              color: hexToRgbLib(a.color),
            })
          } else if (a.type === 'highlight') {
            page.drawRectangle({
              x: a.x * sx, y: ph - (a.y + a.h) * sy,
              width: a.w * sx, height: a.h * sy,
              color: rgb(1,1,0), opacity: 0.4,
            })
          } else if (a.type === 'whitebox') {
            page.drawRectangle({
              x: a.x * sx, y: ph - (a.y + a.h) * sy,
              width: a.w * sx, height: a.h * sy,
              color: rgb(1,1,1),
            })
          } else if (a.type === 'draw') {
            for (let i = 1; i < a.points.length; i++) {
              page.drawLine({
                start: { x: a.points[i-1].x * sx, y: ph - a.points[i-1].y * sy },
                end:   { x: a.points[i].x   * sx, y: ph - a.points[i].y   * sy },
                thickness: a.lineWidth * Math.min(sx, sy),
                color: hexToRgbLib(a.color),
              })
            }
          }
        }
      }

      const out  = await doc.save()
      const blob = new Blob([out], { type:'application/pdf' })
      const url  = URL.createObjectURL(blob)
      Object.assign(document.createElement('a'), { href:url, download:`edited_${pdfFile?.name||'document.pdf'}` }).click()
      toast.success('PDF downloaded!')
    } catch(err) {
      console.error(err)
      toast.error('Export failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  /* ══════════════════════════════════════════
     Upload screen
  ══════════════════════════════════════════ */
  if (!pdfFile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">✏️</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">PDF Editor</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Add text, highlight, draw and annotate PDFs — 100% in your browser, nothing uploaded</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-5">
          <FileUploadZone
            accept={{ 'application/pdf': ['.pdf'] }}
            files={[]}
            onFiles={handleFile}
            label="Drop a PDF here to start editing"
            hint="Your file stays in the browser — never uploaded to any server"
          />
          {!pdfjsReady && <p className="text-center text-sm text-blue-500 animate-pulse">Loading PDF engine…</p>}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              { icon:'🔤', label:'Add Text',   desc:'Click to place text anywhere' },
              { icon:'🟡', label:'Highlight',  desc:'Drag to highlight any area'   },
              { icon:'⬜', label:'Whiteout',   desc:'Cover sensitive content'       },
              { icon:'✏️', label:'Freehand',   desc:'Draw & annotate freely'        },
            ].map(f => (
              <div key={f.label} className="rounded-xl bg-gray-50 dark:bg-gray-700/40 p-3 text-center">
                <div className="text-2xl mb-1">{f.icon}</div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{f.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* ══════════════════════════════════════════
     Editor screen
  ══════════════════════════════════════════ */
  const pageAnnots = annotations[currentPage] || []
  const cursorMap  = { select:'default', text:'text', highlight:'crosshair', whitebox:'crosshair', draw:'crosshair' }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 64px)', background:'#e2e8f0', overflow:'hidden' }}>

      {/* ── Toolbar ── */}
      <div style={{ background:'#1e293b', borderBottom:'1px solid #0f172a', padding:'0 12px', display:'flex', alignItems:'center', gap:6, flexWrap:'nowrap', flexShrink:0, height:52, overflowX:'auto' }}>

        {/* Tool buttons */}
        {TOOL_LIST.map(t => (
          <button key={t.id} onClick={() => { setTool(t.id); setSelectedId(null); setEditingId(null) }}
            style={{
              padding:'5px 12px', borderRadius:7, border:'none', cursor:'pointer',
              fontSize:13, fontWeight:700, whiteSpace:'nowrap',
              background: tool === t.id ? '#3b82f6' : 'rgba(255,255,255,0.08)',
              color: tool === t.id ? '#fff' : '#94a3b8',
              transition:'all 0.15s',
            }}>
            <span style={{ marginRight:5 }}>{t.icon}</span>{t.label}
          </button>
        ))}

        <div style={{ width:1, height:28, background:'rgba(255,255,255,0.12)', margin:'0 4px', flexShrink:0 }} />

        {/* Color presets */}
        {COLOR_PRESETS.map(c => (
          <button key={c} onClick={() => setColor(c)} title={c}
            style={{ width:20, height:20, borderRadius:'50%', border: color===c ? '2.5px solid #60a5fa' : '1.5px solid rgba(255,255,255,0.25)', background:c, cursor:'pointer', flexShrink:0, padding:0 }} />
        ))}
        <input type="color" value={color} onChange={e => setColor(e.target.value)} title="Custom color"
          style={{ width:28, height:28, borderRadius:6, border:'1.5px solid rgba(255,255,255,0.2)', background:'transparent', cursor:'pointer', padding:1, flexShrink:0 }} />

        {/* Font size */}
        {(tool==='text') && (
          <>
            <div style={{ width:1, height:28, background:'rgba(255,255,255,0.12)', margin:'0 4px', flexShrink:0 }} />
            <span style={{ fontSize:12, color:'#64748b', whiteSpace:'nowrap' }}>Size</span>
            <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
              style={{ fontSize:12, borderRadius:6, border:'1px solid #334155', padding:'3px 6px', background:'#0f172a', color:'#e2e8f0', cursor:'pointer' }}>
              {[8,10,11,12,13,14,16,18,20,24,28,32,36,48].map(s => <option key={s} value={s}>{s}pt</option>)}
            </select>
          </>
        )}

        {/* Line width */}
        {(tool==='draw') && (
          <>
            <div style={{ width:1, height:28, background:'rgba(255,255,255,0.12)', margin:'0 4px', flexShrink:0 }} />
            <span style={{ fontSize:12, color:'#64748b', whiteSpace:'nowrap' }}>Width</span>
            <select value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))}
              style={{ fontSize:12, borderRadius:6, border:'1px solid #334155', padding:'3px 6px', background:'#0f172a', color:'#e2e8f0', cursor:'pointer' }}>
              {[1,2,3,4,6,8,10,14].map(s => <option key={s} value={s}>{s}px</option>)}
            </select>
          </>
        )}

        {/* Hint */}
        <span style={{ fontSize:11, color:'#475569', marginLeft:6, whiteSpace:'nowrap' }}>
          { tool==='text' && '← Click the PDF to place text' }
          { tool==='highlight' && '← Drag to highlight' }
          { tool==='whitebox'  && '← Drag to whiteout' }
          { tool==='draw'      && '← Drag to draw' }
          { tool==='select'    && '← Click annotation to select · × to delete' }
        </span>

        {/* Right actions */}
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <button onClick={undo} disabled={histIdx<=0} title="Undo (Ctrl+Z)"
            style={{ padding:'4px 10px', borderRadius:6, border:'1px solid #334155', background:histIdx<=0?'transparent':'rgba(255,255,255,0.06)', color:histIdx<=0?'#374151':'#94a3b8', cursor:histIdx<=0?'not-allowed':'pointer', fontSize:12, fontWeight:600 }}>
            ↩ Undo
          </button>
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage<=1}
            style={{ padding:'4px 10px', borderRadius:6, border:'1px solid #334155', background:'rgba(255,255,255,0.06)', color: currentPage<=1 ? '#374151' : '#94a3b8', cursor: currentPage<=1 ? 'not-allowed' : 'pointer', fontSize:14 }}>‹</button>
          <span style={{ fontSize:12, color:'#64748b', fontWeight:700, minWidth:60, textAlign:'center' }}>
            {currentPage} / {numPages}
          </span>
          <button onClick={() => setCurrentPage(p => Math.min(numPages, p+1))} disabled={currentPage>=numPages}
            style={{ padding:'4px 10px', borderRadius:6, border:'1px solid #334155', background:'rgba(255,255,255,0.06)', color: currentPage>=numPages ? '#374151' : '#94a3b8', cursor: currentPage>=numPages ? 'not-allowed' : 'pointer', fontSize:14 }}>›</button>
          <button onClick={exportPdf} disabled={saving}
            style={{ padding:'6px 18px', borderRadius:8, background:'#16a34a', color:'#fff', border:'none', cursor: saving?'wait':'pointer', fontSize:13, fontWeight:700, whiteSpace:'nowrap' }}>
            {saving ? 'Saving…' : '↓ Download PDF'}
          </button>
          <button onClick={() => { setPdfFile(null); setPdfjsDoc(null); setPdfBytes(null); setAnnotations({}) }}
            style={{ padding:'6px 10px', borderRadius:8, background:'rgba(255,255,255,0.06)', color:'#94a3b8', border:'1px solid #334155', cursor:'pointer', fontSize:13 }}>
            ✕
          </button>
        </div>
      </div>

      {/* ── Scroll area ── */}
      <div ref={scrollAreaRef} style={{ flex:1, overflow:'auto', padding:'24px 16px', display:'flex', justifyContent:'center', alignItems:'flex-start' }}>
        {/* Page wrapper — shadow + white bg */}
        <div style={{ position:'relative', display:'inline-block', background:'#fff', boxShadow:'0 4px 32px rgba(0,0,0,0.22)', cursor: cursorMap[tool] }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* PDF canvas */}
          <canvas ref={pdfCanvasRef} style={{ display:'block', userSelect:'none' }} />

          {/* Annotation overlay — same size as canvas */}
          <div ref={annotRef} style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', overflow:'visible', pointerEvents:'none' }}>

            {/* ── Text annotations ── */}
            {pageAnnots.filter(a=>a.type==='text').map(a => {
              const isEd  = editingId  === a.id
              const isSel = selectedId === a.id
              return (
                <div key={a.id} className="annot-el"
                  style={{ position:'absolute', left:a.x, top:a.y, pointerEvents:'all', zIndex:15 }}>
                  {isEd ? (
                    <textarea
                      autoFocus
                      value={a.text}
                      onChange={e => updateText(a.id, e.target.value)}
                      onBlur={e => commitText(a.id, e.target.value)}
                      onKeyDown={e => {
                        if (e.key==='Escape') commitText(a.id, a.text)
                        if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); commitText(a.id, a.text) }
                      }}
                      style={{ fontSize:a.fontSize, color:a.color, background:'rgba(219,234,254,0.25)', border:'1.5px solid #3b82f6', outline:'none', resize:'both', minWidth:120, minHeight:a.fontSize+12, padding:'2px 4px', fontFamily:'inherit', borderRadius:3, lineHeight:1.4 }}
                    />
                  ) : (
                    <div
                      onClick={() => { if (tool==='text'||tool==='select') { setSelectedId(null); setEditingId(a.id) } else if (tool==='select') setSelectedId(a.id) }}
                      onDoubleClick={() => setEditingId(a.id)}
                      style={{ fontSize:a.fontSize, color:a.color, whiteSpace:'pre-wrap', padding:'2px 4px', cursor:'text', border: isSel ? '1.5px dashed #3b82f6' : '1.5px dashed rgba(59,130,246,0.3)', borderRadius:3, background: isSel ? 'rgba(219,234,254,0.2)' : 'transparent', minWidth:60 }}>
                      {a.text}
                    </div>
                  )}
                  {/* Delete handle */}
                  {(isSel || isEd) && (
                    <button className="annot-el" onClick={e => { e.stopPropagation(); deleteAnnot(a.id) }}
                      style={{ position:'absolute', top:-10, right:-10, width:20, height:20, borderRadius:'50%', background:'#ef4444', color:'#fff', border:'2px solid #fff', cursor:'pointer', fontSize:12, lineHeight:'16px', textAlign:'center', padding:0, zIndex:20, boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}>×</button>
                  )}
                </div>
              )
            })}

            {/* ── Highlight / Whitebox annotations ── */}
            {pageAnnots.filter(a=>a.type==='highlight'||a.type==='whitebox').map(a => {
              const isSel = selectedId === a.id
              return (
                <div key={a.id} className="annot-el"
                  onClick={e => { if (tool==='select') { e.stopPropagation(); setSelectedId(a.id) } }}
                  style={{ position:'absolute', left:a.x, top:a.y, width:a.w, height:a.h, pointerEvents:'all', zIndex:10, cursor: tool==='select'?'pointer':'inherit',
                    background: a.type==='highlight' ? 'rgba(253,224,71,0.45)' : '#ffffff',
                    border: isSel ? '1.5px dashed #3b82f6' : 'none',
                    boxShadow: isSel ? '0 0 0 1px #3b82f650' : 'none',
                  }}>
                  {isSel && (
                    <button className="annot-el" onClick={e => { e.stopPropagation(); deleteAnnot(a.id) }}
                      style={{ position:'absolute', top:-10, right:-10, width:20, height:20, borderRadius:'50%', background:'#ef4444', color:'#fff', border:'2px solid #fff', cursor:'pointer', fontSize:12, lineHeight:'16px', textAlign:'center', padding:0, zIndex:20, boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}>×</button>
                  )}
                </div>
              )
            })}

            {/* ── Draw (SVG) annotations ── */}
            {pageAnnots.filter(a=>a.type==='draw').map(a => {
              const isSel = selectedId === a.id
              return (
                <svg key={a.id} className="annot-el"
                  onClick={() => { if (tool==='select') setSelectedId(a.id) }}
                  style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', overflow:'visible', pointerEvents: tool==='select'?'all':'none', zIndex:11, cursor: tool==='select'?'pointer':'default' }}>
                  <polyline
                    points={a.points.map(p=>`${p.x},${p.y}`).join(' ')}
                    stroke={a.color} strokeWidth={a.lineWidth}
                    fill="none" strokeLinecap="round" strokeLinejoin="round"
                    style={{ filter: isSel ? 'drop-shadow(0 0 4px #3b82f6)' : 'none' }}
                  />
                  {isSel && a.points[0] && (
                    <foreignObject x={a.points[0].x-10} y={a.points[0].y-22} width={22} height={22}>
                      <button className="annot-el" onClick={e => { e.stopPropagation(); deleteAnnot(a.id) }}
                        style={{ width:20, height:20, borderRadius:'50%', background:'#ef4444', color:'#fff', border:'2px solid #fff', cursor:'pointer', fontSize:12, lineHeight:'16px', textAlign:'center', padding:0, boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}>×</button>
                    </foreignObject>
                  )}
                </svg>
              )
            })}
          </div>

          {/* Live rect preview */}
          {isDrawing && liveDraw && (liveDraw.type==='highlight'||liveDraw.type==='whitebox') && (
            <div style={{
              position:'absolute', pointerEvents:'none', zIndex:20,
              left:  liveDraw.w>=0 ? liveDraw.x : liveDraw.x+liveDraw.w,
              top:   liveDraw.h>=0 ? liveDraw.y : liveDraw.y+liveDraw.h,
              width: Math.abs(liveDraw.w), height: Math.abs(liveDraw.h),
              background: liveDraw.type==='highlight' ? 'rgba(253,224,71,0.45)' : 'rgba(255,255,255,0.85)',
              border:'1.5px dashed #3b82f6',
            }} />
          )}

          {/* Live freehand canvas */}
          <canvas ref={drawCanvasRef} style={{ position:'absolute', top:0, left:0, pointerEvents:'none', zIndex:12 }} />
        </div>
      </div>
    </div>
  )
}
