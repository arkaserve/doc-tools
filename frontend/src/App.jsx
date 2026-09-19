import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import { getPageMeta, BASE_URL } from './lib/pageMeta'
import Footer from './components/Footer'
import useDarkMode from './hooks/useDarkMode'

// Lazy-load every page — only the current page's JS is downloaded
const Home             = lazy(() => import('./pages/Home'))
const MergePdf         = lazy(() => import('./pages/MergePdf'))
const SplitPdf         = lazy(() => import('./pages/SplitPdf'))
const CompressPdf      = lazy(() => import('./pages/CompressPdf'))
const PdfToWord        = lazy(() => import('./pages/PdfToWord'))
const WordToPdf        = lazy(() => import('./pages/WordToPdf'))
const PdfToJpg         = lazy(() => import('./pages/PdfToJpg'))
const JpgToPdf         = lazy(() => import('./pages/JpgToPdf'))
const RotatePdf        = lazy(() => import('./pages/RotatePdf'))
const WatermarkPdf     = lazy(() => import('./pages/WatermarkPdf'))
const ProtectPdf       = lazy(() => import('./pages/ProtectPdf'))
const ExcelToPdf       = lazy(() => import('./pages/ExcelToPdf'))
const PdfToExcel       = lazy(() => import('./pages/PdfToExcel'))
const HtmlToPdf        = lazy(() => import('./pages/HtmlToPdf'))
const PdfToPptx        = lazy(() => import('./pages/PdfToPptx'))
const PptxToPdf        = lazy(() => import('./pages/PptxToPdf'))
const PdfAnalyzer      = lazy(() => import('./pages/PdfAnalyzer'))
const JsonBeautifier   = lazy(() => import('./pages/JsonBeautifier'))
const JsonValidator    = lazy(() => import('./pages/JsonValidator'))
const XmlBeautifier    = lazy(() => import('./pages/XmlBeautifier'))
const XmlFormatter     = lazy(() => import('./pages/XmlFormatter'))
const SqlFormatter     = lazy(() => import('./pages/SqlFormatter'))
const JwtDebugger      = lazy(() => import('./pages/JwtDebugger'))
const RegexTester      = lazy(() => import('./pages/RegexTester'))
const Base64Tool       = lazy(() => import('./pages/Base64Tool'))
const UrlEncodeTool    = lazy(() => import('./pages/UrlEncodeTool'))
const JsonToCsv        = lazy(() => import('./pages/JsonToCsv'))
const YamlJson         = lazy(() => import('./pages/YamlJson'))
const HtmlTools        = lazy(() => import('./pages/HtmlTools'))
const HtmlEntityTool   = lazy(() => import('./pages/HtmlEntityTool'))
const CronDescriptor   = lazy(() => import('./pages/CronDescriptor'))
const HashGenerator    = lazy(() => import('./pages/HashGenerator'))
const CssJsMinifier    = lazy(() => import('./pages/CssJsMinifier'))
const MarkdownPreview  = lazy(() => import('./pages/MarkdownPreview'))
const CodeDiff         = lazy(() => import('./pages/CodeDiff'))
const NumberBaseConverter = lazy(() => import('./pages/NumberBaseConverter'))
const UnicodeInspector = lazy(() => import('./pages/UnicodeInspector'))
const IpCalculator     = lazy(() => import('./pages/IpCalculator'))
const LabCodeCleaner   = lazy(() => import('./pages/LabCodeCleaner'))
const ImageCompressor  = lazy(() => import('./pages/ImageCompressor'))
const ImageResizer     = lazy(() => import('./pages/ImageResizer'))
const ImageCropper     = lazy(() => import('./pages/ImageCropper'))
const BackgroundRemover = lazy(() => import('./pages/BackgroundRemover'))
const WebpConverter    = lazy(() => import('./pages/WebpConverter'))
const HeicConverter    = lazy(() => import('./pages/HeicConverter'))
const SvgConverter     = lazy(() => import('./pages/SvgConverter'))
const ImageMetadataStripper = lazy(() => import('./pages/ImageMetadataStripper'))
const FaviconGenerator = lazy(() => import('./pages/FaviconGenerator'))
const ColorConverter   = lazy(() => import('./pages/ColorConverter'))
const ColorPalette     = lazy(() => import('./pages/ColorPalette'))
const CssGradient      = lazy(() => import('./pages/CssGradient'))
const WordCompare      = lazy(() => import('./pages/WordCompare'))
const WordCount        = lazy(() => import('./pages/WordCount'))
const LoremIpsum       = lazy(() => import('./pages/LoremIpsum'))
const QrGenerator      = lazy(() => import('./pages/QrGenerator'))
const UnitConverter    = lazy(() => import('./pages/UnitConverter'))
const TimezoneConverter = lazy(() => import('./pages/TimezoneConverter'))
const CalendarConverter = lazy(() => import('./pages/CalendarConverter'))
const ContactUs        = lazy(() => import('./pages/ContactUs'))
const AboutUs          = lazy(() => import('./pages/AboutUs'))
const Feedback         = lazy(() => import('./pages/Feedback'))
const SignIn           = lazy(() => import('./pages/SignIn'))
const SignUp           = lazy(() => import('./pages/SignUp'))
const Subscription     = lazy(() => import('./pages/Subscription'))
const PrivacyPolicy    = lazy(() => import('./pages/PrivacyPolicy'))
const NotFound         = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" aria-label="Loading page">
      <div className="w-8 h-8 border-4 border-red-200 border-t-red-500 rounded-full animate-spin" role="status" />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const { title, desc, keywords } = getPageMeta(pathname)
    document.title = title

    const setMeta = (attr, name, content) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    const canonical = `${BASE_URL}${pathname === '/' ? '' : pathname}`

    const ogImage = 'https://tools.arkaserve.com/icons/logo.jpg'

    setMeta('name', 'description', desc)
    setMeta('name', 'keywords', keywords)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', ogImage)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', ogImage)

    let link = document.querySelector('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
    link.setAttribute('href', canonical)
  }, [pathname])
  return null
}

