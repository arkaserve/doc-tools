import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Download, Loader2, RotateCcw, Share2, Check, Linkedin } from 'lucide-react'
import { getPageMeta } from '../lib/pageMeta'

// Related tools map — each tool links to its most relevant neighbours
const RELATED_TOOLS = {
  '/merge-pdf':      [{ path:'/split-pdf', label:'Split PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/rotate-pdf', label:'Rotate PDF' },{ path:'/pdf-to-word', label:'PDF to Word' }],
  '/split-pdf':      [{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/rotate-pdf', label:'Rotate PDF' },{ path:'/protect-pdf', label:'Protect PDF' }],
  '/compress-pdf':   [{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/split-pdf', label:'Split PDF' },{ path:'/pdf-to-word', label:'PDF to Word' },{ path:'/pdf-to-jpg', label:'PDF to JPG' }],
  '/pdf-to-word':    [{ path:'/word-to-pdf', label:'Word to PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/pdf-to-jpg', label:'PDF to JPG' }],
  '/word-to-pdf':    [{ path:'/pdf-to-word', label:'PDF to Word' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/excel-to-pdf', label:'Excel to PDF' }],
  '/pdf-to-jpg':     [{ path:'/jpg-to-pdf', label:'JPG to PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/pdf-to-word', label:'PDF to Word' },{ path:'/image-compressor', label:'Compress Image' }],
  '/jpg-to-pdf':     [{ path:'/pdf-to-jpg', label:'PDF to JPG' },{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/image-compressor', label:'Compress Image' }],
  '/rotate-pdf':     [{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/split-pdf', label:'Split PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/watermark-pdf', label:'Watermark PDF' }],
  '/protect-pdf':    [{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/watermark-pdf', label:'Watermark PDF' },{ path:'/split-pdf', label:'Split PDF' }],
  '/watermark-pdf':  [{ path:'/protect-pdf', label:'Protect PDF' },{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/rotate-pdf', label:'Rotate PDF' }],
  '/excel-to-pdf':   [{ path:'/pdf-to-excel', label:'PDF to Excel' },{ path:'/word-to-pdf', label:'Word to PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/merge-pdf', label:'Merge PDF' }],
  '/pdf-to-excel':   [{ path:'/excel-to-pdf', label:'Excel to PDF' },{ path:'/pdf-to-word', label:'PDF to Word' },{ path:'/json-to-csv', label:'JSON to CSV' },{ path:'/compress-pdf', label:'Compress PDF' }],
  '/html-to-pdf':    [{ path:'/word-to-pdf', label:'Word to PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/merge-pdf', label:'Merge PDF' },{ path:'/markdown-preview', label:'Markdown Preview' }],
  '/pdf-to-pptx':    [{ path:'/pptx-to-pdf', label:'PPT to PDF' },{ path:'/pdf-to-word', label:'PDF to Word' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/merge-pdf', label:'Merge PDF' }],
  '/pptx-to-pdf':    [{ path:'/pdf-to-pptx', label:'PDF to PPT' },{ path:'/word-to-pdf', label:'Word to PDF' },{ path:'/compress-pdf', label:'Compress PDF' },{ path:'/merge-pdf', label:'Merge PDF' }],
  '/json-beautifier':[{ path:'/json-validator', label:'JSON Validator' },{ path:'/json-to-csv', label:'JSON to CSV' },{ path:'/xml-beautifier', label:'XML Beautifier' },{ path:'/sql-formatter', label:'SQL Formatter' }],
  '/json-validator': [{ path:'/json-beautifier', label:'JSON Beautifier' },{ path:'/json-to-csv', label:'JSON to CSV' },{ path:'/yaml-json', label:'YAML ↔ JSON' },{ path:'/xml-beautifier', label:'XML Beautifier' }],
  '/sql-formatter':  [{ path:'/json-beautifier', label:'JSON Beautifier' },{ path:'/xml-beautifier', label:'XML Beautifier' },{ path:'/code-diff', label:'Code Diff' },{ path:'/hash-generator', label:'Hash Generator' }],
  '/bg-remover':     [{ path:'/image-compressor', label:'Compress Image' },{ path:'/image-resizer', label:'Resize Image' },{ path:'/webp-converter', label:'WebP Converter' },{ path:'/image-cropper', label:'Crop Image' }],
  '/image-compressor':[{ path:'/image-resizer', label:'Resize Image' },{ path:'/image-cropper', label:'Crop Image' },{ path:'/bg-remover', label:'Remove BG' },{ path:'/webp-converter', label:'WebP Converter' }],
  '/image-resizer':  [{ path:'/image-compressor', label:'Compress Image' },{ path:'/image-cropper', label:'Crop Image' },{ path:'/bg-remover', label:'Remove BG' },{ path:'/webp-converter', label:'WebP Converter' }],
  '/image-cropper':  [{ path:'/image-compressor', label:'Compress Image' },{ path:'/image-resizer', label:'Resize Image' },{ path:'/bg-remover', label:'Remove BG' },{ path:'/favicon-generator', label:'Favicon Generator' }],
  '/heic-converter': [{ path:'/image-compressor', label:'Compress Image' },{ path:'/webp-converter', label:'WebP Converter' },{ path:'/jpg-to-pdf', label:'JPG to PDF' },{ path:'/bg-remover', label:'Remove BG' }],
  '/webp-converter': [{ path:'/image-compressor', label:'Compress Image' },{ path:'/heic-converter', label:'HEIC to JPG' },{ path:'/svg-converter', label:'SVG Converter' },{ path:'/image-resizer', label:'Resize Image' }],
  '/qr-generator':   [{ path:'/image-compressor', label:'Compress Image' },{ path:'/favicon-generator', label:'Favicon Generator' },{ path:'/color-converter', label:'Color Converter' },{ path:'/hash-generator', label:'Hash Generator' }],
  '/hash-generator': [{ path:'/base64', label:'Base64 Encoder' },{ path:'/url-encode', label:'URL Encoder' },{ path:'/jwt-debugger', label:'JWT Debugger' },{ path:'/json-beautifier', label:'JSON Beautifier' }],
  '/jwt-debugger':   [{ path:'/hash-generator', label:'Hash Generator' },{ path:'/base64', label:'Base64 Encoder' },{ path:'/json-beautifier', label:'JSON Beautifier' },{ path:'/url-encode', label:'URL Encoder' }],
  '/word-count':     [{ path:'/word-compare', label:'Word Compare' },{ path:'/markdown-preview', label:'Markdown Preview' },{ path:'/lorem-ipsum', label:'Lorem Ipsum' },{ path:'/pdf-to-word', label:'PDF to Word' }],
  '/word-compare':   [{ path:'/word-count', label:'Word Count' },{ path:'/code-diff', label:'Code Diff' },{ path:'/markdown-preview', label:'Markdown Preview' },{ path:'/json-beautifier', label:'JSON Beautifier' }],
}

const SITE_NAME = 'Arkaserve Tools'
const SITE_URL = 'https://tools.arkaserve.com'

const TRUST_BADGES = [
  { label: '✓ 100% Free', bg: '#dcfce7', color: '#166534' },
  { label: '✓ No Signup', bg: '#dbeafe', color: '#1e40af' },
  { label: '⚡ Instant & Fast', bg: '#fef9c3', color: '#854d0e' },
  { label: '🔒 Private & Secure', bg: '#f3e8ff', color: '#6b21a8' },
]

function ShareButton({ href, label, icon, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ background: color, color: '#fff', textDecoration: 'none', border: 'none' }}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
    >
      {icon}
      {label}
    </a>
  )
}

function SuccessBanner({ result, onDownload, onReset, title }) {
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(SITE_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareText = encodeURIComponent(`I just used ${title} for FREE on ${SITE_NAME} — ${SITE_URL}`)
  const shareUrl  = encodeURIComponent(SITE_URL)

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #d1fae5' }}>
      <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' }} className="px-6 py-6 text-center">
        <div className="mx-auto mb-3 w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)' }}>
          <Check size={28} className="text-white" strokeWidth={3} />
        </div>
        <h3 className="text-white font-bold text-lg mb-1">Your file is ready!</h3>
        <p className="text-emerald-200 text-sm truncate max-w-xs mx-auto">{result.name}</p>
      </div>

      <div className="px-6 py-4" style={{ background: '#f0fdf4', borderBottom: '1px solid #d1fae5' }}>
        <button
          onClick={onDownload}
          aria-label={`Download ${result?.name || 'processed file'}`}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.01] active:scale-100"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 4px 14px rgba(5,150,105,0.35)' }}
        >
          <Download size={17} strokeWidth={2.5} aria-hidden="true" />
          Download File
        </button>

        {onReset && (
          <button
            onClick={onReset}
            className="w-full mt-2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            style={{ background: 'transparent', border: '1.5px solid #6ee7b7' }}
          >
            <RotateCcw size={14} />
            Convert another file
          </button>
        )}
      </div>

      <div className="px-6 py-4" style={{ background: '#fff' }}>
        <div className="flex items-center gap-2 mb-3">
          <Share2 size={14} className="text-gray-400" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Love Arkaserve Tools? Spread the word!</p>
        </div>
        <p className="text-xs text-gray-400 mb-3">Help others discover free tools — share with a friend or on social media.</p>
        <div className="flex flex-wrap gap-2">
          <ShareButton
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            label="Twitter / X"
            color="#000"
            icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
          />
          <ShareButton
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            label="LinkedIn"
            color="#0077B5"
            icon={<Linkedin size={13} />}
          />
          <ShareButton
            href={`https://wa.me/?text=${shareText}`}
            label="WhatsApp"
            color="#25D366"
            icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
          />
          <button
            onClick={copyLink}
            style={{ background: copied ? '#6366f1' : '#f1f5f9', color: copied ? '#fff' : '#475569', border: 'none', cursor: 'pointer' }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all hover:bg-gray-200"
          >
            {copied ? <Check size={13} /> : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ToolPageLayout({ icon, title, description, children, onProcess, processing, result, onDownload, onReset }) {
  const { pathname } = useLocation()
  const meta = getPageMeta(pathname)
  const related = RELATED_TOOLS[pathname] || []
  const steps = meta.steps || []
  const faqs = meta.faqs || []

  useEffect(() => {
    const existing = document.getElementById('tool-page-jsonld')
    if (existing) existing.remove()

    const graph = [
      {
        '@type': 'SoftwareApplication',
        name: `${title} — DocCraft`,
        applicationCategory: 'WebApplication',
        operatingSystem: 'All',
        url: `${SITE_URL}${pathname}`,
        description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', name: 'Arkaserve', url: 'https://arkaserve.com' },
      },
    ]

    if (faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })
    }

    const script = document.createElement('script')
    script.id = 'tool-page-jsonld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    document.head.appendChild(script)

    return () => {
      const el = document.getElementById('tool-page-jsonld')
      if (el) el.remove()
    }
  }, [pathname, title, description])

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-2xl flex-shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{description}</p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TRUST_BADGES.map(({ label, bg, color }) => (
          <span key={label} style={{ background: bg, color }} className="text-xs font-semibold px-3 py-1 rounded-full">
            {label}
          </span>
        ))}
      </div>

      {/* Main tool card */}
      <div className="tool-page-card bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-6 mb-8">
        {children}

        {onProcess && !result && (
          <button
            onClick={onProcess}
            disabled={processing}
            aria-label={processing ? 'Processing your file, please wait' : `Process with ${title}`}
            aria-busy={processing}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {processing ? (
              <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Processing...</>
            ) : (
              'Process'
            )}
          </button>
        )}

        {result && (
          <SuccessBanner
            result={result}
            onDownload={onDownload}
            onReset={onReset}
            title={title}
          />
        )}
      </div>

      {/* How to Use */}
      {steps.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            How to Use {title} — Free &amp; Instant
          </h2>
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span
                  className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: '#fee2e2', color: '#dc2626' }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <summary className="flex items-center justify-between gap-2 px-4 py-3 cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 select-none list-none" aria-label={faq.q}>
                  <span>{faq.q}</span>
                  <svg
                    className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools — internal linking for SEO */}
      {related.length > 0 && (
        <section className="mt-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Related Free Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {related.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {label} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
