import { Link } from 'react-router-dom'
import { FileText, Code2, Image, Zap, Shield, Heart, Globe, Lock, Users } from 'lucide-react'

/* ── Brand tokens ── */
const NAVY   = '#1e1b4b'
const NAVY2  = '#312e81'
const RED    = '#f43f5e'
const RED2   = '#fb7185'

/* ── Tool categories ── */
const CATEGORIES = [
  { icon: FileText, color: '#f43f5e', bg: '#fef2f2', label: 'PDF Tools',        count: 14, tools: 'Merge · Split · Compress · Rotate · Protect · Watermark · PDF↔Word · PDF↔JPG · PDF↔Excel · HTML→PDF' },
  { icon: Code2,    color: '#2563eb', bg: '#eff6ff', label: 'Developer Tools',   count: 18, tools: 'JSON · SQL · XML · YAML · JWT · Regex · Code Diff · Hash · Base64 · URL Encode · Cron · Markdown' },
  { icon: Image,    color: '#0891b2', bg: '#ecfeff', label: 'Image & Media',     count: 10, tools: 'Compress · Resize · Crop · Background Remove · WebP · HEIC → JPG · SVG · Favicon · QR Code · Color' },
  { icon: Globe,    color: '#7c3aed', bg: '#faf5ff', label: 'Utilities',         count: 12, tools: 'Word Count · Word Compare · Unit Converter · Timezone · Calendar · Lorem Ipsum · Lab Code · Number Base' },
]

/* ── Values ── */
const VALUES = [
  { icon: Zap,    color: '#d97706', bg: '#fffbeb', title: 'Instant, zero friction',   desc: 'No sign-up. No captcha. No countdown timer. Open the tool, do the task, leave.' },
  { icon: Shield, color: '#16a34a', bg: '#f0fdf4', title: 'Private by design',        desc: 'Most tools run entirely in your browser. Your files never leave your device.' },
  { icon: Heart,  color: '#f43f5e', bg: '#fef2f2', title: 'Free — for real',          desc: 'If it runs in your browser, it costs us nothing extra to serve you. So it costs you nothing.' },
  { icon: Lock,   color: '#7c3aed', bg: '#faf5ff', title: 'Honest about limits',      desc: 'A few AI and cloud tools carry a small charge. We say so upfront — no hidden paywalls.' },
  { icon: Users,  color: '#0284c7', bg: '#f0f9ff', title: 'Built for every user',     desc: 'Students, developers, designers, professionals — every tool is designed to just work.' },
  { icon: Globe,  color: '#059669', bg: '#ecfdf5', title: 'Works everywhere',         desc: 'iPhone, Android, Windows, Mac — any modern browser, any device, any OS.' },
]

/* ── Team ── */
const TEAM = [
  { initials: 'AK', name: 'AK Mikkili', role: 'Founder & CEO', color: '#f43f5e', bg: 'linear-gradient(135deg,#fb7185,#f43f5e)', desc: 'IT Lead Engineer · NIT Durgapur alum. Built Arkaserve Tools after hitting one too many paywall walls at 11 PM. Every UX decision on this platform started from his own frustration as a developer.' },
  { initials: 'PM', name: 'Padma',      role: 'Co-Founder',    color: '#6366f1', bg: 'linear-gradient(135deg,#818cf8,#6366f1)', desc: 'Shapes product vision and business strategy. Makes sure what we build solves real problems for real people — not just what\'s easy to build.' },
  { initials: 'RK', name: 'Ramesh',     role: 'Lead Engineer', color: '#059669', bg: 'linear-gradient(135deg,#34d399,#059669)', desc: 'Leads backend infrastructure and keeps the engines running. Ensures every tool handles edge cases fast and reliably under real-world load.' },
]

