import { useState, useEffect, useRef, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import FileUploadZone from '../components/FileUploadZone'
import toast from 'react-hot-toast'

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174'

function hexToRgbLib(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255)
}

let _uid = 0
const uid = () => ++_uid

/* Map annotation font props → pdf-lib StandardFont */
function getStandardFont(family = 'Helvetica', weight = 'normal', style = 'normal') {
  const bold   = weight === 'bold'
  const italic = style  === 'italic'
  if (family === 'TimesRoman') {
    if (bold && italic)  return StandardFonts.TimesRomanBoldItalic
    if (bold)            return StandardFonts.TimesRomanBold
    if (italic)          return StandardFonts.TimesRomanItalic
    return StandardFonts.TimesRoman
  }
  if (family === 'Courier') {
    if (bold && italic)  return StandardFonts.CourierBoldOblique
    if (bold)            return StandardFonts.CourierBold
    if (italic)          return StandardFonts.CourierOblique
    return StandardFonts.Courier
  }
  if (bold && italic)    return StandardFonts.HelveticaBoldOblique
  if (bold)              return StandardFonts.HelveticaBold
  if (italic)            return StandardFonts.HelveticaOblique
  return StandardFonts.Helvetica
}

const TOOL_LIST = [
  { id: 'select',    label: 'Select',    icon: '↖' },
  { id: 'text',      label: 'Text',      icon: 'T' },
  { id: 'highlight', label: 'Highlight', icon: '▬' },
  { id: 'whitebox',  label: 'Whiteout',  icon: '□' },
  { id: 'draw',      label: 'Draw',      icon: '✏' },
]

const PRESETS  = ['#000000','#e53e3e','#dd6b20','#d69e2e','#38a169','#3182ce','#805ad5','#ffffff']
const FONTS    = [{ value:'Helvetica', label:'Sans-Serif' }, { value:'TimesRoman', label:'Serif' }, { value:'Courier', label:'Monospace' }]
const FONT_CSS = { Helvetica:'Arial,Helvetica,sans-serif', TimesRoman:'Georgia,"Times New Roman",serif', Courier:'"Courier New",Courier,monospace' }
const SIZES    = [8,10,11,12,13,14,16,18,20,24,28,32,36,48]

/* Textarea that auto-focuses and selects-all after mount */
function FocusedTextarea({ value, onChange, onBlur, onKeyDown, style }) {
  const ref = useCallback(node => {
    if (node) setTimeout(() => { node.focus(); node.select() }, 30)
  }, [])
  return (
    <textarea ref={ref} value={value} onChange={onChange} onBlur={onBlur} onKeyDown={onKeyDown}
      placeholder="Type here…" style={style} />
  )
}

