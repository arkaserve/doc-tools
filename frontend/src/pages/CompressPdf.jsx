import { useState, useEffect } from 'react'
import ToolPageLayout from '../components/ToolPageLayout'
import FileUploadZone from '../components/FileUploadZone'
import useFileProcessor from '../hooks/useFileProcessor'
import toast from 'react-hot-toast'

const fmt = n => n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`

// Estimated output size ranges per quality level (ratio of original)
const LEVELS = [
  {
    value: 'low',
    label: 'Low',
    tagline: 'Smallest file',
    desc: 'Aggressive compression. Ideal for email or web upload.',
    minRatio: 0.15,
    maxRatio: 0.35,
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
    selectedBorder: '#dc2626',
    selectedBg: '#fef2f2',
  },
  {
    value: 'medium',
    label: 'Medium',
    tagline: 'Balanced',
    desc: 'Good compression without visible quality loss. Best for most uses.',
    minRatio: 0.35,
    maxRatio: 0.60,
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    selectedBorder: '#f59e0b',
    selectedBg: '#fffbeb',
  },
  {
    value: 'high',
    label: 'High',
    tagline: 'Best quality',
    desc: 'Light compression. Keeps maximum quality for printing or archiving.',
    minRatio: 0.60,
    maxRatio: 0.85,
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    selectedBorder: '#16a34a',
    selectedBg: '#f0fdf4',
  },
]

function getRecommended(sizeBytes) {
  const mb = sizeBytes / 1024 / 1024
  if (mb > 5) return 'low'
  if (mb > 1) return 'medium'
  return 'high'
}

function SizeBar({ original, resultSize }) {
  const pct = Math.max(5, Math.round((resultSize / original) * 100))
  const saved = Math.round((1 - resultSize / original) * 100)
  return (
    <div className="mt-4 p-4 rounded-xl border border-green-200 bg-green-50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-600">Size reduction</span>
        <span className="text-sm font-bold text-green-700">↓ {saved}% saved</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
        <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1.5">
        <span>Original: {fmt(original)}</span>
        <span>Compressed: {fmt(resultSize)}</span>
      </div>
    </div>
  )
}

export default function CompressPdf() {
  const [files, setFiles] = useState([])
  const [quality, setQuality] = useState('medium')
  const { processing, result, process, download, reset } = useFileProcessor()

  const file = files[0] ?? null
  const recommended = file ? getRecommended(file.size) : null

  // Auto-select recommended level when file changes
  useEffect(() => {
    if (recommended) setQuality(recommended)
  }, [recommended])

  const handleProcess = async () => {
    if (!file) return toast.error('Please select a PDF file')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('quality', quality)
    await process('/pdf/compress', fd, 'compressed.pdf')
  }

  const level = LEVELS.find(l => l.value === quality)

  return (
    <ToolPageLayout
      icon="📦" title="Compress PDF" description="Reduce PDF file size while maintaining quality"
      onProcess={handleProcess} processing={processing} result={result}
      onDownload={download} onReset={() => { reset(); setFiles([]) }}
    >
      <FileUploadZone
        accept={{ 'application/pdf': ['.pdf'] }}
        files={files} onFiles={setFiles} onRemove={() => { setFiles([]); reset() }}
        label="Drop a PDF file here"
      />

      {/* File size info + recommendation */}
      {file && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm">
          <span className="text-gray-600">
            File size: <span className="font-semibold text-gray-800">{fmt(file.size)}</span>
          </span>
          {recommended && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: LEVELS.find(l => l.value === recommended)?.bg, color: LEVELS.find(l => l.value === recommended)?.color, border: `1px solid ${LEVELS.find(l => l.value === recommended)?.border}` }}>
              ✦ Recommended: {LEVELS.find(l => l.value === recommended)?.label}
            </span>
          )}
        </div>
      )}

      {/* Compression level cards */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Compression level</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LEVELS.map(l => {
            const isSelected = quality === l.value
            const isRecommended = recommended === l.value
            const estMin = file ? fmt(file.size * l.minRatio) : null
            const estMax = file ? fmt(file.size * l.maxRatio) : null
            return (
              <button key={l.value} onClick={() => setQuality(l.value)}
                className="p-3.5 rounded-xl border-2 text-left transition-all"
                style={{
                  borderColor: isSelected ? l.selectedBorder : '#e5e7eb',
                  background: isSelected ? l.selectedBg : '#fff',
                }}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm" style={{ color: isSelected ? l.color : '#374151' }}>{l.label}</p>
                  {isRecommended && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: l.bg, color: l.color }}>✦ Rec.</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2">{l.desc}</p>
                {file && (
                  <p className="text-xs font-medium" style={{ color: l.color }}>
                    ~{estMin} – {estMax}
                  </p>
                )}
              </button>
            )
          })}
        </div>
        {file && (
          <p className="text-xs text-gray-400 mt-2">
            * Estimated output for a {fmt(file.size)} file. Actual size depends on PDF content.
          </p>
        )}
      </div>

      {/* Result: before/after */}
      {result?.size && file && (
        <SizeBar original={file.size} resultSize={result.size} />
      )}
    </ToolPageLayout>
  )
}
