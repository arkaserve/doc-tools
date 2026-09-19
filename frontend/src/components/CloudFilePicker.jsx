import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { Link2, X, Loader2 } from 'lucide-react'

const MAX_BYTES = 25 * 1024 * 1024

// ── Google Drive Picker ───────────────────────────────────────────────────────
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const GOOGLE_API_KEY   = import.meta.env.VITE_GOOGLE_API_KEY   || ''

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src; s.onload = resolve; s.onerror = reject
    document.head.appendChild(s)
  })
}

async function openGooglePicker(accept, onFile) {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_API_KEY) {
    toast.error('Google Drive is not configured. Please add VITE_GOOGLE_CLIENT_ID and VITE_GOOGLE_API_KEY to your Vercel env vars.')
    return
  }
  try {
    await loadScript('https://apis.google.com/js/api.js')
    await loadScript('https://accounts.google.com/gsi/client')

    // Get OAuth token — resolve null on user cancel so we don't show an error
    const token = await new Promise((resolve) => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        callback: (resp) => {
          if (resp.error === 'access_denied' || resp.error === 'popup_closed_by_user' || resp.error === 'cancelled') {
            resolve(null) // user cancelled — treat silently
          } else if (resp.error) {
            resolve(null)
          } else {
            resolve(resp.access_token)
          }
        },
        error_callback: () => resolve(null),
      })
      client.requestAccessToken({ prompt: '' })
    })
    if (!token) return // user cancelled — nothing to do

    // Build MIME type filter
    const mimeTypes = Object.values(accept).flat().map(ext => {
      const map = {
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
        '.png': 'image/png', '.webp': 'image/webp',
        '.heic': 'image/heic', '.svg': 'image/svg+xml',
        '.txt': 'text/plain', '.html': 'text/html',
      }
      return map[ext] || ''
    }).filter(Boolean).join(',')

    await new Promise(resolve => window.gapi.load('picker', resolve))

    const view = new window.google.picker.DocsView()
      .setIncludeFolders(false)

    if (mimeTypes) view.setMimeTypes(mimeTypes)

    new window.google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(token)
      .setDeveloperKey(GOOGLE_API_KEY)
      .setTitle('Select a file from Google Drive')
      .setCallback(async (data) => {
        if (data.action !== window.google.picker.Action.PICKED) return
        const doc = data.docs[0]
        const id = doc.id
        const name = doc.name
        const toastId = toast.loading(`Downloading ${name} from Google Drive…`)
        try {
          const r = await fetch(
            `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          if (!r.ok) throw new Error('Download failed')
          const blob = await r.blob()
          if (blob.size > MAX_BYTES) { toast.error(`${name} exceeds the 25 MB limit`, { id: toastId }); return }
          const file = new File([blob], name, { type: blob.type || doc.mimeType })
          toast.success(`${name} imported from Google Drive`, { id: toastId })
          onFile(file)
        } catch (e) {
          toast.error(`Could not download from Google Drive: ${e.message}`, { id: toastId })
        }
      })
      .build()
      .setVisible(true)
  } catch (e) {
    // Only show error for non-cancel failures
    if (!String(e).includes('access_denied') && !String(e).includes('popup_closed') && !String(e).includes('cancelled')) {
      toast.error('Google Drive sign-in failed. Please try again.')
    }
  }
}

// ── Dropbox Chooser ───────────────────────────────────────────────────────────
const DROPBOX_APP_KEY = import.meta.env.VITE_DROPBOX_APP_KEY || ''

async function openDropboxPicker(accept, onFile) {
  if (!DROPBOX_APP_KEY) {
    toast.error('Dropbox is not configured. Please add VITE_DROPBOX_APP_KEY to your Vercel env vars.')
    return
  }
  await loadScript('https://www.dropbox.com/static/api/2/dropins.js')
  window.Dropbox.appKey = DROPBOX_APP_KEY

  const extensions = Object.values(accept).flat()

  window.Dropbox.choose({
    success: async (files) => {
      const { name, link } = files[0]
      const toastId = toast.loading(`Downloading ${name} from Dropbox…`)
      try {
        // Convert to direct download link
        const directLink = link.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '')
        const r = await fetch(directLink)
        if (!r.ok) throw new Error('Download failed')
        const blob = await r.blob()
        if (blob.size > MAX_BYTES) { toast.error(`${name} exceeds the 25 MB limit`, { id: toastId }); return }
        const mimeType = blob.type || 'application/octet-stream'
        const file = new File([blob], name, { type: mimeType })
        toast.success(`${name} imported from Dropbox`, { id: toastId })
        onFile(file)
      } catch (e) {
        toast.error(`Could not download from Dropbox: ${e.message}`, { id: toastId })
      }
    },
    cancel: () => {},
    linkType: 'direct',
    multiselect: false,
    extensions,
    folderselect: false,
  })
}

// ── OneDrive Picker ───────────────────────────────────────────────────────────
async function openOneDrivePicker(onFile) {
  const odOptions = {
    clientId: import.meta.env.VITE_ONEDRIVE_CLIENT_ID || '',
    action: 'download',
    multiSelect: false,
    openInNewWindow: true,
    success: async (files) => {
      const item = files.value[0]
      const name = item.name
      const url = item['@microsoft.graph.downloadUrl']
      const toastId = toast.loading(`Downloading ${name} from OneDrive…`)
      try {
        const r = await fetch(url)
        if (!r.ok) throw new Error('Download failed')
        const blob = await r.blob()
        if (blob.size > MAX_BYTES) { toast.error(`${name} exceeds the 25 MB limit`, { id: toastId }); return }
        const file = new File([blob], name, { type: blob.type || 'application/octet-stream' })
        toast.success(`${name} imported from OneDrive`, { id: toastId })
        onFile(file)
      } catch (e) {
        toast.error(`Could not download from OneDrive: ${e.message}`, { id: toastId })
      }
    },
    cancel: () => {},
    error: (e) => toast.error(`OneDrive error: ${e.message}`),
  }
  if (!odOptions.clientId) {
    toast.error('OneDrive is not configured. Please add VITE_ONEDRIVE_CLIENT_ID to your Vercel env vars.')
    return
  }
  await loadScript('https://js.live.net/v7.2/OneDrive.js')
  window.OneDrive.open(odOptions)
}

// ── URL Import ────────────────────────────────────────────────────────────────
function UrlImport({ onFile, onClose }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImport = async () => {
    if (!url.trim()) return
    setLoading(true)
    try {
      // Try CORS fetch first; if blocked, inform user
      const r = await fetch(url.trim())
      if (!r.ok) throw new Error(`Server returned ${r.status}`)
      const blob = await r.blob()
      if (blob.size > MAX_BYTES) { toast.error('File exceeds the 25 MB limit'); setLoading(false); return }
      const name = url.split('/').pop().split('?')[0] || 'imported-file'
      const file = new File([blob], name, { type: blob.type || 'application/octet-stream' })
      toast.success(`${name} imported from URL`)
      onFile(file)
      onClose()
    } catch (e) {
      toast.error('Could not fetch file. The URL must be a public direct-download link (not a webpage).')
    }
    setLoading(false)
  }

  return (
    <div style={{ marginTop: '10px', padding: '14px', background: '#f8f7ff', border: '1px solid #e0e7ff', borderRadius: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b4b' }}>Import from URL</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={15} /></button>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px', lineHeight: 1.6 }}>
        Paste a direct download link from Google Drive (shared publicly), Dropbox, OneDrive, or any URL.
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleImport()}
          placeholder="https://drive.google.com/uc?export=download&id=..."
          style={{ flex: 1, padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #e0e7ff', fontSize: '13px', outline: 'none', color: '#374151' }}
          onFocus={e => e.target.style.borderColor = '#f43f5e'}
          onBlur={e => e.target.style.borderColor = '#e0e7ff'}
        />
        <button
          onClick={handleImport}
          disabled={!url.trim() || loading}
          style={{ padding: '9px 16px', background: url.trim() && !loading ? 'linear-gradient(135deg,#fb7185,#f43f5e)' : '#e0e7ff', color: url.trim() && !loading ? '#fff' : '#94a3b8', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '13px', cursor: url.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
          {loading ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : null}
          {loading ? 'Importing…' : 'Import'}
        </button>
      </div>
    </div>
  )
}

// ── Main CloudFilePicker component ────────────────────────────────────────────
const CLOUD_SOURCES = [
  {
    id: 'google',
    label: 'Google Drive',
    icon: (
      <svg width="16" height="16" viewBox="0 0 87.3 78" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
        <path d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 49.35C.4 50.75 0 52.3 0 53.85h27.5z" fill="#00ac47"/>
        <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 11.5z" fill="#ea4335"/>
        <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
        <path d="M59.8 53.85h27.5c0-1.55-.4-3.1-1.2-4.5L60.7 4.5c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25z" fill="#2684fc"/>
        <path d="M43.65 25L27.5 53.85h32.3L43.65 25z" fill="#00ac47"/>
        <path d="M27.5 53.85l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h51c1.6 0 3.15-.4 4.5-1.2L59.8 53.85z" fill="#ffba00"/>
      </svg>
    ),
    color: '#4285F4',
    bg: '#EEF3FF',
  },
  {
    id: 'dropbox',
    label: 'Dropbox',
    icon: (
      <svg width="16" height="16" viewBox="0 0 528 528" fill="#0061FF" xmlns="http://www.w3.org/2000/svg">
        <path d="M264 0L132 82.5 264 165 396 82.5zm-132 247.5L0 165l132 82.5 132-82.5zm0-165L0 165l132-82.5zM396 247.5L264 165l132 82.5 132-82.5zm-264 0l132 82.5 132-82.5-132-82.5zm132 82.5L132 247.5 264 330l132-82.5zm0 82.5l-132 82.5 132 82.5 132-82.5z"/>
      </svg>
    ),
    color: '#0061FF',
    bg: '#EEF5FF',
  },
  {
    id: 'onedrive',
    label: 'OneDrive',
    icon: (
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.8 5.4A4.2 4.2 0 006.9.6a4.2 4.2 0 00-3.78 2.37A3 3 0 000 6a3 3 0 003 3h7.5a2.25 2.25 0 000-4.5 2.25 2.25 0 00-.3.03A4.18 4.18 0 0010.8 5.4z" fill="#0078D4"/>
        <path d="M12.15 4.2h-.15a3.75 3.75 0 010 7.5H3.75A3 3 0 012.1 9H3a3 3 0 003-3 3.1 3.1 0 00-.03-.42A4.2 4.2 0 016.9.6a4.18 4.18 0 013.84 2.52 3.75 3.75 0 011.41 1.08z" fill="#1490DF"/>
        <path d="M17.25 7.5a2.25 2.25 0 01-2.25 2.25H3.75a3 3 0 01-1.65-5.52A3.7 3.7 0 013 4.2a3.75 3.75 0 013.57 2.6 2.24 2.24 0 012.13-1.55 2.25 2.25 0 012.25 2.25.6.6 0 000 .1 2.25 2.25 0 011.55-.6 2.25 2.25 0 012.25 2.25l1.55.25z" fill="#28A8E0"/>
      </svg>
    ),
    color: '#0078D4',
    bg: '#EEF6FF',
  },
  {
    id: 'url',
    label: 'From URL',
    icon: <Link2 size={15} color="#7c3aed" />,
    color: '#7c3aed',
    bg: '#F5F3FF',
  },
]

export default function CloudFilePicker({ accept, onFile, multiple = false }) {
  const [urlOpen, setUrlOpen] = useState(false)
  const [loading, setLoading] = useState(null)

  const handleSource = async (id) => {
    if (id === 'url') { setUrlOpen(o => !o); return }

    setLoading(id)
    try {
      if (id === 'google') await openGooglePicker(accept, onFile)
      else if (id === 'dropbox') await openDropboxPicker(accept, onFile)
      else if (id === 'onedrive') await openOneDrivePicker(onFile)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ marginTop: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{ flex: 1, height: '1px', background: '#e0e7ff' }} />
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>OR IMPORT FROM</span>
        <div style={{ flex: 1, height: '1px', background: '#e0e7ff' }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {CLOUD_SOURCES.map(s => (
          <button
            key={s.id}
            onClick={() => handleSource(s.id)}
            disabled={!!loading}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '7px 14px',
              background: urlOpen && s.id === 'url' ? s.bg : '#fff',
              border: `1.5px solid ${urlOpen && s.id === 'url' ? s.color : '#e0e7ff'}`,
              borderRadius: '10px',
              fontSize: '12.5px', fontWeight: 600, color: '#374151',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading && loading !== s.id ? 0.5 : 1,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.background = s.bg } }}
            onMouseLeave={e => { if (!loading) { e.currentTarget.style.borderColor = urlOpen && s.id === 'url' ? s.color : '#e0e7ff'; e.currentTarget.style.background = urlOpen && s.id === 'url' ? s.bg : '#fff' } }}
          >
            {loading === s.id
              ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite', color: s.color }} />
              : s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {urlOpen && (
        <UrlImport onFile={(f) => { onFile(f); setUrlOpen(false) }} onClose={() => setUrlOpen(false)} />
      )}
    </div>
  )
}