function StatPill({ n, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2.2rem', fontWeight: 900, color: RED2, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: '12px', color: 'rgba(199,210,254,0.7)', marginTop: '4px', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function AboutUs() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 80px' }}>

      {/* ══ HERO ══ */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 55%, #4338ca 100%)`,
        borderRadius: '28px', padding: '56px 48px', marginBottom: '28px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'220px', height:'220px', borderRadius:'50%', background:'rgba(251,113,133,0.1)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-50px', left:'-50px', width:'180px', height:'180px', borderRadius:'50%', background:'rgba(99,102,241,0.15)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1 }}>
          {/* Logo lockup */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
            <img src="/icons/logo.svg" alt="Arkaserve Tools" width="40" height="40" style={{ borderRadius:'10px' }} />
            <div>
              <div style={{ fontWeight:800, fontSize:'18px', color:'#fff', lineHeight:1 }}>Arkaserve Tools</div>
              <div style={{ fontSize:'11px', color:'rgba(199,210,254,0.6)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'3px' }}>tools.arkaserve.com</div>
            </div>
          </div>

          <h1 style={{ fontSize:'clamp(1.8rem, 4vw, 2.6rem)', fontWeight:900, color:'#fff', lineHeight:1.2, margin:'0 0 20px', maxWidth:'640px' }}>
            60+ free tools. Zero logins.<br />
            <span style={{ color:RED2 }}>One honest promise.</span>
          </h1>

          <p style={{ fontSize:'16px', color:'rgba(199,210,254,0.85)', lineHeight:1.85, margin:'0 0 36px', maxWidth:'680px' }}>
            Arkaserve Tools is a free online toolkit for PDF editing, document conversion, developer utilities, and image processing.
            Every tool that runs in your browser is <strong style={{ color:'#fff' }}>completely free</strong> — because if it costs us nothing to run, it should cost you nothing to use.
          </p>

          {/* Stats */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'32px', paddingTop:'24px', borderTop:'1px solid rgba(255,255,255,0.12)' }}>
            <StatPill n="60+" label="Free Tools" />
            <StatPill n="0"   label="Paywalls" />
            <StatPill n="0"   label="Signups Required" />
            <StatPill n="4"   label="Categories" />
            <StatPill n="25MB" label="Max File Size" />
          </div>
        </div>
      </div>

      {/* ══ THE STORY ══ */}
      <div style={{ background:'#fff', border:'1px solid #e0e7ff', borderRadius:'24px', padding:'40px', marginBottom:'24px', boxShadow:'0 2px 20px rgba(99,102,241,0.06)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:RED }} />
          <span style={{ fontSize:'11px', fontWeight:700, color:RED, textTransform:'uppercase', letterSpacing:'0.12em' }}>Why we built this</span>
        </div>
        <p style={{ fontSize:'17px', fontWeight:700, color:NAVY, lineHeight:1.5, margin:'0 0 14px' }}>
          You're in the middle of something important. You need to compress a PDF. You open a tool, and it says — "Sign in to continue."
        </p>
        <p style={{ fontSize:'15px', color:'#475569', lineHeight:1.85, margin:'0 0 14px' }}>
          That frustration is real. Most of these tools run entirely on your device — inside your browser — yet they ask for your email, show you ads, or limit you to 2 free uses. The server cost is zero. The paywall is a choice.
        </p>
        <p style={{ fontSize:'15px', color:'#475569', lineHeight:1.85, margin:0 }}>
          Arkaserve Tools makes the other choice. <strong style={{ color:NAVY }}>If it runs in your browser, it's free. No account. No watermark. No limit.</strong> For tools that need real cloud computing — AI models, heavy file processing — we charge only the actual cost, and we tell you upfront.
        </p>
      </div>

      {/* ══ TOOL CATEGORIES ══ */}
      <h2 style={{ fontSize:'1.15rem', fontWeight:800, color:NAVY, margin:'0 0 16px' }}>What's inside</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom:'28px' }}>
        {CATEGORIES.map(({ icon: Icon, color, bg, label, count, tools }) => (
          <div key={label} style={{ background:'#fff', border:'1px solid #e0e7ff', borderRadius:'20px', padding:'24px', boxShadow:'0 1px 10px rgba(99,102,241,0.05)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
              <div style={{ width:'44px', height:'44px', borderRadius:'13px', background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <div style={{ fontWeight:800, fontSize:'15px', color:NAVY }}>{label}</div>
                <div style={{ fontSize:'12px', color, fontWeight:600 }}>{count} tools</div>
              </div>
            </div>
            <p style={{ fontSize:'12.5px', color:'#64748b', lineHeight:1.7, margin:0 }}>{tools}</p>
          </div>
        ))}
      </div>

      {/* ══ WHAT'S FREE ══ */}
      <div style={{ background:'#fff', border:'1px solid #e0e7ff', borderRadius:'20px', padding:'32px', marginBottom:'28px', boxShadow:'0 2px 16px rgba(99,102,241,0.06)' }}>
        <h2 style={{ fontSize:'1.15rem', fontWeight:800, color:NAVY, margin:'0 0 6px' }}>Honest about what's free</h2>
        <p style={{ fontSize:'14px', color:'#64748b', margin:'0 0 20px', lineHeight:1.7 }}>We're transparent. Here's exactly how Arkaserve Tools works:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'16px', padding:'22px' }}>
            <p style={{ fontWeight:800, color:'#15803d', marginBottom:'12px', fontSize:'14px' }}>✅ Always Free</p>
            <ul style={{ fontSize:'13.5px', color:'#166534', lineHeight:2.1, margin:0, paddingLeft:'18px' }}>
              <li>All PDF tools (merge, split, compress, rotate, protect, watermark)</li>
              <li>PDF ↔ Word, JPG, Excel, PowerPoint</li>
              <li>JSON, SQL, XML, YAML formatters</li>
              <li>Image compress, resize, crop, convert</li>
              <li>QR generator, regex tester, code diff, hash, base64, JWT</li>
              <li>Word count, word compare, unit converter &amp; more</li>
            </ul>
            <p style={{ fontSize:'12px', color:'#15803d', marginTop:'12px', fontStyle:'italic', margin:'12px 0 0' }}>Runs in your browser — zero server cost to us.</p>
          </div>
          <div style={{ background:'#faf5ff', border:'1px solid #e9d5ff', borderRadius:'16px', padding:'22px' }}>
            <p style={{ fontWeight:800, color:'#7c3aed', marginBottom:'12px', fontSize:'14px' }}>💜 Small Charge (Actual Cloud Cost)</p>
            <ul style={{ fontSize:'13.5px', color:'#6d28d9', lineHeight:2.1, margin:0, paddingLeft:'18px' }}>
              <li>AI-powered PDF summariser</li>
              <li>OCR — scanned document to text</li>
              <li>Large-file cloud processing</li>
              <li>Background removal (AI model)</li>
            </ul>
            <p style={{ fontSize:'12px', color:'#7c3aed', marginTop:'12px', fontStyle:'italic', margin:'12px 0 0' }}>These run on real servers. We charge only what it costs us — no markup.</p>
          </div>
        </div>
      </div>

      {/* ══ VALUES ══ */}
      <h2 style={{ fontSize:'1.15rem', fontWeight:800, color:NAVY, margin:'0 0 16px' }}>What we stand for</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'14px', marginBottom:'32px' }}>
        {VALUES.map(({ icon: Icon, color, bg, title, desc }) => (
          <div key={title} style={{ background:'#fff', border:'1px solid #e0e7ff', borderRadius:'16px', padding:'20px', boxShadow:'0 1px 8px rgba(99,102,241,0.05)', display:'flex', alignItems:'flex-start', gap:'14px' }}>
            <div style={{ width:'42px', height:'42px', borderRadius:'12px', background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon size={19} color={color} />
            </div>
            <div>
              <p style={{ fontWeight:700, color:NAVY, fontSize:'14px', margin:'0 0 4px' }}>{title}</p>
              <p style={{ fontSize:'12.5px', color:'#64748b', lineHeight:1.65, margin:0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ══ TEAM ══ */}
      <h2 style={{ fontSize:'1.15rem', fontWeight:800, color:NAVY, margin:'0 0 16px' }}>The people behind it</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" style={{ marginBottom:'32px' }}>
        {TEAM.map(({ initials, name, role, bg, desc }) => (
          <div key={name} style={{ background:'#fff', border:'1px solid #e0e7ff', borderRadius:'20px', overflow:'hidden', boxShadow:'0 2px 14px rgba(99,102,241,0.08)' }}>
            <div style={{ background:bg, padding:'28px 24px 20px', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
              <div style={{ width:'60px', height:'60px', borderRadius:'18px', background:'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', fontWeight:900, color:'#fff', boxShadow:'0 4px 16px rgba(0,0,0,0.15)', letterSpacing:'-0.02em' }}>
                {initials}
              </div>
              <div style={{ textAlign:'center' }}>
                <p style={{ fontWeight:800, color:'#fff', fontSize:'16px', margin:'0 0 3px', textShadow:'0 1px 3px rgba(0,0,0,0.2)' }}>{name}</p>
                <p style={{ fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.85)', textTransform:'uppercase', letterSpacing:'0.08em', margin:0 }}>{role}</p>
              </div>
            </div>
            <div style={{ padding:'18px 20px' }}>
              <p style={{ fontSize:'13px', color:'#475569', lineHeight:1.75, margin:0 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ══ CTA ══ */}
      <div style={{ background:`linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 100%)`, borderRadius:'24px', padding:'44px 40px', textAlign:'center' }}>
        <p style={{ fontSize:'clamp(1.3rem, 3vw, 1.9rem)', fontWeight:900, color:'#fff', margin:'0 0 12px', lineHeight:1.3 }}>
          Ready to get things done?
        </p>
        <p style={{ fontSize:'15px', color:'rgba(199,210,254,0.75)', margin:'0 0 28px', lineHeight:1.7 }}>
          60+ tools. No account. No watermark. Works on every device.
        </p>
        <Link to="/" style={{ display:'inline-block', background:`linear-gradient(135deg, ${RED}, #e11d48)`, color:'#fff', textDecoration:'none', fontWeight:700, fontSize:'15px', padding:'14px 36px', borderRadius:'14px', boxShadow:'0 4px 20px rgba(244,63,94,0.4)' }}>
          Explore all tools →
        </Link>
      </div>

    </div>
  )
}
