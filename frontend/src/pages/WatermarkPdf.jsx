import { useState } from 'react'
import ToolPageLayout from '../components/ToolPageLayout'
import FileUploadZone from '../components/FileUploadZone'
import useFileProcessor from '../hooks/useFileProcessor'
import toast from 'react-hot-toast'

const PRESETS = [
  { label: 'CONFIDENTIAL', color: '#DC2626' },
  { label: 'DRAFT',        color: '#D97706' },
  { label: 'DO NOT COPY',  color: '#7C3AED' },
  { label: 'SAMPLE',       color: '#0891B2' },
  { label: 'APPROVED',     color: '#16A34A' },
  { label: 'INTERNAL USE', color: '#6B7280' },
]

export default function WatermarkPdf() {
  const [files, setFiles]     = useState([])
  const [text, setText]       = useState('CONFIDENTIAL')
  const [opacity, setOpacity] = useState('0.3')
  const [color, setColor]     = useState('#DC2626')
  const { processing, result, process, download, reset } = useFileProcessor()

  const handleProcess = async () => {
    if (!files[0]) return toast.error('Please select a PDF file')
    if (!text.trim()) return toast.error('Please enter watermark text')
    const fd = new FormData()
    fd.append('file', files[0])
    fd.append('text', text)
    fd.append('opacity', opacity)
    fd.append('color', color)
    await process('/pdf/watermark', fd, 'watermarked.pdf')
  }

  // Hex → rgba for live preview
  const hexR = parseInt(color.slice(1, 3), 16)
  const hexG = parseInt(color.slice(3, 5), 16)
  const hexB = parseInt(color.slice(5, 7), 16)
  const previewColor = `rgba(${hexR},${hexG},${hexB},${opacity})`

  return (
    <ToolPageLayout
      icon="🔏" title="Watermark PDF" description="Add a text watermark to your PDF pages"
      onProcess={handleProcess} processing={processing} result={result}
      onDownload={download} onReset={() => { reset(); setFiles([]) }}
    >
      <FileUploadZone
        accept={{ 'application/pdf': ['.pdf'] }}
        files={files} onFiles={setFiles} onRemove={() => setFiles([])}
        label="Drop a PDF file here"
      />

      <div className="space-y-4">
        {/* Presets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quick presets</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button key={p.label} type="button"
                onClick={() => { setText(p.label); setColor(p.color) }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${text === p.label ? 'text-white' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                style={text === p.label ? { background: p.color, borderColor: p.color } : {}}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Watermark text</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opacity ({Math.round(opacity * 100)}%)</label>
            <input type="range" min="0.05" max="1" step="0.05" value={opacity}
              onChange={e => setOpacity(e.target.value)} className="w-full accent-red-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Subtle</span><span>Bold</span></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer flex-shrink-0" />
              <span className="text-xs text-gray-400 font-mono">{color.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Live preview */}
        {text.trim() && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
            <div className="relative h-36 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
              {/* Simulated page lines */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute w-3/4 h-px bg-gray-200" style={{ top: `${20 + i * 22}%` }} />
              ))}
              {/* Watermark */}
              <span
                className="absolute select-none font-black text-3xl tracking-widest pointer-events-none"
                style={{
                  color: previewColor,
                  transform: 'rotate(-35deg)',
                  whiteSpace: 'nowrap',
                  fontSize: `clamp(14px, ${Math.max(16, 36 - text.length)}px, 36px)`,
                  letterSpacing: '0.08em',
                }}>
                {text}
              </span>
              <span className="absolute bottom-2 right-3 text-[10px] text-gray-300">Preview only</span>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  )
}
