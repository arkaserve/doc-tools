import { useState } from 'react'
import ToolPageLayout from '../components/ToolPageLayout'
import FileUploadZone from '../components/FileUploadZone'
import useFileProcessor from '../hooks/useFileProcessor'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

function getStrength(pwd) {
  if (!pwd) return null
  let score = 0
  if (pwd.length >= 8)  score++
  if (pwd.length >= 12) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (score <= 1) return { level: 'Weak',        color: '#ef4444', width: '20%' }
  if (score <= 2) return { level: 'Fair',         color: '#f97316', width: '40%' }
  if (score <= 3) return { level: 'Good',         color: '#eab308', width: '60%' }
  if (score <= 4) return { level: 'Strong',       color: '#22c55e', width: '80%' }
  return              { level: 'Very Strong',  color: '#16a34a', width: '100%' }
}

export default function ProtectPdf() {
  const [files, setFiles]     = useState([])
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const { processing, result, process, download, reset } = useFileProcessor()

  const strength = getStrength(password)

  const handleProcess = async () => {
    if (!files[0]) return toast.error('Please select a PDF file')
    if (!password)  return toast.error('Please enter a password')
    if (strength?.level === 'Weak') return toast('Consider using a stronger password for better security', { icon: '⚠️' })
    const fd = new FormData()
    fd.append('file', files[0])
    fd.append('password', password)
    await process('/pdf/protect', fd, 'protected.pdf')
  }

  return (
    <ToolPageLayout
      icon="🔒" title="Protect PDF" description="Password-protect your PDF to restrict access"
      onProcess={handleProcess} processing={processing} result={result}
      onDownload={download} onReset={() => { reset(); setFiles([]); setPassword('') }}
    >
      <FileUploadZone
        accept={{ 'application/pdf': ['.pdf'] }}
        files={files} onFiles={setFiles} onRemove={() => setFiles([])}
        label="Drop a PDF file here"
      />

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            {strength && (
              <span className="text-xs font-semibold" style={{ color: strength.color }}>
                {strength.level}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter a strong password"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <button onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Strength bar */}
          {strength && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: strength.width, background: strength.color }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {strength.level === 'Weak'       && 'Add uppercase letters, numbers, or symbols'}
                {strength.level === 'Fair'       && 'Try making it longer or adding symbols'}
                {strength.level === 'Good'       && 'Getting there — add a symbol or two'}
                {strength.level === 'Strong'     && 'Good password! One more character type would make it very strong'}
                {strength.level === 'Very Strong' && 'Excellent — this is a very strong password'}
              </p>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="grid grid-cols-2 gap-2">
          {['8+ characters', 'Uppercase & lowercase', 'Numbers (0–9)', 'Symbols (!@#$)'].map(tip => (
            <div key={tip} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[9px] flex-shrink-0 ${
                (tip === '8+ characters'         && password.length >= 8)   ||
                (tip === 'Uppercase & lowercase' && /[A-Z]/.test(password) && /[a-z]/.test(password)) ||
                (tip === 'Numbers (0–9)'         && /[0-9]/.test(password)) ||
                (tip === 'Symbols (!@#$)'        && /[^A-Za-z0-9]/.test(password))
                  ? 'bg-green-500' : 'bg-gray-200'
              }`}>✓</span>
              {tip}
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
          ⚠️ Remember your password — there is no way to recover an encrypted PDF without it.
        </div>
      </div>
    </ToolPageLayout>
  )
}