/* Floating toolbar above (or below) a text annotation */
function FloatingToolbar({ annot, onUpdate, onDelete, onDuplicate }) {
  const TBAR_H   = 46
  const showBelow = annot.y < TBAR_H + 8
  const tbLeft    = Math.max(4, annot.x)
  const tbTop     = showBelow ? annot.y + annot.fontSize + 12 : annot.y - TBAR_H - 6

  const btn = (active, onClick, title, children) => (
    <button onMouseDown={e => e.preventDefault()} onClick={onClick} title={title}
      style={{ padding:'4px 9px', borderRadius:6, border:'none', cursor:'pointer', fontSize:13, fontWeight:700,
        background:active?'#3b82f6':'rgba(255,255,255,0.1)', color:active?'#fff':'#e2e8f0', lineHeight:1 }}>
      {children}
    </button>
  )
  const div = () => <div style={{ width:1, height:22, background:'rgba(255,255,255,0.15)', margin:'0 2px' }} />

  return (
    <div className="float-toolbar"
      onMouseDown={e => e.preventDefault()}
      style={{ position:'absolute', left:tbLeft, top:tbTop, zIndex:50, background:'#1e293b', borderRadius:10,
        display:'flex', alignItems:'center', gap:3, padding:'5px 8px',
        boxShadow:'0 6px 28px rgba(0,0,0,0.45)', whiteSpace:'nowrap', pointerEvents:'all' }}>

      {btn(annot.fontWeight==='bold',   () => onUpdate({ fontWeight: annot.fontWeight==='bold'   ? 'normal' : 'bold'   }), 'Bold',   <b>B</b>)}
      {btn(annot.fontStyle==='italic',  () => onUpdate({ fontStyle:  annot.fontStyle==='italic'  ? 'normal' : 'italic' }), 'Italic', <i>I</i>)}
      {div()}

      <span style={{ color:'#94a3b8', fontSize:11 }}>Tt</span>
      <select value={annot.fontSize} onMouseDown={e => e.stopPropagation()}
        onChange={e => onUpdate({ fontSize: Number(e.target.value) })}
        style={{ fontSize:12, borderRadius:6, border:'1px solid #334155', padding:'3px 4px', background:'#0f172a', color:'#e2e8f0', cursor:'pointer' }}>
        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <span style={{ color:'#94a3b8', fontSize:11 }}>Aa</span>
      <select value={annot.fontFamily||'Helvetica'} onMouseDown={e => e.stopPropagation()}
        onChange={e => onUpdate({ fontFamily: e.target.value })}
        style={{ fontSize:12, borderRadius:6, border:'1px solid #334155', padding:'3px 4px', background:'#0f172a', color:'#e2e8f0', cursor:'pointer' }}>
        {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
      </select>
      {div()}

      {/* Color swatch + hidden input */}
      <div title="Text color" style={{ position:'relative', display:'flex', alignItems:'center' }} onMouseDown={e => e.stopPropagation()}>
        <div style={{ width:18, height:18, borderRadius:'50%', background:annot.color, border:'2px solid rgba(255,255,255,0.3)', cursor:'pointer' }} />
        <input type="color" value={annot.color} onChange={e => onUpdate({ color: e.target.value })}
          style={{ position:'absolute', opacity:0, width:18, height:18, cursor:'pointer', padding:0, border:0 }} />
      </div>
      {div()}

      {btn(false, onDuplicate, 'Duplicate', '⧉')}
      {btn(false, onDelete,    'Delete',    '🗑')}
    </div>
  )
}

export default function PdfEditor() {
  const [pdfjsReady,  setPdfjsReady]  = useState(!!window.pdfjsLib)
  const [pdfFile,     setPdfFile]     = useState(null)
  const [pdfBytes,    setPdfBytes]    = useState(null)
  const [pdfjsDoc,    setPdfjsDoc]    = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [numPages,    setNumPages]    = useState(0)
  const [annotations, setAnnotations] = useState({})
  const [history,     setHistory]     = useState([{}])
  const [histIdx,     setHistIdx]     = useState(0)
  const [tool,        setTool]        = useState('text')
  const [color,       setColor]       = useState('#000000')
  const [fontSize,    setFontSize]    = useState(16)
  const [fontWeight,  setFontWeight]  = useState('normal')
  const [fontStyle,   setFontStyle]   = useState('normal')
  const [fontFamily,  setFontFamily]  = useState('Helvetica')
  const [lineWidth,   setLineWidth]   = useState(3)
  const [isDrawing,   setIsDrawing]   = useState(false)
  const [drawStart,   setDrawStart]   = useState(null)
  const [liveDraw,    setLiveDraw]    = useState(null)
  const [editingId,   setEditingId]   = useState(null)
  const [selectedId,  setSelectedId]  = useState(null)
  const [saving,      setSaving]      = useState(false)
  const [pageScales,  setPageScales]  = useState({})

  const pdfCanvasRef   = useRef(null)
  const drawCanvasRef  = useRef(null)
  const wrapperRef     = useRef(null)
  const scrollAreaRef  = useRef(null)
  const didDragRef     = useRef(false)
  // True when mousedown fires while a text annotation is being edited AND
  // the click target is outside the annotation/toolbar. Blur fires synchronously
  // before onClick, clearing editingId — so we track this in mousedown to prevent
  // the following click from creating a phantom new annotation.
  const wasEditingRef  = useRef(false)

  /* ── Load PDF.js ── */
  useEffect(() => {
    if (window.pdfjsLib) { window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`; return }
    const s = document.createElement('script')
    s.src = `${PDFJS_CDN}/pdf.min.js`
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`; setPdfjsReady(true) }
    document.head.appendChild(s)
  }, [])

  /* ── Load file ── */
  const handleFile = async (files) => {
    const file = files[0]; if (!file) return
    if (!pdfjsReady) { toast.error('PDF engine still loading, please wait'); return }
    const buf   = await file.arrayBuffer()
    const bytes = new Uint8Array(buf)
    setPdfBytes(bytes); setPdfFile(file)
    const init = {}
    setAnnotations(init); setHistory([init]); setHistIdx(0)
    setCurrentPage(1); setSelectedId(null); setEditingId(null)
    const doc = await window.pdfjsLib.getDocument({ data: bytes.slice() }).promise
    setPdfjsDoc(doc); setNumPages(doc.numPages)
  }

  /* ── Render page ── */
  const renderPage = useCallback(async (pageNum) => {
    if (!pdfjsDoc || !pdfCanvasRef.current || !scrollAreaRef.current) return
    const page   = await pdfjsDoc.getPage(pageNum)
    const baseVp = page.getViewport({ scale: 1 })
    const avail  = (scrollAreaRef.current.clientWidth || 900) - 48
    const scale  = Math.max(1.0, Math.min(avail / baseVp.width, 2.8))
    const vp     = page.getViewport({ scale })
    const c = pdfCanvasRef.current
    c.width = vp.width; c.height = vp.height
    if (drawCanvasRef.current) { drawCanvasRef.current.width = vp.width; drawCanvasRef.current.height = vp.height }
    setPageScales(ps => ({ ...ps, [pageNum]: scale }))
    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise
  }, [pdfjsDoc])

  useEffect(() => { renderPage(currentPage) }, [pdfjsDoc, currentPage, renderPage])

  /* ── Live freehand on overlay canvas ── */
  useEffect(() => {
    const c = drawCanvasRef.current; if (!c) return
    const ctx = c.getContext('2d'); ctx.clearRect(0, 0, c.width, c.height)
    if (!liveDraw || liveDraw.type !== 'draw' || liveDraw.points.length < 2) return
    ctx.beginPath(); ctx.strokeStyle = liveDraw.color; ctx.lineWidth = liveDraw.lineWidth
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    liveDraw.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
    ctx.stroke()
  }, [liveDraw])

  /* ── History ── */
  const pushHistory = useCallback((newAnnots) => {
    setHistory(prev => { const s = prev.slice(0, histIdx + 1); s.push(JSON.parse(JSON.stringify(newAnnots))); return s })
    setHistIdx(i => i + 1)
    setAnnotations(newAnnots)
  }, [histIdx])

  const undo = useCallback(() => {
    if (histIdx <= 0) return
    setHistory(prev => { setAnnotations(JSON.parse(JSON.stringify(prev[histIdx - 1]))); return prev })
    setHistIdx(i => i - 1)
  }, [history, histIdx])

  useEffect(() => {
    const k = e => { if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo() } }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [undo])

  /* ── Position inside wrapper ── */
  const getPos = e => {
    const r = wrapperRef.current.getBoundingClientRect()
    return { x: Math.round(e.clientX - r.left), y: Math.round(e.clientY - r.top) }
  }

  /* ── Mouse — draw tools ── */
  const onMouseDown = e => {
    if (e.target.closest('.annot-el') || e.target.closest('.float-toolbar')) return
    // Record if a text annotation was being edited when this click started.
    // Blur fires before onClick, so we must capture it here while editingId is still set.
    wasEditingRef.current = editingId !== null
    if (!['highlight','whitebox','draw'].includes(tool)) return
    didDragRef.current = false
    const pos = getPos(e); setSelectedId(null); setEditingId(null)
    if (tool === 'draw') { setIsDrawing(true); setLiveDraw({ type:'draw', points:[pos], color, lineWidth }) }
    else { setIsDrawing(true); setDrawStart(pos); setLiveDraw({ type:tool, x:pos.x, y:pos.y, w:0, h:0 }) }
  }
  const onMouseMove = e => {
    if (!isDrawing || !liveDraw) return
    didDragRef.current = true
    const pos = getPos(e)
    if (liveDraw.type === 'draw') setLiveDraw(p => ({ ...p, points:[...p.points, pos] }))
    else setLiveDraw(p => ({ ...p, w:pos.x-drawStart.x, h:pos.y-drawStart.y }))
  }
  const onMouseUp = () => {
    if (!isDrawing || !liveDraw) return
    setIsDrawing(false)
    const id = uid()
    if (liveDraw.type === 'draw') {
      if (liveDraw.points.length > 3) pushHistory({ ...annotations, [currentPage]: [...(annotations[currentPage]||[]), { ...liveDraw, id }] })
      const c = drawCanvasRef.current; if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height)
    } else {
      const w = Math.abs(liveDraw.w), h = Math.abs(liveDraw.h)
      if (w > 6 && h > 6) {
        const x = liveDraw.w < 0 ? liveDraw.x + liveDraw.w : liveDraw.x
        const y = liveDraw.h < 0 ? liveDraw.y + liveDraw.h : liveDraw.y
        pushHistory({ ...annotations, [currentPage]: [...(annotations[currentPage]||[]), { id, type:liveDraw.type, x, y, w, h }] })
      }
    }
    setLiveDraw(null); setDrawStart(null)
  }

  /* ── Click — text / select ── */
  const onClick = e => {
    if (e.target.closest('.annot-el') || e.target.closest('.float-toolbar')) return
    if (didDragRef.current) return
    // If mousedown started while a text annotation was being edited, this click
    // is the same gesture that caused blur+commit — don't also create a new annotation.
    if (wasEditingRef.current) { wasEditingRef.current = false; return }
    if (tool === 'select') { setSelectedId(null); setEditingId(null); return }
    if (tool !== 'text') return
    const pos = getPos(e)
    const id  = uid()
    const next = {
      ...annotations,
      [currentPage]: [...(annotations[currentPage]||[]),
        { id, type:'text', x:pos.x, y:pos.y, text:'', fontSize, color, fontWeight, fontStyle, fontFamily }],
    }
    pushHistory(next); setEditingId(id); setSelectedId(id)
  }

  /* ── Text helpers ── */
  const updateText = (id, text) => setAnnotations(prev => ({
    ...prev,
    [currentPage]: (prev[currentPage]||[]).map(a => a.id===id ? { ...a, text } : a),
  }))

  const updateAnnot = (id, patch) => {
    const next = { ...annotations, [currentPage]: (annotations[currentPage]||[]).map(a => a.id===id ? { ...a, ...patch } : a) }
    pushHistory(next)
    if (patch.fontWeight !== undefined) setFontWeight(patch.fontWeight)
    if (patch.fontStyle  !== undefined) setFontStyle(patch.fontStyle)
    if (patch.fontFamily !== undefined) setFontFamily(patch.fontFamily)
    if (patch.fontSize   !== undefined) setFontSize(patch.fontSize)
    if (patch.color      !== undefined) setColor(patch.color)
  }

  const commitText = (id, text) => {
    const next = {
      ...annotations,
      [currentPage]: text.trim()
        ? (annotations[currentPage]||[]).map(a => a.id===id ? { ...a, text } : a)
        : (annotations[currentPage]||[]).filter(a => a.id!==id),
    }
    pushHistory(next); setEditingId(null)
  }

  const deleteAnnot = id => {
    pushHistory({ ...annotations, [currentPage]: (annotations[currentPage]||[]).filter(a => a.id!==id) })
    setSelectedId(null); setEditingId(null)
  }

  const duplicateAnnot = id => {
    const src = (annotations[currentPage]||[]).find(a => a.id===id); if (!src) return
    const newId = uid()
    pushHistory({ ...annotations, [currentPage]: [...(annotations[currentPage]||[]), { ...src, id:newId, x:src.x+18, y:src.y+18 }] })
    setSelectedId(newId); setEditingId(newId)
  }

  /* ── Export ── */
  const exportPdf = async () => {
    if (!pdfBytes) return
    setSaving(true)
    try {
      const doc = await PDFDocument.load(pdfBytes)
      const fontCache = {}
      const getFont = async (family, weight, style) => {
        const key = `${family}-${weight}-${style}`
        if (!fontCache[key]) fontCache[key] = await doc.embedFont(getStandardFont(family, weight, style))
        return fontCache[key]
      }
      for (const [ps, annots] of Object.entries(annotations)) {
        const pIdx = parseInt(ps) - 1
        const page = doc.getPage(pIdx)
        const { width:pw, height:ph } = page.getSize()
        const pdfJsPage = await pdfjsDoc.getPage(parseInt(ps))
        const baseVp    = pdfJsPage.getViewport({ scale:1 })
        const scale     = pageScales[parseInt(ps)] || 1.5
        const sx = pw / (baseVp.width  * scale)
        const sy = ph / (baseVp.height * scale)
        for (const a of annots) {
          if (a.type === 'text' && a.text.trim()) {
            const font = await getFont(a.fontFamily||'Helvetica', a.fontWeight||'normal', a.fontStyle||'normal')
            const fs   = a.fontSize * sy
            page.drawText(a.text, { x:a.x*sx, y:ph-a.y*sy-fs*0.85, size:fs, font, color:hexToRgbLib(a.color) })
          } else if (a.type === 'highlight') {
            page.drawRectangle({ x:a.x*sx, y:ph-(a.y+a.h)*sy, width:a.w*sx, height:a.h*sy, color:rgb(1,1,0), opacity:0.4 })
          } else if (a.type === 'whitebox') {
            page.drawRectangle({ x:a.x*sx, y:ph-(a.y+a.h)*sy, width:a.w*sx, height:a.h*sy, color:rgb(1,1,1) })
          } else if (a.type === 'draw') {
            for (let i=1; i<a.points.length; i++) {
              page.drawLine({
                start:{ x:a.points[i-1].x*sx, y:ph-a.points[i-1].y*sy },
                end:  { x:a.points[i].x*sx,   y:ph-a.points[i].y*sy   },
                thickness:a.lineWidth*Math.min(sx,sy), color:hexToRgbLib(a.color),
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
    } catch (err) { console.error(err); toast.error('Export failed: ' + err.message) }
    finally { setSaving(false) }
  }

  /* ══════════════════ Upload screen ══════════════════ */
  if (!pdfFile) return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">✏️</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">PDF Editor</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Add text, highlight, draw and annotate PDFs — 100% in your browser</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 space-y-5">
        <FileUploadZone accept={{ 'application/pdf':['.pdf'] }} files={[]} onFiles={handleFile}
          label="Drop a PDF here to start editing" hint="Your file stays in the browser — nothing is uploaded to any server" />
        {!pdfjsReady && <p className="text-center text-sm text-blue-500 animate-pulse">Loading PDF engine…</p>}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[['🔤','Add Text','Click anywhere to place text'],['🟡','Highlight','Drag to highlight any area'],['⬜','Whiteout','Cover sensitive content'],['✏️','Freehand','Draw & annotate freely']].map(([icon,label,desc]) => (
            <div key={label} className="rounded-xl bg-gray-50 dark:bg-gray-700/40 p-3 text-center">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  /* ══════════════════ Editor ══════════════════ */
  const pageAnnots  = annotations[currentPage] || []
  const drawCursor  = { select:'default', text:'text', highlight:'crosshair', whitebox:'crosshair', draw:'crosshair' }[tool]
  const activeAnnot = pageAnnots.find(a => a.id===(editingId||selectedId) && a.type==='text')

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 64px)', background:'#e2e8f0', overflow:'hidden' }}>

      {/* ── Main toolbar ── */}
      <div style={{ background:'#1e293b', padding:'0 12px', display:'flex', alignItems:'center', gap:6, flexShrink:0, height:52, overflowX:'auto' }}>
        {TOOL_LIST.map(t => (
          <button key={t.id} onClick={() => { setTool(t.id); setSelectedId(null); setEditingId(null) }}
            style={{ padding:'5px 12px', borderRadius:7, border:'none', cursor:'pointer', fontSize:13, fontWeight:700, whiteSpace:'nowrap',
              background:tool===t.id?'#3b82f6':'rgba(255,255,255,0.08)', color:tool===t.id?'#fff':'#94a3b8' }}>
            <span style={{ marginRight:5 }}>{t.icon}</span>{t.label}
          </button>
        ))}

        <div style={{ width:1, height:28, background:'rgba(255,255,255,0.12)', margin:'0 4px', flexShrink:0 }} />
        {PRESETS.map(c => (
          <button key={c} onClick={() => setColor(c)}
            style={{ width:20, height:20, borderRadius:'50%', border:color===c?'2.5px solid #60a5fa':'1.5px solid rgba(255,255,255,0.3)', background:c, cursor:'pointer', flexShrink:0, padding:0 }} />
        ))}
        <input type="color" value={color} onChange={e => setColor(e.target.value)}
          style={{ width:28, height:28, borderRadius:6, border:'1.5px solid rgba(255,255,255,0.2)', background:'transparent', cursor:'pointer', padding:2, flexShrink:0 }} />

        {tool === 'text' && <>
          <div style={{ width:1, height:28, background:'rgba(255,255,255,0.12)', margin:'0 4px', flexShrink:0 }} />
          <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}
            style={{ fontSize:12, borderRadius:6, border:'1px solid #334155', padding:'3px 6px', background:'#0f172a', color:'#e2e8f0' }}>
            {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
            style={{ fontSize:12, borderRadius:6, border:'1px solid #334155', padding:'3px 6px', background:'#0f172a', color:'#e2e8f0' }}>
            {SIZES.map(s => <option key={s} value={s}>{s}pt</option>)}
          </select>
          <button onClick={() => setFontWeight(p => p==='bold'?'normal':'bold')}
            style={{ padding:'4px 9px', borderRadius:6, border:'none', cursor:'pointer', fontSize:13, fontWeight:700,
              background:fontWeight==='bold'?'#3b82f6':'rgba(255,255,255,0.08)', color:fontWeight==='bold'?'#fff':'#94a3b8' }}><b>B</b></button>
          <button onClick={() => setFontStyle(p => p==='italic'?'normal':'italic')}
            style={{ padding:'4px 9px', borderRadius:6, border:'none', cursor:'pointer', fontSize:13, fontWeight:700,
              background:fontStyle==='italic'?'#3b82f6':'rgba(255,255,255,0.08)', color:fontStyle==='italic'?'#fff':'#94a3b8' }}><i>I</i></button>
        </>}

        {tool === 'draw' && <>
          <div style={{ width:1, height:28, background:'rgba(255,255,255,0.12)', margin:'0 4px', flexShrink:0 }} />
          <span style={{ fontSize:12, color:'#64748b' }}>Width</span>
          <select value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))}
            style={{ fontSize:12, borderRadius:6, border:'1px solid #334155', padding:'3px 6px', background:'#0f172a', color:'#e2e8f0' }}>
            {[1,2,3,4,6,8,10,14].map(s => <option key={s} value={s}>{s}px</option>)}
          </select>
        </>}

        <span style={{ fontSize:11, color:'#475569', marginLeft:4, whiteSpace:'nowrap' }}>
          {tool==='text'&&'← Click PDF to add text'}{tool==='highlight'&&'← Drag to highlight'}
          {tool==='whitebox'&&'← Drag to cover'}{tool==='draw'&&'← Drag to draw'}
          {tool==='select'&&'← Click annotation to select'}
        </span>

        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <button onClick={undo} disabled={histIdx<=0}
            style={{ padding:'4px 10px', borderRadius:6, border:'1px solid #334155', background:'rgba(255,255,255,0.06)', color:histIdx<=0?'#374151':'#94a3b8', cursor:histIdx<=0?'not-allowed':'pointer', fontSize:12, fontWeight:600 }}>↩ Undo</button>
          <button onClick={() => setCurrentPage(p => Math.max(1,p-1))} disabled={currentPage<=1}
            style={{ padding:'4px 10px', borderRadius:6, border:'1px solid #334155', background:'rgba(255,255,255,0.06)', color:currentPage<=1?'#374151':'#94a3b8', cursor:currentPage<=1?'not-allowed':'pointer', fontSize:14 }}>‹</button>
          <span style={{ fontSize:12, color:'#64748b', fontWeight:700, minWidth:60, textAlign:'center' }}>{currentPage} / {numPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(numPages,p+1))} disabled={currentPage>=numPages}
            style={{ padding:'4px 10px', borderRadius:6, border:'1px solid #334155', background:'rgba(255,255,255,0.06)', color:currentPage>=numPages?'#374151':'#94a3b8', cursor:currentPage>=numPages?'not-allowed':'pointer', fontSize:14 }}>›</button>
          <button onClick={exportPdf} disabled={saving}
            style={{ padding:'6px 18px', borderRadius:8, background:'#16a34a', color:'#fff', border:'none', cursor:saving?'wait':'pointer', fontSize:13, fontWeight:700, whiteSpace:'nowrap' }}>
            {saving?'Saving…':'↓ Download PDF'}
          </button>
          <button onClick={() => { setPdfFile(null); setPdfjsDoc(null); setPdfBytes(null); setAnnotations({}) }}
            style={{ padding:'6px 10px', borderRadius:8, background:'rgba(255,255,255,0.06)', color:'#94a3b8', border:'1px solid #334155', cursor:'pointer', fontSize:13 }}>✕</button>
        </div>
      </div>

      {/* ── Scroll area ── */}
      <div ref={scrollAreaRef} style={{ flex:1, overflow:'auto', padding:'24px 16px', display:'flex', justifyContent:'center', alignItems:'flex-start' }}>
        <div
          ref={wrapperRef}
          style={{ position:'relative', display:'inline-block', background:'#fff', boxShadow:'0 4px 32px rgba(0,0,0,0.2)', cursor:drawCursor, userSelect:'none' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClick={onClick}
        >
          {/* PDF canvas */}
          <canvas ref={pdfCanvasRef} style={{ display:'block' }} />

          {/* ── Floating toolbar (text only) ── */}
          {activeAnnot && (
            <FloatingToolbar
              annot={activeAnnot}
              onUpdate={patch => updateAnnot(activeAnnot.id, patch)}
              onDelete={() => deleteAnnot(activeAnnot.id)}
              onDuplicate={() => duplicateAnnot(activeAnnot.id)}
            />
          )}

          {/* ── Highlights / Whitebox ── */}
          {pageAnnots.filter(a => a.type==='highlight'||a.type==='whitebox').map(a => {
            const sel = selectedId===a.id
            return (
              <div key={a.id} className="annot-el"
                style={{ position:'absolute', left:a.x, top:a.y, width:a.w, height:a.h, zIndex:9, pointerEvents:'all',
                  cursor:tool==='select'?'pointer':'inherit',
                  background:a.type==='highlight'?'rgba(253,224,71,0.45)':'#ffffff',
                  outline:sel?'2px dashed #3b82f6':'none' }}
                onClick={e=>{if(tool==='select'){e.stopPropagation();setSelectedId(a.id)}}}>
                {sel&&<button className="annot-el" onClick={e=>{e.stopPropagation();deleteAnnot(a.id)}}
                  style={{ position:'absolute',top:-11,right:-11,width:22,height:22,borderRadius:'50%',background:'#ef4444',color:'#fff',border:'2px solid #fff',cursor:'pointer',fontSize:13,lineHeight:'18px',textAlign:'center',padding:0,zIndex:30,boxShadow:'0 2px 6px rgba(0,0,0,0.3)' }}>×</button>}
              </div>
            )
          })}

          {/* ── Draw paths ── */}
          {pageAnnots.filter(a=>a.type==='draw').map(a=>{
            const sel=selectedId===a.id
            return(
              <svg key={a.id} className="annot-el"
                style={{ position:'absolute',top:0,left:0,width:'100%',height:'100%',overflow:'visible',pointerEvents:tool==='select'?'all':'none',zIndex:11,cursor:tool==='select'?'pointer':'default' }}
                onClick={e=>{if(tool==='select'){e.stopPropagation();setSelectedId(a.id)}}}>
                <polyline points={a.points.map(p=>`${p.x},${p.y}`).join(' ')}
                  stroke={a.color} strokeWidth={sel?a.lineWidth+2:a.lineWidth} fill="none" strokeLinecap="round" strokeLinejoin="round"
                  style={{ filter:sel?'drop-shadow(0 0 4px #3b82f6)':'none' }} />
                {sel&&a.points[0]&&(
                  <foreignObject x={a.points[0].x-11} y={a.points[0].y-24} width={24} height={24}>
                    <button className="annot-el" onClick={e=>{e.stopPropagation();deleteAnnot(a.id)}}
                      style={{ width:22,height:22,borderRadius:'50%',background:'#ef4444',color:'#fff',border:'2px solid #fff',cursor:'pointer',fontSize:13,lineHeight:'18px',textAlign:'center',padding:0,boxShadow:'0 2px 6px rgba(0,0,0,0.3)' }}>×</button>
                  </foreignObject>
                )}
              </svg>
            )
          })}

          {/* ── Text annotations ── */}
          {pageAnnots.filter(a=>a.type==='text').map(a=>{
            const isEd = editingId===a.id
            const sel  = selectedId===a.id
            const ff   = FONT_CSS[a.fontFamily||'Helvetica']
            return(
              <div key={a.id} className="annot-el"
                style={{ position:'absolute', left:a.x, top:a.y, zIndex:15, pointerEvents:'all' }}>
                {isEd?(
                  <FocusedTextarea
                    value={a.text}
                    onChange={e=>updateText(a.id,e.target.value)}
                    onBlur={e=>commitText(a.id,e.target.value)}
                    onKeyDown={e=>{
                      if(e.key==='Escape'){e.preventDefault();commitText(a.id,a.text)}
                      if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();commitText(a.id,e.target.value)}
                    }}
                    style={{
                      fontSize:a.fontSize, color:a.color, fontFamily:ff,
                      fontWeight:a.fontWeight||'normal', fontStyle:a.fontStyle||'normal',
                      background:'rgba(255,255,255,0.94)', border:'2px solid #3b82f6', borderRadius:4,
                      outline:'none', resize:'both', minWidth:140, minHeight:a.fontSize+14,
                      padding:'3px 6px', lineHeight:1.4, boxShadow:'0 2px 12px rgba(59,130,246,0.25)',
                    }}
                  />
                ):(
                  <div className="annot-el"
                    onDoubleClick={()=>{setEditingId(a.id);setSelectedId(a.id)}}
                    onClick={e=>{e.stopPropagation();setSelectedId(a.id);if(tool==='text'||tool==='select')setEditingId(a.id)}}
                    style={{
                      fontSize:a.fontSize, color:a.color, fontFamily:ff,
                      fontWeight:a.fontWeight||'normal', fontStyle:a.fontStyle||'normal',
                      cursor:'text', whiteSpace:'pre-wrap', padding:'3px 6px',
                      border:sel?'2px solid #3b82f6':'1.5px dashed rgba(59,130,246,0.4)',
                      borderRadius:4, background:sel?'rgba(219,234,254,0.12)':'transparent',
                      minWidth:40, lineHeight:1.4,
                    }}>
                    {a.text||<span style={{ color:'rgba(100,116,139,0.5)', fontStyle:'italic', fontSize:a.fontSize*0.85 }}>Type here…</span>}
                  </div>
                )}
              </div>
            )
          })}

          {/* Live rect preview */}
          {isDrawing&&liveDraw&&(liveDraw.type==='highlight'||liveDraw.type==='whitebox')&&(
            <div style={{ position:'absolute', pointerEvents:'none', zIndex:20,
              left:liveDraw.w>=0?liveDraw.x:liveDraw.x+liveDraw.w,
              top:liveDraw.h>=0?liveDraw.y:liveDraw.y+liveDraw.h,
              width:Math.abs(liveDraw.w), height:Math.abs(liveDraw.h),
              background:liveDraw.type==='highlight'?'rgba(253,224,71,0.45)':'rgba(255,255,255,0.85)',
              border:'1.5px dashed #3b82f6' }} />
          )}

          {/* Live freehand canvas */}
          <canvas ref={drawCanvasRef} style={{ position:'absolute',top:0,left:0,pointerEvents:'none',zIndex:12 }} />
        </div>
      </div>
    </div>
  )
}
