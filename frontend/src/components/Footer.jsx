import { Link, useLocation } from 'react-router-dom'
import { useSiteStats } from '../hooks/usePageView'

const DARK = '#1e1b4b'
const INFO_PAGES = ['/about', '/contact', '/feedback']

function OdometerCounter({ value }) {
  const digits = String(value ?? 0).padStart(6, '0').split('')
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px' }}>
      <div style={{ display: 'flex', gap: '3px' }}>
        {digits.map((d, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '28px', height: '36px',
            background: '#0d0e1a',
            border: '1px solid rgba(244,67,54,0.35)',
            borderRadius: '6px',
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            fontSize: '20px',
            color: '#f44336',
            letterSpacing: 0,
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5), 0 1px 0 rgba(244,67,54,0.15)',
            lineHeight: 1,
          }}>{d}</span>
        ))}
      </div>
      <span style={{ fontSize: '12px', color: 'rgba(199,210,254,0.45)', marginLeft: '4px' }}>total visitors</span>
    </div>
  )
}

export default function Footer() {
  const { pathname } = useLocation()
  const shouldReplace = INFO_PAGES.includes(pathname)
  const siteStats = useSiteStats()
  const total = siteStats?.total ?? null
  return (
    <footer style={{ background: DARK, color: 'rgba(199,210,254,0.75)', marginTop: '0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 0' }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8" style={{ marginBottom: '40px' }}>

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" replace={shouldReplace} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '18px', color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>
              <img src="/icons/logo.svg" alt="" width="28" height="28" style={{ borderRadius: '7px', flexShrink: 0 }} />
              Arkaserve Tools
            </Link>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(199,210,254,0.6)', margin: 0 }}>
              60+ free tools — PDF, documents, images, and code. No signup, no watermark.
            </p>
            {total !== null && <OdometerCounter value={total} />}
          </div>

          {/* PDF Tools */}
          <FooterCol replace={shouldReplace} title="PDF Tools" links={[
            ['Merge PDF',       '/merge-pdf'],
            ['Split PDF',       '/split-pdf'],
            ['Compress PDF',    '/compress-pdf'],
            ['Rotate PDF',      '/rotate-pdf'],
            ['Protect PDF',     '/protect-pdf'],
          ]} />

          {/* Convert */}
          <FooterCol replace={shouldReplace} title="Convert" links={[
            ['PDF to Word',     '/pdf-to-word'],
            ['Word to PDF',     '/word-to-pdf'],
            ['PDF to JPG',      '/pdf-to-jpg'],
            ['JPG to PDF',      '/jpg-to-pdf'],
            ['Excel to PDF',    '/excel-to-pdf'],
          ]} />

          {/* Dev Tools */}
          <FooterCol replace={shouldReplace} title="Dev Tools" links={[
            ['JSON Beautifier',  '/json-beautifier'],
            ['SQL Formatter',    '/sql-formatter'],
            ['JWT Debugger',     '/jwt-debugger'],
            ['Regex Tester',     '/regex-tester'],
            ['Code Diff',        '/code-diff'],
          ]} />

          {/* Company */}
          <FooterCol replace={shouldReplace} title="Company" links={[
            ['Home',           '/'],
            ['About',          '/about'],
            ['Careers',        'https://arkaserve.com/careers', true],
            ['Contact',        '/contact'],
            ['Privacy Policy', '/privacy-policy'],
          ]} extra={[
            ['Blog', null],
          ]} />

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(99,102,241,0.25)', padding: '16px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(199,210,254,0.45)' }}>© {new Date().getFullYear()} Arkaserve. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/privacy-policy" style={{ fontSize: '12px', color: 'rgba(199,210,254,0.5)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,210,254,0.5)'}>Privacy Policy</Link>
            <Link to="/contact" style={{ fontSize: '12px', color: 'rgba(199,210,254,0.5)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,210,254,0.5)'}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links, extra = [], replace = false }) {
  return (
    <div>
      <h4 style={{ fontWeight: 700, fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>{title}</h4>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {links.map(([label, path, external]) => (
          <li key={label}>
            {external ? (
              <a href={path} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13.5px', color: 'rgba(199,210,254,0.65)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,210,254,0.65)'}>
                {label}
              </a>
            ) : (
              <Link to={path} replace={replace} style={{ fontSize: '13.5px', color: 'rgba(199,210,254,0.65)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,210,254,0.65)'}>
                {label}
              </Link>
            )}
          </li>
        ))}
        {extra.map(([label, path]) => (
          <li key={label}>
            <span style={{ fontSize: '13.5px', color: 'rgba(199,210,254,0.35)', cursor: 'default' }}>
              {label} <span style={{ fontSize: '10px', background: 'rgba(251,113,133,0.2)', color: '#fb7185', borderRadius: '4px', padding: '1px 5px', fontWeight: 700 }}>Soon</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