export default function App() {
  const [dark, setDark] = useDarkMode()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Skip to main content — accessibility + SEO */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <ScrollToTop />
      <PageMeta />
      <Navbar dark={dark} setDark={setDark} />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/merge-pdf"       element={<MergePdf />} />
            <Route path="/split-pdf"       element={<SplitPdf />} />
            <Route path="/compress-pdf"    element={<CompressPdf />} />
            <Route path="/pdf-to-word"     element={<PdfToWord />} />
            <Route path="/word-to-pdf"     element={<WordToPdf />} />
            <Route path="/pdf-to-jpg"      element={<PdfToJpg />} />
            <Route path="/jpg-to-pdf"      element={<JpgToPdf />} />
            <Route path="/rotate-pdf"      element={<RotatePdf />} />
            <Route path="/watermark-pdf"   element={<WatermarkPdf />} />
            <Route path="/protect-pdf"     element={<ProtectPdf />} />
            <Route path="/excel-to-pdf"    element={<ExcelToPdf />} />
            <Route path="/pdf-to-excel"    element={<PdfToExcel />} />
            <Route path="/html-to-pdf"     element={<HtmlToPdf />} />
            <Route path="/pdf-to-pptx"     element={<PdfToPptx />} />
            <Route path="/pptx-to-pdf"     element={<PptxToPdf />} />
            <Route path="/analyze-pdf"     element={<PdfAnalyzer />} />
            <Route path="/json-beautifier" element={<JsonBeautifier />} />
            <Route path="/json-validator"  element={<JsonValidator />} />
            <Route path="/xml-beautifier"  element={<XmlBeautifier />} />
            <Route path="/xml-formatter"   element={<XmlFormatter />} />
            <Route path="/sql-formatter"   element={<SqlFormatter />} />
            <Route path="/jwt-debugger"    element={<JwtDebugger />} />
            <Route path="/regex-tester"    element={<RegexTester />} />
            <Route path="/base64"          element={<Base64Tool />} />
            <Route path="/url-encode"      element={<UrlEncodeTool />} />
            <Route path="/json-to-csv"     element={<JsonToCsv />} />
            <Route path="/yaml-json"       element={<YamlJson />} />
            <Route path="/html-tools"      element={<HtmlTools />} />
            <Route path="/html-entity"     element={<HtmlEntityTool />} />
            <Route path="/cron-descriptor" element={<CronDescriptor />} />
            <Route path="/hash-generator"  element={<HashGenerator />} />
            <Route path="/css-js-minifier" element={<CssJsMinifier />} />
            <Route path="/markdown-preview" element={<MarkdownPreview />} />
            <Route path="/code-diff"       element={<CodeDiff />} />
            <Route path="/number-base"     element={<NumberBaseConverter />} />
            <Route path="/unicode-inspector" element={<UnicodeInspector />} />
            <Route path="/ip-calculator"   element={<IpCalculator />} />
            <Route path="/lab-code-cleaner" element={<LabCodeCleaner />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/image-resizer"   element={<ImageResizer />} />
            <Route path="/image-cropper"   element={<ImageCropper />} />
            <Route path="/bg-remover"      element={<BackgroundRemover />} />
            <Route path="/webp-converter"  element={<WebpConverter />} />
            <Route path="/heic-converter"  element={<HeicConverter />} />
            <Route path="/svg-converter"   element={<SvgConverter />} />
            <Route path="/image-metadata"  element={<ImageMetadataStripper />} />
            <Route path="/favicon-generator" element={<FaviconGenerator />} />
            <Route path="/color-converter" element={<ColorConverter />} />
            <Route path="/color-palette"   element={<ColorPalette />} />
            <Route path="/css-gradient"    element={<CssGradient />} />
            <Route path="/word-compare"    element={<WordCompare />} />
            <Route path="/word-count"      element={<WordCount />} />
            <Route path="/lorem-ipsum"     element={<LoremIpsum />} />
            <Route path="/qr-generator"    element={<QrGenerator />} />
            <Route path="/unit-converter"  element={<UnitConverter />} />
            <Route path="/timezone-converter" element={<TimezoneConverter />} />
            <Route path="/calendar-converter" element={<CalendarConverter />} />
            <Route path="/contact"         element={<ContactUs />} />
            <Route path="/about"           element={<AboutUs />} />
            <Route path="/feedback"        element={<Feedback />} />
            <Route path="/signin"          element={<SignIn />} />
            <Route path="/signup"          element={<SignUp />} />
            <Route path="/subscription"    element={<Subscription />} />
            <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
            <Route path="*"               element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
