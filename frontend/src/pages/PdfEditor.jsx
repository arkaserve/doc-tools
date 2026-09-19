import { useState, useEffect, useRef, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import FileUploadZone from '../components/FileUploadZone'
import toast from 'react-hot-toast'

const PDFJS_VERSION = '3.11.174'
const PDFJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`

function hexToRgbLib(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return rgb(r, g, b)
}

let _id = 0
const uid = () => ++_id

const TOOLS = [
  { id: 'select', label: 'Select',    icon: '↖️' },
  { id: 'text',   label: 'Text',      icon: 'T'  },
  { id: 'highlight', label: 'Highlight', icon: '🟡' },
  { id: 'whitebox',  label: 'Whiteout',  icon: '⬜' },
  { id: 'draw',   label: 'Draw',      icon: '✏️' },
]

export default function PdfEditor() {
  const [pdfjsReady, setPdfjsReady]   = useState(false)
  const [pdfFile,    setPdfFile]      = useState(null)
  const [pdfBytes,   setPdfBytes]     = useState(null)
  const [pdfjsDoc,   setPdfjsDoc]     = useState(null)
  const [currentPage,setCurrentPage]  = useState(1)
  const [numPages,   setNumPages]     = useState(0)
  const [annotations,setAnnotations]  = useState({})
  const [tool,       setTool]         = useState('text')
  const [color,      setColor]        = useState('#e53e3e')
  const [fontSize,   setFontSize]     = useState(14)
  const [lineWidth,  setLineWidth]    = useState(3)
  const [isDrawing,  setIsDrawing]    = useState(false)
  const [drawStart,  setDrawStart]    = useState(null)
  const [liveDraw,   setLiveDraw]     = useState(null)
  const [editingId,  setEditingId]    = useState(null)
  const [selectedId, setSelectedId]   = useState(null)
  const [saving,     setSaving]       = useState(false)

  const pdfCanvasRef  = useRef(null)
  const drawCanvasRef = useRef(null)
  const containerRef  = useRef(null)

  /* ── Load PDF.js once ── */
  useEffect(() => {
    if (window.pdfjsLib) { setPdfjsReady(true); return }
    const s = document.createElement('script')
    s.src = `${PDFJS_CDN}/pdf.min.js`
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`
      setPdfjsReady(true)
    }
    document.head.appendChild(s)
  }, [])

  /* ── Handle uploaded file ── */
  const handleFile = async (files) => {
    if (!pdfjsReady) { toast.error('PDF engine still loading, try again'); return }
    const file = files[0]
    if (!file) return
    const buf = await file.arrayBuffer()
    const bytes = new Uint8Array(buf)
    setPdfBytes(bytes)
    setPdfFile(file)
    setAnnotations({})
    setCurrentPage(1)
    setSelectedId(null)
    setEditingId(null)
    const task = window.pdfjsLib.getDocument({ data: buf.slice(0) })
    const doc  = await task.promise
    setPdfjsDoc(doc)
    setNumPages(doc.numPages)
  }

  /* ── Render a page to canvas ── */
  const renderPage = useCallback(async (pageNum) => {
    if (!pdfjsDoc || !pdfCanvasRef.current) return
    const page = await pdfjsDoc.getPage(pageNum)
    const vp   = page.getViewport({ scale: 1.5 })
    const c    = pdfCanvasRef.current
    c.width    = vp.width
    c.height   = vp.height
    if (drawCanvasRef.current) {
      drawCanvasRef.current.width  = vp.width
      drawCanvasRef.current.height = vp.height
    }
    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise
  }, [pdfjsDoc])

  useEffect(() => { renderPage(currentPage) }, [pdfjsDoc, currentPage, renderPage])

  /* ── Live freehand on overlay canvas ── */
  useEffect(() => {
    const c = drawCanvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    ctx.clearRect(0, 0, c.width, c.height)
    if (!liveDraw || liveDraw.type !== 'draw') return
    const pts = liveDraw.points
    if (pts.length < 2) return
    ctx.beginPath()
    ctx.strokeStyle = liveDraw.color
    ctx.lineWidth   = liveDraw.lineWidth
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
    ctx.stroke()
  }, [liveDraw])

  /* ── Pointer helpers ── */
  const getPos = (e) => {
    const r = containerRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const onMouseDown = (e) => {
    if (e.target.closest('.annot-el')) return
    setSelectedId(null)
    const pos = getPos(e)

    if (tool === 'text') {
      const id = uid()
      setAnnotations(prev => ({
        ...prev,
        [currentPage]: [...(prev[currentPage] || []), { id, type: 'text', x: pos.x, y: pos.y, text: '', fontSize, color }],
      }))
      setEditingId(id)
      return
    }
    if (tool === 'draw') {
      setIsDrawing(true)
      setLiveDraw({ type: 'draw', points: [pos], color, lineWidth })
      return
    }
    if (tool === 'highlight' || tool === 'whitebox') {
      setIsDrawing(true)
      setDrawStart(pos)
      setLiveDraw({ type: tool, x: pos.x, y: pos.y, w: 0, h: 0 })
    }
  }

  const onMouseMove = (e) => {
    if (!isDrawing || !liveDraw) return
    const pos = getPos(e)
    if (liveDraw.type === 'draw') {
      setLiveDraw(p => ({ ...p, points: [...p.points, pos] }))
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
        setAnnotations(prev => ({
          ...prev,
          [currentPage]: [...(prev[currentPage] || []), { ...liveDraw, id }],
        }))
      }
      const c = drawCanvasRef.current
      if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height)
    } else {
      const w = Math.abs(liveDraw.w), h = Math.abs(liveDraw.h)
      if (w > 5 && h > 5) {
        const x = liveDraw.w < 0 ? liveDraw.x + liveDraw.w : liveDraw.x
        const y = liveDraw.h < 0 ? liveDraw.y + liveDraw.h : liveDraw.y
        setAnnotations(prev => ({
          ...prev,
          [currentPage]: [...(prev[currentPage] || []), { id, type: liveDraw.type, x, y, w, h }],
        }))
      }
    }
    setLiveDraw(null)
    setDrawStart(null)
  }

  const deleteAnnot = (id) => {
    setAnnotations(prev => ({
      ...prev,
      [currentPage]: (prev[currentPage] || []).filter(a => a.id !== id),
    }))
    setSelectedId(null)
  }

  const updateText = (id, text) => {
    setAnnotations(prev => ({
      ...prev,
      [currentPage]: (prev[currentPage] || []).map(a => a.id === id ? { ...a, text } : a),
    }))
  }

  /* ── Export PDF ── */
  const exportPdf = async () => {
    if (!pdfBytes) return
    setSaving(true)
    try {
      const doc   = await PDFDocument.load(pdfBytes)
      const font  = await doc.embedFont(StandardFonts.Helvetica)

      for (const [ps, annots] of Object.entries(annotations)) {
        const pIdx = parseInt(ps) - 1
        const page = doc.getPage(pIdx)
        const { width: pw, height: ph } = page.getSize()

        const pdfjsPage = await pdfjsDoc.getPage(parseInt(ps))
        const vp = pdfjsPage.getViewport({ scale: 1.5 })
        const sx = pw / vp.width
        const sy = ph / vp.height

        for (const a of annots) {
          if (a.type === 'text' && a.text) {
            const fs = a.fontSize * sy
            page.drawText(a.text, {
              x: a.x * sx,
              y: ph - a.y * sy - fs,
              size: fs, font,
              color: hexToRgbLib(a.color),
            })
          } else if (a.type === 'highlight') {
            page.drawRectangle({
              x: a.x * sx,
              y: ph - (a.y + a.h) * sy,
              width: a.w * sx, height: a.h * sy,
              color: rgb(1, 1, 0), opacity: 0.4,
            })
          } else if (a.type === 'whitebox') {
            page.drawRectangle({
              x: a.x * sx,
              y: ph - (a.y + a.h) * sy,
              width: a.w * sx, height: a.h * sy,
              color: rgb(1, 1, 1),
            })
          } else if (a.type === 'draw') {
            const pts = a.points
            for (let i = 1; i < pts.length; i++) {
              page.drawLine({
                start: { x: pts[i-1].x * sx, y: ph - pts[i-1].y * sy },
                end:   { x: pts[i].x   * sx, y: ph - pts[i].y   * sy },
                thickness: a.lineWidth * sx,
                color: hexToRgbLib(a.color),
              })
            }
          }
        }
      }

      const out  = await doc.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      const url  = URL.createObjectURL(blob)
      const el   = document.createElement('a')
      el.href = url; el.download = `edited_${pdfFile?.name || 'document.pdf'}`; el.click()
      toast.success('PDF downloaded!')
    } catch (err) {
      console.error(err)
      toast.error('Export failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  /* ── Upload screen ── */
  if (!pdfFile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">✏️</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">PDF Editor</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Add text, highlight, draw and annotate PDFs — 100% in your browser</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-6">
          <FileUploadZone
            accept={{ 'application/pdf': ['.pdf'] }}
            files={[]}
            onFiles={handleFile}
            label="Drop a PDF here to start editing"
            hint="Your file stays in the browser — nothing is uploaded to any server"
          />
          {!pdfjsReady && (
            <p className="text-center text-sm text-blue-500 animate-pulse">Loading PDF engine…</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { icon: '🔤', label: 'Add Text',   desc: 'Click anywhere to type' },
              { icon: '🟡', label: 'Highlight',  desc: 'Drag to highlight area' },
              { icon: '⬜', label: 'Whiteout',   desc: 'Cover sensitive content' },
              { icon: '✏️', label: 'Freehand',   desc: 'Draw & annotate freely' },
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

  /* ── Editor screen ── */
  const pageAnnots = annotations[currentPage] || []
  const cursor = { select: 'default', text: 'text', highlight: 'crosshair', whitebox: 'crosshair', draw: 'crosshair' }[tool]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden', background: '#f1f5f9' }}>

      {/* ── Toolbar ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', flexShrink: 0 }}>
        {/* Tool buttons */}
        <div style={{ display: 'flex', gap: 4 }}>
          {TOOLS.map(t => (
            <button key={t.id} onClick={() => { setTool(t.id); setSelectedId(null); setEditingId(null) }}
              style={{
                padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: tool === t.id ? '#3b82f6' : '#f1f5f9',
                color: tool === t.id ? '#fff' : '#475569',
                transition: 'all 0.15s',
              }}>
              <span style={{ marginRight: 4 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Color picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 4 }}>
          <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Color</label>
          <input type="color" value={color} onChange={e => setColor(e.target.value)}
            style={{ width: 32, height: 28, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer', padding: 2 }} />
        </div>

        {/* Font size (text tool only) */}
        {tool === 'text' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Size</label>
            <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
              style={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6, padding: '3px 6px', background: '#f8fafc', color: '#1e293b' }}>
              {[8,10,12,14,16,18,20,24,28,32,36,48].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        {/* Line width (draw tool only) */}
        {tool === 'draw' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Width</label>
            <select value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))}
              style={{ fontSize: 12, border: '1px solid #e2e8f0', borderRadius: 6, padding: '3px 6px', background: '#f8fafc', color: '#1e293b' }}>
              {[1,2,3,4,6,8,10,14].map(s => <option key={s} value={s}>{s}px</option>)}
            </select>
          </div>
        )}

        {/* Hint */}
        <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 4 }}>
          {tool === 'text' && 'Click on the PDF to place text'}
          {tool === 'highlight' && 'Drag to highlight an area'}
          {tool === 'whitebox' && 'Drag to cover an area with white'}
          {tool === 'draw' && 'Drag to draw freely'}
          {tool === 'select' && 'Click an annotation to select / delete'}
        </span>

        {/* Right side: page nav + actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1}
            style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: currentPage <= 1 ? '#f8fafc' : '#fff', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer', opacity: currentPage <= 1 ? 0.5 : 1, fontSize: 14 }}>‹</button>
          <span style={{ fontSize: 13, color: '#475569', fontWeight: 600, minWidth: 70, textAlign: 'center' }}>
            {currentPage} / {numPages}
          </span>
          <button onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage >= numPages}
            style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: currentPage >= numPages ? '#f8fafc' : '#fff', cursor: currentPage >= numPages ? 'not-allowed' : 'pointer', opacity: currentPage >= numPages ? 0.5 : 1, fontSize: 14 }}>›</button>

          <button onClick={exportPdf} disabled={saving}
            style={{ padding: '6px 16px', borderRadius: 8, background: '#16a34a', color: '#fff', border: 'none', cursor: saving ? 'wait' : 'pointer', fontSize: 13, fontWeight: 700 }}>
            {saving ? 'Saving…' : '↓ Download PDF'}
          </button>

          <button onClick={() => { setPdfFile(null); setPdfjsDoc(null); setPdfBytes(null); setAnnotations({}) }}
            style={{ padding: '6px 12px', borderRadius: 8, background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            ✕ Close
          </button>
        </div>
      </div>

      {/* ── Canvas area ── */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '24px 16px' }}>
        <div
          ref={containerRef}
          style={{ position: 'relative', display: 'inline-block', cursor, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', borderRadius: 2, userSelect: 'none' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* PDF render */}
          <canvas ref={pdfCanvasRef} style={{ display: 'block' }} />

          {/* Saved annotations overlay */}
          {pageAnnots.map(a => {
            if (a.type === 'text') {
              const isEditing = editingId === a.id
              const isSel     = selectedId === a.id
              return (
                <div key={a.id} className="annot-el" style={{ position: 'absolute', left: a.x, top: a.y, zIndex: 10 }}>
                  {isEditing ? (
                    <textarea
                      autoFocus
                      value={a.text}
                      onChange={e => updateText(a.id, e.target.value)}
                      onBlur={() => { setEditingId(null); if (!a.text.trim()) deleteAnnot(a.id) }}
                      onKeyDown={e => { if (e.key === 'Escape') { setEditingId(null); if (!a.text.trim()) deleteAnnot(a.id) } }}
                      style={{ fontSize: a.fontSize, color: a.color, background: 'rgba(219,234,254,0.3)', border: '1.5px dashed #3b82f6', outline: 'none', resize: 'both', minWidth: 100, minHeight: a.fontSize + 8, padding: '2px 4px', fontFamily: 'inherit', borderRadius: 3 }}
                    />
                  ) : (
                    <div
                      onClick={() => { if (tool === 'text') { setEditingId(a.id) } else if (tool === 'select') { setSelectedId(a.id) } }}
                      onDoubleClick={() => setEditingId(a.id)}
                      style={{ fontSize: a.fontSize, color: a.color, cursor: tool === 'text' ? 'text' : 'pointer', whiteSpace: 'pre-wrap', padding: '2px 4px', border: isSel ? '1.5px dashed #3b82f6' : '1.5px dashed transparent', borderRadius: 3, background: isSel ? 'rgba(219,234,254,0.2)' : 'transparent' }}
                    >
                      {a.text || <span style={{ color: '#94a3b8', fontSize: Math.max(10, a.fontSize * 0.8) }}>Click to type…</span>}
                    </div>
                  )}
                  {(isSel || (tool === 'select' && isEditing)) && (
                    <button className="annot-el" onClick={e => { e.stopPropagation(); deleteAnnot(a.id) }}
                      style={{ position: 'absolute', top: -9, right: -9, width: 18, height: 18, borderRadius: '50%', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: '18px', textAlign: 'center', padding: 0, zIndex: 20 }}>×</button>
                  )}
                </div>
              )
            }

            if (a.type === 'highlight' || a.type === 'whitebox') {
              const isSel = selectedId === a.id
              return (
                <div key={a.id} className="annot-el"
                  onClick={() => { if (tool === 'select') setSelectedId(a.id) }}
                  style={{ position: 'absolute', left: a.x, top: a.y, width: a.w, height: a.h, zIndex: 9, borderRadius: 1, cursor: tool === 'select' ? 'pointer' : 'inherit', border: isSel ? '1.5px dashed #3b82f6' : 'none', background: a.type === 'highlight' ? 'rgba(253,224,71,0.45)' : '#ffffff' }}>
                  {isSel && (
                    <button className="annot-el" onClick={e => { e.stopPropagation(); deleteAnnot(a.id) }}
                      style={{ position: 'absolute', top: -9, right: -9, width: 18, height: 18, borderRadius: '50%', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: '18px', textAlign: 'center', padding: 0, zIndex: 20 }}>×</button>
                  )}
                </div>
              )
            }

            if (a.type === 'draw') {
              const isSel = selectedId === a.id
              return (
                <svg key={a.id} className="annot-el"
                  onClick={() => { if (tool === 'select') setSelectedId(a.id) }}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: tool === 'select' ? 'all' : 'none', zIndex: 11, cursor: tool === 'select' ? 'pointer' : 'inherit' }}>
                  <polyline
                    points={a.points.map(p => `${p.x},${p.y}`).join(' ')}
                    stroke={a.color} strokeWidth={a.lineWidth}
                    fill="none" strokeLinecap="round" strokeLinejoin="round"
                    style={{ filter: isSel ? 'drop-shadow(0 0 3px #3b82f6)' : 'none' }}
                  />
                  {isSel && a.points[0] && (
                    <foreignObject x={a.points[0].x} y={a.points[0].y - 20} width={20} height={20}>
                      <button className="annot-el" onClick={e => { e.stopPropagation(); deleteAnnot(a.id) }}
                        style={{ width: 18, height: 18, borderRadius: '50%', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: '18px', textAlign: 'center', padding: 0 }}>×</button>
                    </foreignObject>
                  )}
                </svg>
              )
            }
            return null
          })}

          {/* Live rect preview while dragging */}
          {isDrawing && liveDraw && (liveDraw.type === 'highlight' || liveDraw.type === 'whitebox') && (
            <div style={{
              position: 'absolute', pointerEvents: 'none', zIndex: 20, borderRadius: 1,
              left: liveDraw.w >= 0 ? liveDraw.x : liveDraw.x + liveDraw.w,
              top:  liveDraw.h >= 0 ? liveDraw.y : liveDraw.y + liveDraw.h,
              width:  Math.abs(liveDraw.w),
              height: Math.abs(liveDraw.h),
              background: liveDraw.type === 'highlight' ? 'rgba(253,224,71,0.45)' : 'rgba(255,255,255,0.85)',
              border: '1.5px dashed #3b82f6',
            }} />
          )}

          {/* Live freehand canvas */}
          <canvas ref={drawCanvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 12 }} />
        </div>
      </div>
    </div>
  )
}
