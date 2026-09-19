import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X } from 'lucide-react'
import toast from 'react-hot-toast'
import CloudFilePicker from './CloudFilePicker'

const MAX_MB = 25
const MAX_BYTES = MAX_MB * 1024 * 1024

export default function FileUploadZone({ accept, multiple = false, files, onFiles, onRemove, label, hint }) {
  const addFile = useCallback((file) => {
    if (multiple) onFiles(prev => [...prev, file])
    else onFiles([file])
  }, [multiple, onFiles])

  const onDrop = useCallback(accepted => {
    const oversized = accepted.filter(f => f.size > MAX_BYTES)
    const valid     = accepted.filter(f => f.size <= MAX_BYTES)
    if (oversized.length > 0) {
      oversized.forEach(f =>
        toast.error(`${f.name} exceeds the ${MAX_MB} MB limit and was skipped.`, { duration: 5000 })
      )
    }
    if (valid.length === 0) return
    if (multiple) onFiles(prev => [...prev, ...valid])
    else onFiles(valid)
  }, [multiple, onFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple })

  return (
    <div className="space-y-4">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
        {/* Upload dropzone — narrower */}
        <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'drag-over' : ''}`} style={{ flex: 1, minHeight: '200px', padding: '24px 20px' }}>
          <input {...getInputProps()} />
          <Upload size={34} className={`mx-auto mb-2 ${isDragActive ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`} />
          <p className="text-base font-medium text-gray-700 dark:text-gray-200">{label || 'Drop files here or click to browse'}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Max file size: {MAX_MB} MB</p>
          {hint && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{hint}</p>}
          <button type="button" className="btn-primary mt-3 text-sm">
            Select {multiple ? 'Files' : 'File'}
          </button>
        </div>

        {/* Cloud import — right side vertical panel */}
        <CloudFilePicker accept={accept} onFile={addFile} multiple={multiple} vertical />
      </div>

      {files && files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={i} className="file-item flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
              <File size={18} className="text-red-500 shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-200 flex-1 truncate">{f.name}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {f.size >= 1024 * 1024 ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : `${(f.size / 1024).toFixed(0)} KB`}
              </span>
              {onRemove && (
                <button onClick={() => onRemove(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
