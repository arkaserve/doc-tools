export const SITE = 'DocCraft'
export const BASE_URL = 'https://tools.arkaserve.com'
export const DEFAULT_DESC = 'Free online tools for PDF, Word, Excel, JSON, images and more. Convert, merge, split, compress — 100% free, no signup needed.'
export const DEFAULT_KEYWORDS = 'free online tools, PDF tools, document converter, image tools, developer tools, DocCraft'

export const PAGE_META = {
  '/': {
    title: 'DocCraft – Free PDF Tools, Document & Code Converters Online',
    desc: 'All-in-one free toolkit: merge PDF, split PDF, compress PDF, PDF to Word, Word to PDF, PDF to JPG, JSON formatter, SQL formatter, image converter, QR code generator. 60+ tools, no signup needed.',
    keywords: 'free PDF tools online, merge PDF free, split PDF, compress PDF, PDF to Word, Word to PDF, PDF converter free, document tools, image converter, JSON formatter, SQL formatter, DocCraft',
  },
  '/merge-pdf': {
    title: 'Merge PDF Online Free – Combine PDF Files into One | DocCraft',
    desc: 'Combine multiple PDF files into one document online for free. Drag and drop to reorder pages, then merge instantly. No signup, no watermark — works entirely in your browser.',
    keywords: 'merge PDF online free, combine PDF files, join PDF, merge multiple PDFs into one, PDF merger free, combine PDFs online, PDF joiner, merge PDF files free download, how to merge PDF files',
    steps: [
      'Click "Upload Files" or drag and drop your PDF files onto the page — you can add up to 20 PDFs at once.',
      'Drag the file cards to rearrange them in the order you want before merging.',
      'Click "Merge PDF" and download the combined single PDF file instantly. No signup needed.',
    ],
    faqs: [
      { q: 'Is merging PDF files free?', a: 'Yes, 100% free — no account, no subscription, no watermark added to your file. You can merge unlimited PDFs for free on DocCraft.' },
      { q: 'How many PDF files can I merge at once?', a: 'You can merge up to 20 PDF files in a single operation. Each file can be up to 100 MB.' },
      { q: 'Are my uploaded PDF files secure?', a: 'Yes. Files are processed securely on our servers and automatically deleted within 1 hour. We never read, store, or share your documents.' },
      { q: 'Can I reorder pages before merging PDFs?', a: 'Yes. Drag the PDF cards to rearrange them in any order before clicking Merge. The merged file will follow your exact ordering.' },
    ],
  },
  '/split-pdf': {
    title: 'Split PDF Online Free – Extract & Separate PDF Pages | DocCraft',
    desc: 'Split a PDF into individual pages or extract custom page ranges online for free. Download each part separately. No software needed — works in any browser.',
    keywords: 'split PDF online free, extract pages from PDF, separate PDF pages, split PDF into multiple files, PDF page extractor, split PDF by page range, divide PDF online free',
    steps: [
      'Upload your PDF file by clicking the button or dragging it onto the page.',
      'Choose to split into individual pages, or enter specific page ranges (e.g., 1-3, 5, 7-10) to extract.',
      'Click Split and download individual PDF files or a ZIP archive of all pages.',
    ],
    faqs: [
      { q: 'Is splitting a PDF free?', a: 'Yes, completely free. No sign-up required and no limits on the number of splits.' },
      { q: 'Can I extract specific pages from a PDF?', a: 'Yes. You can extract individual pages or custom page ranges. Just enter the pages you want, like "1-3, 5, 8".' },
      { q: 'Can I split a password-protected PDF?', a: 'You will need to remove the password first using our Protect PDF tool, then split the unlocked file.' },
      { q: 'Is there a file size limit for splitting?', a: 'The recommended file size is under 100 MB. Larger files may take longer to process.' },
    ],
  },
  '/compress-pdf': {
    title: 'Compress PDF Online Free – Reduce PDF File Size | DocCraft',
    desc: 'Reduce PDF file size online for free without losing quality. Compress PDF for email, WhatsApp, or web upload. Choose compression level to balance size vs clarity. No signup needed.',
    keywords: 'compress PDF online free, reduce PDF size, PDF compressor free, shrink PDF file size, compress PDF without losing quality, make PDF smaller online, reduce PDF MB, PDF size reducer',
    steps: [
      'Upload your PDF file by clicking the button or dragging it onto the page.',
      'Select a compression level: Low (best quality), Medium (balanced), or High (smallest file size).',
      'Click "Compress PDF" and download your smaller PDF file instantly — completely free.',
    ],
    faqs: [
      { q: 'Is compressing a PDF free?', a: 'Yes, 100% free. No registration or payment required. Compress as many PDFs as you like.' },
      { q: 'Will compression reduce the quality of my PDF?', a: 'At Low and Medium settings, quality loss is minimal and usually unnoticeable. High compression reduces file size the most but may slightly reduce image clarity.' },
      { q: 'How much can I reduce a PDF file size?', a: 'Depending on the content, you can typically reduce PDF size by 40–80%. PDFs with many images compress much more than text-only documents.' },
      { q: 'Why do I need to compress a PDF?', a: 'Compressed PDFs are easier to send via email (most have 25 MB limits), WhatsApp, or upload to web forms. They also load faster online.' },
    ],
  },
  '/pdf-to-word': {
    title: 'PDF to Word Converter Free – Convert PDF to DOC, DOCX Online | DocCraft',
    desc: 'Convert PDF to editable Word document (DOC or DOCX) online for free. Also works as PDF to Doc converter. Preserves text, tables, and formatting. No signup required — instant download.',
    keywords: 'PDF to Word converter free, PDF to DOC, PDF to DOCX, convert PDF to Word online free, PDF to doc converter, change PDF to Word, PDF to editable Word, pdf to word online free no sign up, convert pdf to doc free',
    steps: [
      'Upload your PDF file by clicking the button or dragging it onto the page.',
      'The tool automatically converts your PDF to an editable Word document (DOCX format) preserving layout, text, and tables.',
      'Click Download to save your editable .docx file — no signup, completely free.',
    ],
    faqs: [
      { q: 'Is the PDF to Word conversion free?', a: 'Yes, 100% free with no signup, no watermark, and no page limits. Convert as many PDFs as you need.' },
      { q: 'Will the converted Word file be editable?', a: 'Yes, the output .docx file is fully editable in Microsoft Word, Google Docs, LibreOffice, and any other word processor.' },
      { q: 'Does it preserve formatting and tables?', a: 'Yes. Our converter preserves text layout, fonts, paragraphs, bullet points, and tables as closely as possible.' },
      { q: 'Can I convert a scanned PDF to Word?', a: 'Scanned PDFs require OCR (Optical Character Recognition). Our tool works best with digitally created PDFs. For scanned documents, results may vary.' },
    ],
  },
  '/word-to-pdf': {
    title: 'Word to PDF Converter Free – Convert DOCX & DOC to PDF Online | DocCraft',
    desc: 'Convert Word documents (DOC or DOCX) to PDF online for free. Get a professional, print-ready PDF in seconds. No email, no registration — just upload and convert.',
    keywords: 'Word to PDF converter free, DOC to PDF, DOCX to PDF, convert Word to PDF online free, Word document to PDF, .doc to PDF free, word to pdf online converter, Microsoft Word to PDF',
    steps: [
      'Upload your Word document (.doc or .docx) by clicking the button or dragging it onto the page.',
      'The converter automatically turns your Word file into a print-ready PDF, preserving all formatting.',
      'Download your PDF file instantly — no signup, no watermark, completely free.',
    ],
    faqs: [
      { q: 'Is Word to PDF conversion free?', a: 'Yes, completely free. No account, no subscription, no watermark on the output PDF.' },
      { q: 'Does it support both .doc and .docx files?', a: 'Yes, both older .doc and modern .docx Word formats are fully supported.' },
      { q: 'Will fonts and formatting be preserved?', a: 'Yes. The PDF output preserves your fonts, headings, images, tables, and overall layout from the Word document.' },
      { q: 'Is there a file size limit?', a: 'Files up to 50 MB are supported. For very large documents, processing may take a few extra seconds.' },
    ],
  },
  '/pdf-to-jpg': {
    title: 'PDF to JPG Converter Free – Convert PDF to Image Online | DocCraft',
    desc: 'Convert every PDF page to a high-resolution JPG or PNG image online for free. Perfect for presentations, thumbnails, and previews. No watermark, instant download.',
    keywords: 'PDF to JPG converter free, PDF to image online, convert PDF to JPG, PDF to PNG, PDF to picture, PDF page to image, PDF to JPEG free online, export PDF as image',
    steps: [
      'Upload your PDF file by clicking the button or dragging it onto the page.',
      'Choose the output image format (JPG or PNG) and the resolution/quality you need.',
      'Click Convert and download each page as a separate image file, or get all pages in a ZIP.',
    ],
    faqs: [
      { q: 'Is PDF to JPG conversion free?', a: 'Yes, 100% free with no signup required. Convert all pages of any PDF to images at no cost.' },
      { q: 'Can I convert all pages of a PDF to images?', a: 'Yes. Every page in your PDF is converted to a separate image file. Download individually or as a ZIP archive.' },
      { q: 'What image quality will the output be?', a: 'The default resolution is 150 DPI, which is great for screen use. Select higher DPI for print-quality images.' },
      { q: 'Should I choose JPG or PNG output?', a: 'JPG is best for photos and documents with many colors (smaller file size). PNG is best for documents with text, line art, or when you need a transparent background.' },
    ],
  },
  '/jpg-to-pdf': {
    title: 'JPG to PDF Converter Free – Convert Images to PDF Online | DocCraft',
    desc: 'Convert JPG, PNG, WebP, or HEIC images to a single PDF document online for free. Drag and drop multiple images to combine them. No signup, no watermark.',
    keywords: 'JPG to PDF converter free, image to PDF, convert JPG to PDF online free, PNG to PDF, photo to PDF, pictures to PDF, images to PDF converter, JPEG to PDF free',
    steps: [
      'Upload one or more images (JPG, PNG, WebP, HEIC) by clicking the button or dragging them onto the page.',
      'Drag the image previews to arrange them in the order you want them to appear in the PDF.',
      'Click "Convert to PDF" and download your PDF document instantly — no signup needed.',
    ],
    faqs: [
      { q: 'Is JPG to PDF conversion free?', a: 'Yes, completely free. No registration, no watermark, no limits on the number of images.' },
      { q: 'Can I combine multiple images into one PDF?', a: 'Yes. Upload as many images as you like and they will all be combined into a single PDF, one image per page.' },
      { q: 'What image formats are supported?', a: 'JPG/JPEG, PNG, WebP, BMP, and HEIC (iPhone photos) are all supported.' },
      { q: 'Will the image quality be preserved in the PDF?', a: 'Yes. Images are embedded at their original quality. The PDF will look just as sharp as your original image files.' },
    ],
  },
  '/rotate-pdf': {
    title: 'Rotate PDF Pages Online Free – Fix PDF Orientation | DocCraft',
    desc: 'Fix sideways or upside-down PDF pages online for free. Rotate individual pages or the entire PDF by 90°, 180°, or 270° and save permanently.',
    keywords: 'rotate PDF online free, fix PDF orientation, turn PDF pages, rotate PDF pages 90 degrees, flip PDF pages, PDF rotator free, rotate sideways PDF',
    steps: [
      'Upload your PDF file by clicking the button or dragging it onto the page.',
      'Select which pages to rotate (all pages or specific pages) and choose the rotation angle: 90°, 180°, or 270°.',
      'Click "Rotate PDF" and download the corrected PDF with permanently saved orientation.',
    ],
    faqs: [
      { q: 'Is rotating a PDF free?', a: 'Yes, 100% free. No signup and no watermark on the output file.' },
      { q: 'Can I rotate only specific pages in a PDF?', a: 'Yes. You can rotate individual pages or select a range of pages. Not all pages need to be rotated the same way.' },
      { q: 'Is the rotation permanent?', a: 'Yes. The rotation is saved permanently in the PDF. The corrected orientation will appear in any PDF viewer.' },
      { q: 'What rotation angles are supported?', a: '90° clockwise, 180° (upside down), and 270° clockwise (or 90° counter-clockwise) are all supported.' },
    ],
  },
  '/watermark-pdf': {
    title: 'Add Watermark to PDF Online Free – Text Watermark | DocCraft',
    desc: 'Stamp custom text watermarks like CONFIDENTIAL, DRAFT, or your brand name on every PDF page online for free. Control opacity, position, and font size.',
    keywords: 'add watermark to PDF online free, PDF watermark tool, text watermark PDF, stamp PDF free, CONFIDENTIAL watermark PDF, PDF watermark generator, watermark PDF online no signup',
    steps: [
      'Upload your PDF file by clicking the button or dragging it onto the page.',
      'Type your watermark text (e.g., CONFIDENTIAL, DRAFT, your name or company), then adjust the opacity, size, and position.',
      'Click "Add Watermark" and download your watermarked PDF instantly — no signup required.',
    ],
    faqs: [
      { q: 'Is adding a watermark to PDF free?', a: 'Yes, completely free. No account needed and no extra watermark is added by DocCraft itself.' },
      { q: 'Can I control where the watermark appears?', a: 'Yes. You can set the watermark position (center, diagonal, top, bottom), opacity (10%–100%), font size, and color.' },
      { q: 'Does the watermark appear on all pages?', a: 'Yes, the text watermark is stamped on every page of your PDF document.' },
      { q: 'Can I add an image watermark instead of text?', a: 'Currently only text watermarks are supported. You can watermark with any custom text you choose.' },
    ],
  },
  '/protect-pdf': {
    title: 'Password Protect PDF Online Free – Lock PDF | DocCraft',
    desc: 'Add password protection to your PDF file online for free. Lock your document so only authorized people can open it. AES-128 encryption — no signup needed.',
    keywords: 'password protect PDF online free, lock PDF with password, PDF password protection, encrypt PDF free, secure PDF online, add password to PDF, PDF locker free',
    steps: [
      'Upload the PDF file you want to protect by clicking the button or dragging it onto the page.',
      'Enter the password you want to set. Choose a strong password that only authorized recipients know.',
      'Click "Protect PDF" and download the encrypted, password-protected PDF file instantly.',
    ],
    faqs: [
      { q: 'Is PDF password protection free?', a: 'Yes, 100% free with no signup. Protect as many PDFs as you need.' },
      { q: 'What encryption does this use?', a: 'AES-128 bit encryption is applied, which is the standard used by most PDF viewers and considered secure for document protection.' },
      { q: 'Can I also remove a password from a PDF with this tool?', a: 'Yes. If you know the existing password, you can upload the locked PDF and remove its password using the same tool.' },
      { q: 'Will the password-protected PDF work in all PDF viewers?', a: 'Yes. The protected PDF is compatible with Adobe Acrobat, Preview (Mac), Chrome, Firefox, and all standard PDF viewers.' },
    ],
  },
  '/excel-to-pdf': {
    title: 'Excel to PDF Converter Free – Convert XLSX to PDF Online | DocCraft',
    desc: 'Convert Excel spreadsheets (XLS or XLSX) to PDF online for free. Keeps your formatting, rows, and columns intact. Instant conversion, no signup.',
    keywords: 'Excel to PDF converter free, XLSX to PDF, XLS to PDF, convert Excel to PDF online free, spreadsheet to PDF, Excel file to PDF, Microsoft Excel to PDF free',
    steps: [
      'Upload your Excel file (.xlsx or .xls) by clicking the button or dragging it onto the page.',
      'The converter automatically processes all sheets and preserves your table formatting, column widths, and formulas display.',
      'Download your PDF document instantly — no signup or account required.',
    ],
    faqs: [
      { q: 'Is Excel to PDF conversion free?', a: 'Yes, completely free. No Microsoft Office installation needed and no signup required.' },
      { q: 'Does it support both .xls and .xlsx files?', a: 'Yes, both older .xls and modern .xlsx Excel file formats are supported.' },
      { q: 'Will the formatting and tables be preserved?', a: 'Yes. Column widths, row heights, borders, colors, and merged cells are preserved in the PDF output.' },
      { q: 'Can I convert a multi-sheet Excel workbook?', a: 'Yes. All sheets in the workbook are converted to the PDF. Each sheet becomes a set of pages in the output document.' },
    ],
  },
  '/pdf-to-excel': {
    title: 'PDF to Excel Converter Free – Extract Tables to XLSX | DocCraft',
    desc: 'Extract tables and data from PDF files into editable Excel spreadsheets (XLSX) online for free. Automatically detects rows and columns. No signup needed.',
    keywords: 'PDF to Excel converter free, PDF to XLSX, extract table from PDF, PDF to spreadsheet, convert PDF table to Excel free, PDF to XLS online, PDF data to Excel',
    steps: [
      'Upload your PDF file that contains tables or structured data by clicking the button or dragging it onto the page.',
      'The tool automatically detects and extracts all tables from your PDF, mapping rows and columns accurately.',
      'Download the editable Excel spreadsheet (.xlsx) file — open it directly in Microsoft Excel or Google Sheets.',
    ],
    faqs: [
      { q: 'Is PDF to Excel conversion free?', a: 'Yes, 100% free. No signup, no subscription, and no file limits.' },
      { q: 'Can it extract tables from scanned PDFs?', a: 'Our tool works best with digitally created PDFs. Scanned PDFs require OCR and results may vary.' },
      { q: 'Will all tables in the PDF be extracted?', a: 'Yes, all detected tables across all pages are extracted into the Excel spreadsheet, each in its own section.' },
      { q: 'What if my PDF has no tables?', a: 'For non-table data, the text content is extracted as plain text into the spreadsheet. It works best on PDFs with clearly defined table structures.' },
    ],
  },
  '/html-to-pdf': {
    title: 'HTML to PDF Converter Free – Convert HTML Code to PDF | DocCraft',
    desc: 'Paste HTML code and convert it to a styled PDF online for free. Perfect for invoices, receipts, email templates, and reports. No signup needed.',
    keywords: 'HTML to PDF converter free, convert HTML to PDF online, HTML code to PDF, webpage to PDF, HTML page to PDF free, export HTML as PDF',
    steps: [
      'Paste your HTML code into the input editor, or type/edit it directly in the text area.',
      'Preview how it renders in the browser before converting — styles and scripts are applied.',
      'Click "Convert to PDF" and download the styled PDF document — no signup required.',
    ],
    faqs: [
      { q: 'Is HTML to PDF conversion free?', a: 'Yes, completely free with no signup and no file limits.' },
      { q: 'Does it support CSS styling?', a: 'Yes. Inline styles, embedded CSS in the <style> tag, and basic external stylesheets are all supported.' },
      { q: 'What is this useful for?', a: 'HTML to PDF is great for generating invoices, reports, email templates, certificates, or any document you\'ve designed as an HTML page.' },
      { q: 'Can I convert a full webpage URL to PDF?', a: 'This tool is for pasting HTML code directly. For URL-based webpage capture, consider using your browser\'s built-in Print → Save as PDF feature.' },
    ],
  },
  '/pdf-to-pptx': {
    title: 'PDF to PowerPoint Converter Free – PDF to PPTX Online | DocCraft',
    desc: 'Convert PDF slides to editable PowerPoint (.pptx) presentations online for free. Each PDF page becomes a separate slide. No signup, instant download.',
    keywords: 'PDF to PowerPoint converter free, PDF to PPTX, PDF to PPT, convert PDF to PowerPoint online free, PDF presentation to PPT, PDF slides to PowerPoint',
    steps: [
      'Upload your PDF presentation file by clicking the button or dragging it onto the page.',
      'The converter automatically extracts each PDF page and places it as an individual PowerPoint slide.',
      'Download your editable .pptx file and open it in Microsoft PowerPoint or Google Slides.',
    ],
    faqs: [
      { q: 'Is PDF to PowerPoint conversion free?', a: 'Yes, 100% free. No PowerPoint installation required on your device.' },
      { q: 'Will each PDF page become a slide?', a: 'Yes. Every page of your PDF is converted into one slide in the PowerPoint presentation.' },
      { q: 'Can I edit the slides after conversion?', a: 'The slides are editable in PowerPoint, though complex layouts may render as image-based slides. Text extraction depends on the PDF\'s structure.' },
      { q: 'What\'s the maximum PDF size I can convert?', a: 'PDFs up to 100 MB are supported. For very large presentations, processing may take a moment longer.' },
    ],
  },
  '/pptx-to-pdf': {
    title: 'PowerPoint to PDF Converter Free – PPTX to PDF Online | DocCraft',
    desc: 'Convert PowerPoint presentations (.pptx or .ppt) to PDF online for free. Get a compact, shareable PDF from any presentation file. No signup needed.',
    keywords: 'PowerPoint to PDF converter free, PPTX to PDF, PPT to PDF, convert PowerPoint to PDF online free, presentation to PDF, slideshow to PDF free',
    steps: [
      'Upload your PowerPoint file (.pptx or .ppt) by clicking the button or dragging it onto the page.',
      'The converter processes all slides and preserves your design, fonts, and layout.',
      'Download the PDF document instantly — no signup, no watermark, completely free.',
    ],
    faqs: [
      { q: 'Is PowerPoint to PDF conversion free?', a: 'Yes, 100% free with no account required and no watermark on the output.' },
      { q: 'Are both .ppt and .pptx formats supported?', a: 'Yes, both the older .ppt and modern .pptx PowerPoint formats are fully supported.' },
      { q: 'Will animations and transitions appear in the PDF?', a: 'No. Animations and transitions are presentation-only features and do not carry over to PDF. Each slide appears as a static image.' },
      { q: 'Can I share the PDF on any device?', a: 'Yes. PDFs are universally compatible and can be opened on any phone, tablet, or computer without needing PowerPoint installed.' },
    ],
  },
  '/analyze-pdf': {
    title: 'PDF Analyzer Online Free – Inspect PDF Properties | DocCraft',
    desc: 'Analyze any PDF online for free — detect document type (invoice, resume, contract), check page count, metadata, fonts, and conversion quality. Instant PDF inspector.',
    keywords: 'PDF analyzer online free, inspect PDF, PDF properties checker, PDF metadata viewer, PDF info extractor, analyze PDF file online, PDF inspector free',
    steps: [
      'Upload your PDF file by clicking the button or dragging it onto the page.',
      'The analyzer scans the PDF and extracts key information: page count, document type, fonts, metadata, and file size.',
      'Review the detailed analysis report instantly — no signup required.',
    ],
    faqs: [
      { q: 'Is the PDF analyzer free?', a: 'Yes, completely free with no signup needed.' },
      { q: 'What information does it extract?', a: 'It extracts page count, file size, creation and modification dates, author metadata, fonts used, PDF version, and detected document type (invoice, resume, contract, etc.).' },
      { q: 'Does analyzing a PDF modify it?', a: 'No. Analysis is read-only. Your PDF is not changed in any way.' },
      { q: 'Is my PDF content kept private?', a: 'Yes. The file is analyzed securely and deleted from our servers within 1 hour. We do not read or store your document content.' },
    ],
  },
  '/json-beautifier': {
    title: 'JSON Beautifier & Formatter Online Free – Pretty Print JSON | DocCraft',
    desc: 'Format and pretty-print minified JSON with proper indentation and syntax highlighting online for free. Also compact JSON to one line. Instant JSON formatter.',
    keywords: 'JSON beautifier online free, JSON formatter, pretty print JSON, format JSON online, JSON indenter, JSON pretty printer, minify JSON, JSON viewer online, JSON formatter free',
    steps: [
      'Paste your JSON string into the input area on the left — even minified single-line JSON works.',
      'The formatter automatically beautifies and syntax-highlights your JSON with proper indentation in real time.',
      'Copy the formatted JSON from the output panel or click Minify to compact it back to one line.',
    ],
    faqs: [
      { q: 'Is the JSON formatter free?', a: 'Yes, 100% free with no signup. Format unlimited JSON strings instantly.' },
      { q: 'Does it validate JSON while formatting?', a: 'Yes. If your JSON has syntax errors, the formatter highlights the exact location of the problem and shows an error message.' },
      { q: 'What is the maximum JSON size I can format?', a: 'The tool handles JSON up to several MB comfortably in the browser. Very large files (50MB+) may be slower.' },
      { q: 'Can I use it to minify JSON too?', a: 'Yes. Click the "Minify" option to compact your JSON to a single line — useful for production APIs and configuration files.' },
    ],
  },
  '/json-validator': {
    title: 'JSON Validator Online Free – Validate & Check JSON Syntax | DocCraft',
    desc: 'Validate JSON syntax online for free. Instantly detects errors and pinpoints the exact line and character of syntax problems. Free JSON syntax checker.',
    keywords: 'JSON validator online free, validate JSON, check JSON syntax, JSON syntax checker, JSON linter, is valid JSON, JSON error checker, JSON format checker free',
    steps: [
      'Paste your JSON string or JSON file contents into the input area.',
      'The validator instantly checks the syntax — valid JSON shows a green confirmation, errors show the exact line and character.',
      'Fix any errors shown and re-validate until you get a clean "Valid JSON" result.',
    ],
    faqs: [
      { q: 'Is the JSON validator free?', a: 'Yes, completely free. No signup, no limits.' },
      { q: 'What does JSON validation check?', a: 'It checks for correct syntax: matching braces, correct comma placement, valid string quoting, and no trailing commas or comments (which are not valid JSON).' },
      { q: 'Can I validate JSON schema too?', a: 'This tool validates JSON syntax (well-formedness). For JSON Schema validation against a schema definition, use a dedicated JSON Schema validator tool.' },
      { q: 'Why is my JSON showing as invalid?', a: 'Common causes include: trailing commas after the last item, single quotes instead of double quotes, unescaped special characters in strings, or missing closing brackets/braces.' },
    ],
  },
  '/xml-beautifier': {
    title: 'XML Beautifier & Formatter Online Free | DocCraft',
    desc: 'Format XML with proper indentation and structure online for free. Also minify XML by stripping whitespace for production. Free online XML beautifier and formatter.',
    keywords: 'XML beautifier online free, XML formatter, format XML online, XML indenter, pretty print XML, XML pretty printer, XML minifier, XML viewer free',
    steps: [
      'Paste your XML string into the input area — raw, minified, or badly formatted XML all work.',
      'The beautifier automatically indents and structures your XML with proper nesting and syntax highlighting.',
      'Copy the formatted XML from the output, or click Minify to strip whitespace for production use.',
    ],
    faqs: [
      { q: 'Is the XML beautifier free?', a: 'Yes, 100% free with no account needed.' },
      { q: 'Does it validate XML while formatting?', a: 'Yes. Malformed XML with missing closing tags or invalid characters is flagged with an error message.' },
      { q: 'What XML types are supported?', a: 'All standard XML including SOAP, RSS, Atom feeds, SVG, HTML, config files (like Maven pom.xml), and any well-formed XML document.' },
      { q: 'Can I minify XML to reduce file size?', a: 'Yes. The Minify option removes all unnecessary whitespace and newlines, producing the most compact XML string.' },
    ],
  },
  '/sql-formatter': {
    title: 'SQL Formatter & Beautifier Online Free – Format SQL Queries | DocCraft',
    desc: 'Reformat messy SQL queries into clean, readable, indented code online for free. Supports MySQL, PostgreSQL, SQLite, SQL Server (T-SQL), Oracle. Free SQL formatter.',
    keywords: 'SQL formatter online free, SQL beautifier, format SQL query, SQL pretty printer, MySQL formatter, PostgreSQL formatter, T-SQL formatter, SQL query formatter free, reformat SQL online',
    steps: [
      'Paste your SQL query (however messy) into the input area on the left.',
      'Select your SQL dialect (MySQL, PostgreSQL, SQL Server, etc.) for accurate keyword formatting.',
      'Copy the beautifully formatted SQL from the output panel, ready to use in your code or docs.',
    ],
    faqs: [
      { q: 'Is the SQL formatter free?', a: 'Yes, completely free. No signup, format unlimited queries.' },
      { q: 'Which SQL dialects are supported?', a: 'MySQL, PostgreSQL, SQLite, SQL Server (T-SQL), Oracle, MariaDB, and standard ANSI SQL are all supported.' },
      { q: 'Does it format stored procedures and views?', a: 'Yes. Complex queries including stored procedures, CTEs, subqueries, JOINS, and window functions are all formatted correctly.' },
      { q: 'Will formatting change my SQL logic?', a: 'No. The formatter only changes whitespace and indentation — it never alters the logic, keywords, or values in your query.' },
    ],
  },
  '/jwt-debugger': {
    title: 'JWT Debugger & Decoder Online Free – Decode JWT Token | DocCraft',
    desc: 'Decode and inspect JWT (JSON Web Token) online for free. See header, payload claims, expiry (exp), issued at (iat), and more. Free JWT decoder and debugger.',
    keywords: 'JWT debugger online free, JWT decoder, decode JWT token, JWT inspector, JSON Web Token decoder, JWT payload viewer, JWT header decoder, JWT token checker free',
    steps: [
      'Paste your JWT token (the full "xxxxx.yyyyy.zzzzz" string) into the input field.',
      'The debugger instantly decodes and displays the Header (algorithm), Payload (claims like exp, iat, sub), and raw signature.',
      'Inspect your claims — check if the token is expired or review any custom payload fields.',
    ],
    faqs: [
      { q: 'Is the JWT debugger free?', a: 'Yes, 100% free with no signup required.' },
      { q: 'Is it safe to paste my JWT token here?', a: 'JWT decoding is a purely local browser operation — your token is NOT sent to any server. It is decoded entirely in your browser using JavaScript.' },
      { q: 'Can it verify the JWT signature?', a: 'This tool decodes the payload and header but does not verify the cryptographic signature (that requires your secret key). It is ideal for inspecting token contents.' },
      { q: 'What JWT algorithms are supported?', a: 'All standard JWT algorithms are decoded: HS256, HS384, HS512, RS256, RS384, RS512, ES256, ES384, ES512, and more.' },
    ],
  },
  '/qr-generator': {
    title: 'QR Code Generator Online Free – Create & Download QR Codes | DocCraft',
    desc: 'Generate custom QR codes for URLs, text, email, phone numbers, or contact cards online for free. Download as high-resolution PNG. No signup needed.',
    keywords: 'QR code generator online free, create QR code, QR code maker, generate QR code from URL, custom QR code free, QR code creator, free QR code generator no sign up',
    steps: [
      'Select the QR type: URL, plain text, email, phone number, SMS, or vCard contact.',
      'Enter your content — the QR code preview updates in real time as you type.',
      'Download your QR code as a high-resolution PNG image, ready to print or share digitally.',
    ],
    faqs: [
      { q: 'Is the QR code generator free?', a: 'Yes, 100% free. No account, no watermark on the QR code, unlimited use.' },
      { q: 'Can I use the generated QR code for commercial purposes?', a: 'Yes. QR codes generated here are yours to use freely — for products, marketing, business cards, or any other purpose.' },
      { q: 'How long does a QR code remain valid?', a: 'QR codes generated here are static and never expire. As long as the URL or data they point to remains valid, the QR code will always work.' },
      { q: 'What resolution is the downloaded QR code?', a: 'The downloaded PNG is high resolution (at least 512×512 px), suitable for printing on business cards, posters, and product labels.' },
    ],
  },
  '/regex-tester': {
    title: 'Regex Tester Online Free – Test Regular Expressions | DocCraft',
    desc: 'Test and debug regular expressions against sample text online for free. See live highlighted matches, group captures, and match count. Supports JavaScript regex. Free regex checker.',
    keywords: 'regex tester online free, regular expression tester, test regex online, regex debugger, regex checker, regex matcher online, JavaScript regex tester, regex playground free',
    steps: [
      'Enter your regular expression in the pattern field (without slashes), and set any flags (g, i, m).',
      'Paste your test string in the text area below — all matches are highlighted in real time.',
      'Review the match list and capture groups shown in the results panel. Adjust your regex until it matches correctly.',
    ],
    faqs: [
      { q: 'Is the regex tester free?', a: 'Yes, 100% free with no signup required.' },
      { q: 'Which regex flavor is supported?', a: 'JavaScript (ECMAScript) regex is used, which covers the vast majority of regex use cases and is compatible with most programming languages.' },
      { q: 'Can I test named capture groups?', a: 'Yes. Named groups like (?<year>\\d{4}) are supported and their values are shown in the match results.' },
      { q: 'Why are my matches not showing?', a: 'Make sure you\'re using the "g" (global) flag to find all matches, not just the first one. Also check for missing escapes (e.g., \\d instead of just d).' },
    ],
  },
  '/hash-generator': {
    title: 'Hash Generator Online Free – MD5, SHA-256, SHA-512 Checksum | DocCraft',
    desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 cryptographic hashes of any text online for free. Useful for checksums, passwords, and data integrity checks. Free hash calculator.',
    keywords: 'hash generator online free, MD5 generator, SHA-256 generator, SHA-512 hash, checksum calculator online, text to MD5, SHA-1 generator, hash calculator free, generate hash online',
    steps: [
      'Type or paste the text you want to hash into the input field.',
      'Select the hash algorithm: MD5, SHA-1, SHA-256, SHA-384, or SHA-512.',
      'Copy the generated hash value from the output — the hash updates instantly as you type.',
    ],
    faqs: [
      { q: 'Is the hash generator free?', a: 'Yes, completely free. No signup, unlimited use.' },
      { q: 'Which hash algorithms are supported?', a: 'MD5, SHA-1, SHA-256, SHA-384, SHA-512, and RIPEMD-160 are all available.' },
      { q: 'Is hashing done in my browser or on a server?', a: 'Hashing is done entirely in your browser using the Web Crypto API. Your text is never sent to any server — it is completely private.' },
      { q: 'Can I use this to hash passwords?', a: 'MD5 and SHA-1 are not recommended for password storage (too fast, vulnerable to rainbow tables). For passwords, use bcrypt or Argon2 in your application backend.' },
    ],
  },
  '/webp-converter': {
    title: 'WebP Converter Online Free – Convert WebP to JPG, PNG & More | DocCraft',
    desc: 'Convert WebP images to JPG or PNG, or convert JPG/PNG images to WebP format for faster web pages. Free online WebP converter — no signup needed.',
    keywords: 'WebP converter online free, WebP to JPG, WebP to PNG, convert WebP, JPG to WebP, PNG to WebP, WebP image converter free, WebP to JPEG online',
    steps: [
      'Upload your WebP image (or JPG/PNG you want to convert to WebP) by clicking the button or dragging it.',
      'Select the output format: JPG, PNG, or WebP.',
      'Download the converted image instantly — no signup, no watermark.',
    ],
    faqs: [
      { q: 'Is the WebP converter free?', a: 'Yes, 100% free with no account required.' },
      { q: 'Why should I convert images to WebP?', a: 'WebP images are typically 25–35% smaller than JPG and PNG at the same quality, which makes websites load faster and improves Core Web Vitals scores.' },
      { q: 'Why can\'t I open a WebP file on my computer?', a: 'Older image viewers and software do not support WebP. Convert it to JPG or PNG using this tool to open it in any image viewer or editor.' },
      { q: 'Does converting WebP to JPG reduce quality?', a: 'There is a slight quality loss converting WebP to JPG because JPG is lossy. Converting to PNG is lossless but results in a larger file.' },
    ],
  },
  '/image-compressor': {
    title: 'Image Compressor Online Free – Reduce Image File Size | DocCraft',
    desc: 'Compress JPEG, PNG, and WebP images online for free. Adjust quality with a slider and see live before/after file size savings. No upload to cloud servers.',
    keywords: 'image compressor online free, reduce image size, compress JPEG online free, compress PNG free, image size reducer, photo compressor free, shrink image file size online',
    steps: [
      'Upload your image (JPG, PNG, or WebP) by clicking the button or dragging it onto the page.',
      'Drag the quality slider to balance between file size and image sharpness — see the live before/after size comparison.',
      'Download the compressed image — no signup, no watermark, completely free.',
    ],
    faqs: [
      { q: 'Is the image compressor free?', a: 'Yes, 100% free. No account needed, compress unlimited images.' },
      { q: 'Will compression make my images look blurry?', a: 'At 70–85% quality, the difference is barely noticeable to the human eye while achieving 50–70% file size reduction.' },
      { q: 'Is image compression done in my browser?', a: 'Yes. Compression happens entirely in your browser using Canvas API. Your images are never uploaded to any server — complete privacy.' },
      { q: 'What image formats are supported?', a: 'JPEG, PNG, and WebP images are supported. HEIC images should be converted to JPG first using the HEIC converter.' },
    ],
  },
  '/heic-converter': {
    title: 'HEIC to JPG Converter Online Free – Convert iPhone Photos | DocCraft',
    desc: 'Convert iPhone HEIC and HEIF photos to JPEG or PNG right in the browser for free. No upload to any server — complete privacy. Free HEIC converter.',
    keywords: 'HEIC to JPG converter online free, HEIC to JPEG, convert HEIC to JPG, iPhone photo converter, HEIF to JPG, Apple photo to JPEG free, HEIC converter online',
    steps: [
      'Upload your HEIC or HEIF photo file (taken on iPhone or iPad) by clicking the button or dragging it.',
      'Select the output format: JPG (best for most uses) or PNG (lossless, larger file size).',
      'Download the converted image — compatible with Windows, Android, and all non-Apple devices.',
    ],
    faqs: [
      { q: 'Is HEIC to JPG conversion free?', a: 'Yes, 100% free with no signup required.' },
      { q: 'Why do iPhone photos save as HEIC?', a: 'HEIC (High Efficiency Image Container) is Apple\'s format that saves photos at half the file size of JPG with the same quality. However, it\'s not compatible with all apps and devices.' },
      { q: 'Is my photo uploaded to a server?', a: 'No. HEIC conversion happens entirely within your browser. Your photo is never sent to any server, ensuring complete privacy.' },
      { q: 'Can I convert multiple HEIC files at once?', a: 'Yes. You can upload and convert multiple HEIC photos in one batch.' },
    ],
  },
  '/bg-remover': {
    title: 'Background Remover Online Free – Remove Image Background | DocCraft',
    desc: 'Remove backgrounds from product photos, portraits, and logos using AI online for free. Download as transparent PNG. No signup — instant background removal.',
    keywords: 'background remover online free, remove background from image, transparent background maker, image background eraser free, remove white background from image, AI background remover',
    steps: [
      'Upload your photo (product, portrait, or logo) by clicking the button or dragging it onto the page.',
      'The AI automatically detects the subject and removes the background in seconds.',
      'Download the transparent PNG image — perfect for e-commerce, presentations, or graphic design.',
    ],
    faqs: [
      { q: 'Is the background remover free?', a: 'Yes, 100% free with no signup. Remove backgrounds from unlimited images.' },
      { q: 'What types of images work best?', a: 'Product photos on solid backgrounds, portraits, logos, and objects with clear edges work best. Complex backgrounds with similar colors to the subject may need manual touch-up.' },
      { q: 'What format is the output?', a: 'The background-removed image is downloaded as a PNG with a transparent background. You can then place it on any color or background.' },
      { q: 'Can I use this for e-commerce product photos?', a: 'Yes. Background removal is one of the most common uses — clean white or transparent backgrounds are required by most e-commerce platforms like Amazon, Flipkart, and Shopify.' },
    ],
  },
  '/color-converter': {
    title: 'Color Converter Online Free – HEX, RGB, HSL, HSV, CMYK | DocCraft',
    desc: 'Convert colors between HEX, RGB, HSL, HSV, and CMYK color formats simultaneously with a live color picker online for free. Essential tool for designers and developers.',
    keywords: 'color converter online free, HEX to RGB, RGB to HEX, HEX to HSL, color format converter, CSS color converter, CMYK to RGB, color code converter free, hex color picker',
    steps: [
      'Enter a color value in any format — HEX code (#ff6b35), RGB values, HSL, HSV, or CMYK.',
      'All other color format equivalents are automatically calculated and displayed simultaneously.',
      'Click any color value to copy it to your clipboard, or use the visual color picker to browse colors.',
    ],
    faqs: [
      { q: 'Is the color converter free?', a: 'Yes, completely free with no signup.' },
      { q: 'Which color formats are supported?', a: 'HEX, RGB, RGBA, HSL, HSLA, HSV, HSB, and CMYK color formats are all supported for conversion.' },
      { q: 'What is the difference between HSL and HSV?', a: 'HSL (Hue, Saturation, Lightness) and HSV/HSB (Hue, Saturation, Value/Brightness) are similar models. HSL is more intuitive for defining shades; HSV is commonly used in color pickers.' },
      { q: 'Can I use this for CSS color values?', a: 'Yes. CSS supports HEX (#rrggbb), RGB (rgb()), RGBA (rgba()), HSL (hsl()), and HSLA (hsla()) — all available from this converter.' },
    ],
  },
  '/word-compare': {
    title: 'Text Diff Tool Online Free – Compare Two Texts Side by Side | DocCraft',
    desc: 'Compare two texts and see every addition, deletion, and change highlighted side-by-side online for free. Great for comparing documents, code, essays, and contracts.',
    keywords: 'text diff tool online free, compare two texts, text comparison tool, document diff, find differences in text, text difference checker free, compare documents online, word diff tool',
    steps: [
      'Paste your original text in the left input area and the modified/new text in the right input area.',
      'Click "Compare" — additions are highlighted in green, deletions in red, and unchanged text in white.',
      'Review the differences side by side. Copy either version or the diff summary as needed.',
    ],
    faqs: [
      { q: 'Is the text diff tool free?', a: 'Yes, 100% free with no signup needed.' },
      { q: 'What types of content can I compare?', a: 'Any plain text — documents, essays, contracts, code, emails, JSON, CSV, or any other text-based content.' },
      { q: 'Is there a word or character limit?', a: 'The tool handles texts up to several thousand words comfortably in the browser.' },
      { q: 'Can I compare code files?', a: 'Yes. For comparing code specifically, the Code Diff Viewer tool at tools.arkaserve.com/code-diff offers syntax highlighting for programming languages.' },
    ],
  },
  '/word-count': {
    title: 'Word Count Tool Online Free – Count Words, Characters & More | DocCraft',
    desc: 'Count words, characters (with and without spaces), sentences, paragraphs, and estimated reading time in any text online for free. Free word counter tool.',
    keywords: 'word count tool online free, count words online, character counter, word counter free, words and characters counter, reading time calculator, word count checker, text statistics tool',
    steps: [
      'Paste or type your text directly into the text area on the page.',
      'Word count, character count, sentence count, paragraph count, and estimated reading time update instantly as you type.',
      'Review the full text statistics in the results panel — no click or button press needed.',
    ],
    faqs: [
      { q: 'Is the word count tool free?', a: 'Yes, completely free. No signup, no limits.' },
      { q: 'Does it count characters with or without spaces?', a: 'Both. The tool shows character count with spaces and without spaces separately.' },
      { q: 'How is reading time calculated?', a: 'Reading time is estimated at 200–250 words per minute, which is the average adult reading speed. Adjust for your specific audience.' },
      { q: 'Can I use it for social media character limits?', a: 'Yes. The character count helps you stay within limits for Twitter/X (280 chars), LinkedIn, SMS (160 chars), and other platforms.' },
    ],
  },
  '/code-diff': {
    title: 'Code Diff Viewer Online Free – Compare Code Changes | DocCraft',
    desc: 'Compare two code snippets and see every added, removed, and changed line highlighted side-by-side online for free. Works with any programming language.',
    keywords: 'code diff viewer online free, compare code online, code comparison tool, diff checker for code, source code diff, online diff tool, code change viewer, file diff online free',
    steps: [
      'Paste your original code in the left panel and the updated code in the right panel.',
      'The diff viewer automatically highlights added lines in green, removed lines in red, and unchanged lines in white.',
      'Scroll through both panels side by side to review exactly what changed — great for code reviews.',
    ],
    faqs: [
      { q: 'Is the code diff viewer free?', a: 'Yes, 100% free with no signup.' },
      { q: 'Which programming languages are supported?', a: 'Any programming language or plain text works — Python, JavaScript, Java, C++, HTML, CSS, SQL, YAML, JSON, and more.' },
      { q: 'Can I see a unified diff (single panel) view?', a: 'The current view is side-by-side (split diff). This makes it easy to track context on both sides simultaneously.' },
      { q: 'Is there a line limit?', a: 'The tool works well with files up to a few thousand lines. Very large files may be slower in the browser.' },
    ],
  },
  '/css-js-minifier': {
    title: 'CSS & JS Minifier Online Free – Minify CSS and JavaScript | DocCraft',
    desc: 'Minify CSS or JavaScript code for production to reduce file size, or beautify minified code for debugging online for free. Free CSS and JS minifier.',
    keywords: 'CSS minifier online free, JS minifier, JavaScript minifier, minify CSS online, minify JavaScript free, CSS compressor, JS compressor, uglify JS online, CSS beautifier, JS beautifier',
    steps: [
      'Paste your CSS or JavaScript code into the input area.',
      'Select the operation: Minify (for production — removes whitespace, comments, and shortens names) or Beautify (for readability).',
      'Copy the output from the result panel — the minified code is ready to deploy.',
    ],
    faqs: [
      { q: 'Is the CSS/JS minifier free?', a: 'Yes, 100% free. No signup, minify unlimited code.' },
      { q: 'Does minification break my code?', a: 'No. Minification only removes unnecessary characters (spaces, comments, newlines). The code functionality is preserved completely.' },
      { q: 'How much file size reduction can I expect?', a: 'Typical CSS files reduce by 20–40% and JavaScript files by 30–60% after minification. Code with many comments compresses even more.' },
      { q: 'Is it safe to minify production JavaScript?', a: 'Yes, but always keep an unminified copy for debugging. Deploy the minified version to reduce page load time and improve performance.' },
    ],
  },
  '/markdown-preview': {
    title: 'Markdown Preview & Editor Online Free – Live Markdown Renderer | DocCraft',
    desc: 'Write Markdown and instantly see the rendered HTML preview side-by-side online for free. Supports GitHub Flavored Markdown (GFM), tables, and code blocks.',
    keywords: 'Markdown preview online free, markdown editor online, markdown renderer, live markdown preview, markdown to HTML, GFM markdown editor, markdown viewer free, markdown converter online',
    steps: [
      'Type or paste your Markdown text in the left editor panel.',
      'The right panel shows a live rendered HTML preview that updates in real time as you type.',
      'Copy the formatted HTML, or use the editor to perfect your Markdown for README files, documentation, or blogs.',
    ],
    faqs: [
      { q: 'Is the Markdown editor free?', a: 'Yes, completely free with no account needed.' },
      { q: 'Which Markdown flavors are supported?', a: 'CommonMark and GitHub Flavored Markdown (GFM) are both supported, including tables, task lists, strikethrough, and fenced code blocks.' },
      { q: 'Can I export the Markdown as HTML?', a: 'Yes. The rendered HTML can be copied from the preview panel and used directly in web pages or email templates.' },
      { q: 'Does it support syntax highlighting in code blocks?', a: 'Yes. Fenced code blocks with language specifiers (```js, ```python, ```sql) render with syntax highlighting.' },
    ],
  },
  '/unit-converter': {
    title: 'Unit Converter Online Free – Length, Weight, Temperature & More | DocCraft',
    desc: 'Convert units of length, mass/weight, temperature, area, volume, speed, data storage, and time online for free. Comprehensive unit conversion tool.',
    keywords: 'unit converter online free, length converter, weight converter, temperature converter, km to miles, kg to lbs, celsius to fahrenheit, area converter, volume converter free',
    steps: [
      'Select the category of unit you want to convert: Length, Weight, Temperature, Area, Volume, Speed, or Data.',
      'Enter the value in the "From" unit field and select the source unit from the dropdown.',
      'Select the target unit and the converted value appears instantly — copy it or try another conversion.',
    ],
    faqs: [
      { q: 'Is the unit converter free?', a: 'Yes, 100% free with no signup.' },
      { q: 'What unit categories are available?', a: 'Length (m, km, miles, feet, inches), Weight (kg, lbs, grams, oz), Temperature (°C, °F, K), Area, Volume, Speed (km/h, mph, m/s), and Data storage (KB, MB, GB, TB).' },
      { q: 'Can I convert Celsius to Fahrenheit?', a: 'Yes. Select Temperature, enter your value in Celsius (or Fahrenheit), and get the instant converted result.' },
      { q: 'Does it support metric and imperial units?', a: 'Yes, both metric (SI) and imperial/US customary units are fully supported across all categories.' },
    ],
  },
  '/timezone-converter': {
    title: 'Timezone Converter Online Free – World Time Zone Clock | DocCraft',
    desc: 'Convert times between world time zones with live analog clocks for each city online for free. Find meeting times across time zones. Free world clock converter.',
    keywords: 'timezone converter online free, time zone converter, world clock, convert time zones, IST to EST converter, meeting time converter, UTC converter, time zone calculator free',
    steps: [
      'Select the source timezone (where you are or where an event is happening) from the dropdown.',
      'Select the target timezone (where the person/meeting is) from the second dropdown.',
      'Enter the time — the equivalent time in the target timezone is shown instantly with the analog clock display.',
    ],
    faqs: [
      { q: 'Is the timezone converter free?', a: 'Yes, 100% free. No account, no limits.' },
      { q: 'How many time zones are supported?', a: 'All major world time zones are supported, including IST, EST, CST, PST, GMT, UTC, JST, AEST, and all IANA timezone names.' },
      { q: 'Does it handle daylight saving time (DST)?', a: 'Yes. The converter automatically accounts for daylight saving time based on the current date, so the conversion is always accurate.' },
      { q: 'Can I find the best meeting time for multiple time zones?', a: 'Enter different times and check the converted result for each timezone to find a mutually convenient meeting slot for your global team.' },
    ],
  },
  '/base64': {
    title: 'Base64 Encoder & Decoder Online Free | DocCraft',
    desc: 'Encode text or binary data to Base64 string, or decode Base64 back to plain text online for free. Useful for JWT, data URIs, and API payloads. Free Base64 converter.',
    keywords: 'Base64 encoder decoder online free, encode Base64, decode Base64, Base64 converter, text to Base64, Base64 to text, Base64 online tool, encode decode Base64 free',
    steps: [
      'Select Encode or Decode from the mode toggle.',
      'Paste your text (for encoding) or your Base64 string (for decoding) into the input area.',
      'The output appears instantly in the result panel — copy it to your clipboard with one click.',
    ],
    faqs: [
      { q: 'Is the Base64 tool free?', a: 'Yes, 100% free with no signup.' },
      { q: 'What is Base64 encoding used for?', a: 'Base64 is used to encode binary data (images, files) as text for embedding in HTML/CSS data URIs, transmitting in JSON API payloads, JWT tokens, and email attachments (MIME).' },
      { q: 'Can I encode image files to Base64?', a: 'Yes. Binary file encoding is supported — paste the file\'s binary as hex or use the file upload option to get the Base64 data URI for images.' },
      { q: 'Is Base64 a form of encryption?', a: 'No. Base64 is encoding, not encryption. Anyone can decode a Base64 string without a key. Do not use it to secure sensitive data.' },
    ],
  },
  '/url-encode': {
    title: 'URL Encoder & Decoder Online Free – Percent Encode URLs | DocCraft',
    desc: 'Percent-encode special characters in URLs for safe transmission, or decode URL-encoded strings back to readable text online for free. Free URL encoder decoder.',
    keywords: 'URL encoder decoder online free, percent encode URL, URL encoding tool, encode URL online, decode URL online, URL percent encoding, URI encoder free, URL special characters encode',
    steps: [
      'Select Encode or Decode mode from the toggle.',
      'Paste your URL or URL-encoded string into the input area.',
      'The encoded/decoded result appears instantly — copy it and use it in your application or browser.',
    ],
    faqs: [
      { q: 'Is the URL encoder free?', a: 'Yes, completely free with no signup.' },
      { q: 'What is URL encoding?', a: 'URL encoding (percent-encoding) converts characters that are not allowed in URLs — like spaces, &, =, +, # — into a percent followed by their hex code (e.g., space becomes %20).' },
      { q: 'When do I need to URL-encode?', a: 'When building query strings, embedding URLs in other URLs, sending form data, or constructing API request parameters that include special characters.' },
      { q: 'What is the difference between encodeURI and encodeURIComponent?', a: 'encodeURI encodes a complete URL (preserving ://?#&=). encodeURIComponent encodes a URL component (query param value) — it encodes everything including & and =. Use the appropriate mode on this tool.' },
    ],
  },
  '/favicon-generator': {
    title: 'Favicon Generator Online Free – Create Favicon from Image | DocCraft',
    desc: 'Upload a logo, image, or emoji to generate favicon PNG files at 16×16, 32×32, 64×64, and 180×180 px online for free. Download as a ZIP. Free favicon maker.',
    keywords: 'favicon generator online free, create favicon, favicon maker, generate favicon from image, favicon ico generator, website favicon creator, favicon png generator free',
    steps: [
      'Upload your logo or image (PNG, JPG, or SVG) by clicking the button or dragging it onto the page.',
      'Preview the favicon at different sizes (16×16, 32×32, 64×64, 180×180 px) — crop or center as needed.',
      'Download all favicon sizes as a ZIP file and follow the included HTML code snippet to add them to your website.',
    ],
    faqs: [
      { q: 'Is the favicon generator free?', a: 'Yes, 100% free. No signup, create unlimited favicons.' },
      { q: 'What sizes should a favicon be?', a: 'Standard sizes are 16×16 (browser tab), 32×32 (taskbar/bookmark), 64×64 (high DPI), and 180×180 px (Apple touch icon for iOS). This tool generates all of them.' },
      { q: 'Do I need an .ico file or PNG files?', a: 'Modern browsers and all major platforms support PNG favicons. The .ico format is only needed for very old browser compatibility (IE11 and below).' },
      { q: 'How do I add the favicon to my website?', a: 'Place the favicon files in your site\'s root directory and add the HTML link tags (included in the download ZIP\'s readme) to your HTML <head> section.' },
    ],
  },
  '/color-palette': {
    title: 'Color Palette Extractor Online Free – Extract Colors from Image | DocCraft',
    desc: 'Upload any photo and automatically extract the dominant color palette with HEX, RGB, and HSL codes online for free. Great for designers and brand color extraction.',
    keywords: 'color palette extractor online free, extract colors from image, color palette generator, dominant colors from image, image color picker, color extractor free, color scheme from photo',
    steps: [
      'Upload any image (photo, logo, artwork) by clicking the button or dragging it onto the page.',
      'The tool automatically extracts the 5–10 most dominant colors from the image using color quantization.',
      'Click any color swatch to copy its HEX, RGB, or HSL value — use them in your designs or code.',
    ],
    faqs: [
      { q: 'Is the color palette extractor free?', a: 'Yes, completely free with no signup required.' },
      { q: 'How many colors does it extract?', a: 'The tool extracts the 5–10 most dominant and visually distinct colors from your image.' },
      { q: 'What is this useful for?', a: 'Extracting brand colors from a logo, matching a design to a photo, creating a UI color scheme from a reference image, or finding complementary colors for a project.' },
      { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, GIF, and BMP images are all supported.' },
    ],
  },
  '/css-gradient': {
    title: 'CSS Gradient Generator Online Free – Create CSS Gradients | DocCraft',
    desc: 'Design linear, radial, or conic CSS gradients visually with a live preview and copy the exact CSS code online for free. Free CSS gradient maker.',
    keywords: 'CSS gradient generator online free, CSS gradient maker, linear gradient CSS, radial gradient CSS, gradient color picker, CSS background gradient tool, gradient generator free',
    steps: [
      'Choose the gradient type: linear, radial, or conic.',
      'Pick your colors using the color pickers, adjust stop positions, and set the angle or direction.',
      'Copy the generated CSS code (background: linear-gradient(...)) and paste it directly into your stylesheet.',
    ],
    faqs: [
      { q: 'Is the CSS gradient generator free?', a: 'Yes, 100% free. No signup, create unlimited gradients.' },
      { q: 'What gradient types are supported?', a: 'Linear gradients (directional), radial gradients (circular), and conic gradients (angle-based, useful for pie charts and color wheels) are all available.' },
      { q: 'Can I add more than two colors to a gradient?', a: 'Yes. Add as many color stops as you like to create multi-color gradients with complex transitions.' },
      { q: 'Is the generated CSS compatible with all browsers?', a: 'Yes. The generated CSS uses standard, unprefixed gradient syntax which is supported by all modern browsers (Chrome, Firefox, Safari, Edge).' },
    ],
  },
  '/svg-converter': {
    title: 'SVG to PNG Converter Online Free – Convert SVG to Image | DocCraft',
    desc: 'Convert SVG vector files to crisp PNG or WebP raster images at any custom resolution online for free. Perfect for icons, logos, and illustrations. No signup needed.',
    keywords: 'SVG to PNG converter online free, SVG to image, convert SVG to PNG, SVG to JPG, SVG converter, rasterize SVG online, SVG to WebP free, vector to raster online',
    steps: [
      'Upload your SVG file by clicking the button or dragging it onto the page.',
      'Set the output resolution (width × height in pixels) — the default maintains the SVG\'s aspect ratio.',
      'Select PNG or WebP output format and download the rasterized image at your chosen resolution.',
    ],
    faqs: [
      { q: 'Is the SVG converter free?', a: 'Yes, 100% free. No signup, convert unlimited SVG files.' },
      { q: 'Why convert SVG to PNG?', a: 'SVG is not supported everywhere. PNG and WebP are universally compatible with email clients, social media, older apps, and devices that don\'t support SVG.' },
      { q: 'Can I convert SVG to any resolution?', a: 'Yes. Enter any custom width and height in pixels. The tool renders the vector SVG at the exact pixel resolution you specify.' },
      { q: 'What if my SVG uses external fonts or assets?', a: 'SVGs that reference external fonts or images may not render those elements correctly. Embed fonts and assets in the SVG file before converting for best results.' },
    ],
  },
  '/image-cropper': {
    title: 'Image Cropper Online Free – Crop Images to Any Size | DocCraft',
    desc: 'Crop images to exact dimensions with freeform selection, preset aspect ratios (1:1, 16:9, 4:3), or custom pixel values online for free. No signup.',
    keywords: 'image cropper online free, crop image online, crop photo free, image crop tool, crop picture online, crop to aspect ratio, free image cropper, crop image to size',
    steps: [
      'Upload your image (JPG, PNG, WebP) by clicking the button or dragging it onto the page.',
      'Drag the crop handles to select the area you want to keep. Choose a preset ratio (1:1, 16:9, 4:3) or set custom pixel dimensions.',
      'Click "Crop & Download" to save the cropped image — no signup, completely free.',
    ],
    faqs: [
      { q: 'Is the image cropper free?', a: 'Yes, 100% free with no account needed.' },
      { q: 'What aspect ratios are available?', a: 'Freeform (any shape), 1:1 (square), 16:9 (widescreen), 4:3 (standard), 3:2 (photo), and custom pixel dimensions are all available.' },
      { q: 'Is cropping done in my browser?', a: 'Yes. Cropping happens entirely in your browser — your image is never uploaded to any server.' },
      { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, and GIF images are supported for cropping.' },
    ],
  },
  '/image-resizer': {
    title: 'Image Resizer Online Free – Resize Images to Exact Size | DocCraft',
    desc: 'Resize images to exact pixel dimensions, percentage scale, or preset sizes online for free. Convert format and adjust quality. Free online image resizer — no signup.',
    keywords: 'image resizer online free, resize image online, resize photo free, change image size, reduce image dimensions, image size changer, resize picture online free, photo resizer',
    steps: [
      'Upload your image (JPG, PNG, WebP) by clicking the button or dragging it onto the page.',
      'Enter the new width and height in pixels, or use a percentage scale. Toggle "Lock aspect ratio" to prevent distortion.',
      'Click "Resize & Download" to save the resized image — no signup, completely free.',
    ],
    faqs: [
      { q: 'Is the image resizer free?', a: 'Yes, 100% free. No account, no watermark.' },
      { q: 'Can I resize without distorting the image?', a: 'Yes. Enable "Lock aspect ratio" and the tool automatically calculates the correct height when you change the width (or vice versa).' },
      { q: 'What are common image sizes I should use?', a: 'Profile photos: 400×400 px; Blog header: 1200×630 px; Facebook cover: 851×315 px; Instagram square: 1080×1080 px; Twitter/X header: 1500×500 px.' },
      { q: 'Will resizing reduce image quality?', a: 'Enlarging an image (upscaling) can reduce sharpness. Reducing an image (downscaling) generally looks fine. Use the quality slider to balance file size and clarity.' },
    ],
  },
  '/image-metadata': {
    title: 'EXIF Metadata Remover Online Free – Strip Image Metadata | DocCraft',
    desc: 'Remove GPS location, camera model, date, and other EXIF metadata from JPEG and PNG images before sharing online for free. Protect your privacy. Free metadata stripper.',
    keywords: 'EXIF metadata remover online free, remove image metadata, strip EXIF data, remove GPS from photo, image metadata remover free, JPEG metadata cleaner, privacy image tool',
    steps: [
      'Upload your JPEG or PNG image by clicking the button or dragging it onto the page.',
      'View the current metadata (GPS location, camera model, date/time, author) extracted from the image.',
      'Click "Remove Metadata & Download" to get a clean image with all private EXIF data stripped.',
    ],
    faqs: [
      { q: 'Is the metadata remover free?', a: 'Yes, 100% free with no signup required.' },
      { q: 'What metadata is removed?', a: 'All EXIF data is removed: GPS coordinates, device model, lens info, capture time/date, software, camera settings (ISO, aperture, shutter speed), and any author or copyright tags.' },
      { q: 'Why should I remove image metadata?', a: 'Photos taken with smartphones contain GPS coordinates that reveal exactly where the photo was taken. Removing this data protects your location privacy when sharing photos online.' },
      { q: 'Does removing metadata change the image appearance?', a: 'No. Only invisible metadata is removed. The image itself — colors, quality, and content — remains completely unchanged.' },
    ],
  },
  '/json-to-csv': {
    title: 'JSON to CSV Converter Online Free | DocCraft',
    desc: 'Convert JSON arrays and objects to CSV format online for free. Paste JSON and download a comma-separated file ready for Excel or Google Sheets. Free JSON to CSV tool.',
    keywords: 'JSON to CSV converter online free, JSON to CSV, convert JSON to CSV, JSON to spreadsheet, JSON to Excel, JSON array to CSV free, online JSON CSV converter',
    steps: [
      'Paste your JSON array or array of objects into the input area.',
      'The tool automatically maps JSON keys as column headers and values as rows.',
      'Click Download CSV and open the file directly in Excel, Google Sheets, or any spreadsheet app.',
    ],
    faqs: [
      { q: 'Is the JSON to CSV converter free?', a: 'Yes, completely free. No signup needed.' },
      { q: 'What JSON structure does it support?', a: 'Arrays of objects (the most common API response format) are fully supported. Each object becomes a CSV row with keys as column headers.' },
      { q: 'What happens with nested JSON objects?', a: 'Nested objects are flattened with dot notation (e.g., "user.name" becomes a column). Deeply nested arrays may be serialized as strings.' },
      { q: 'Can I open the CSV in Microsoft Excel?', a: 'Yes. The downloaded CSV file opens directly in Microsoft Excel, Google Sheets, LibreOffice Calc, or any spreadsheet application.' },
    ],
  },
  '/yaml-json': {
    title: 'YAML to JSON Converter Free – Convert YAML & JSON Online | DocCraft',
    desc: 'Convert YAML to JSON or JSON to YAML online for free. Useful for Kubernetes configs, Docker Compose files, and API schemas. Free YAML JSON converter.',
    keywords: 'YAML to JSON converter online free, JSON to YAML, YAML converter, convert YAML to JSON, YAML JSON tool, Kubernetes YAML converter, YAML validator free',
    steps: [
      'Select the conversion direction: YAML → JSON or JSON → YAML.',
      'Paste your YAML or JSON content into the input area.',
      'Copy the converted output — perfect for Kubernetes manifests, Docker Compose, OpenAPI specs, and more.',
    ],
    faqs: [
      { q: 'Is the YAML to JSON converter free?', a: 'Yes, 100% free with no signup.' },
      { q: 'What is YAML used for?', a: 'YAML is a human-readable data format commonly used for configuration files: Kubernetes manifests, Docker Compose, GitHub Actions, Ansible playbooks, and many more.' },
      { q: 'Does it validate YAML syntax?', a: 'Yes. Invalid YAML (wrong indentation, missing colons, tab characters) is flagged with an error message indicating the problem line.' },
      { q: 'What are the key differences between YAML and JSON?', a: 'YAML is more human-readable (uses indentation, no quotes needed for strings), while JSON is strict (requires quotes, braces, and commas) but more universally parseable by APIs.' },
    ],
  },
  '/xml-formatter': {
    title: 'XML Formatter Online Free – Format & Validate XML | DocCraft',
    desc: 'Format, indent, and validate XML documents online for free. Also convert XML to JSON. Free online XML formatter and validator.',
    keywords: 'XML formatter online free, format XML, XML validator, XML beautifier, XML indenter, validate XML online, XML to JSON converter, XML pretty printer free',
    steps: [
      'Paste your XML content into the input area — raw, minified, or unformatted XML works.',
      'Click Format to indent and structure the XML with proper nesting, or Validate to check for errors.',
      'Copy the formatted XML or the JSON equivalent from the output panel.',
    ],
    faqs: [
      { q: 'Is the XML formatter free?', a: 'Yes, completely free. No signup.' },
      { q: 'What does XML validation check?', a: 'It checks for well-formedness: matching open and close tags, correctly nested elements, proper attribute quoting, and valid XML declaration.' },
      { q: 'Can it convert XML to JSON?', a: 'Yes. The Convert to JSON option transforms your XML structure into an equivalent JSON object, useful for modern APIs that prefer JSON.' },
      { q: 'What types of XML can I format?', a: 'Any standard XML: SOAP/WSDL, RSS feeds, SVG, XML config files (Maven pom.xml, Spring, Android), HTML as XML, and custom XML schemas.' },
    ],
  },
  '/html-tools': {
    title: 'HTML Tools Online Free – Encode, Decode & Format HTML | DocCraft',
    desc: 'HTML encode/decode special characters, strip HTML tags, minify HTML, and more online for free. Free HTML toolkit for developers.',
    keywords: 'HTML tools online free, HTML encoder decoder, strip HTML tags, HTML minifier, HTML beautifier, HTML entity encoder, HTML to text, format HTML online free',
    steps: [
      'Select the HTML operation you need: Encode, Decode, Strip Tags, Minify, or Beautify.',
      'Paste your HTML content or plain text into the input area.',
      'Copy the processed result from the output panel.',
    ],
    faqs: [
      { q: 'Is the HTML toolkit free?', a: 'Yes, 100% free with no signup.' },
      { q: 'What does HTML encoding do?', a: 'HTML encoding converts special characters like <, >, &, and " into their HTML entity equivalents (&lt;, &gt;, &amp;, &quot;) so they render safely as text, not as HTML tags.' },
      { q: 'When should I strip HTML tags?', a: 'Strip HTML tags when you need to extract plain text from an HTML document — useful for text analysis, word counting, or preparing content for plain-text emails.' },
      { q: 'What is the difference between Minify and Beautify?', a: 'Minify removes all whitespace, comments, and newlines to create the smallest possible file for production. Beautify adds proper indentation and formatting for human readability.' },
    ],
  },
  '/html-entity': {
    title: 'HTML Entity Encoder & Decoder Online Free | DocCraft',
    desc: 'Encode text to HTML entities (&amp;, &lt;, &gt;) or decode HTML entities back to plain text online for free. Essential tool for web developers.',
    keywords: 'HTML entity encoder decoder online free, HTML entities, encode HTML special characters, HTML entity converter, ampersand encoder, HTML escape unescape free',
    steps: [
      'Select Encode (text → HTML entities) or Decode (HTML entities → text) mode.',
      'Paste your text or HTML entity string into the input area.',
      'Copy the encoded or decoded result from the output panel.',
    ],
    faqs: [
      { q: 'Is the HTML entity tool free?', a: 'Yes, completely free. No account needed.' },
      { q: 'What are HTML entities?', a: 'HTML entities are special codes used to display reserved characters in HTML. For example, < must be written as &lt; so it doesn\'t get interpreted as an HTML tag.' },
      { q: 'When do I need HTML encoding?', a: 'Use HTML encoding when displaying user-generated content on a webpage to prevent XSS (Cross-Site Scripting) attacks, or when embedding code snippets in HTML.' },
      { q: 'What characters are encoded?', a: 'The essential HTML special characters: & (ampersand), < (less than), > (greater than), " (double quote), \' (single quote/apostrophe), and other extended characters.' },
    ],
  },
  '/cron-descriptor': {
    title: 'Cron Expression Descriptor Online Free – Explain Cron Jobs | DocCraft',
    desc: 'Paste a cron expression and get a plain English description of when it runs online for free. Also generate cron expressions visually. Free cron job explainer.',
    keywords: 'cron descriptor online free, cron expression explainer, cron job parser, cron to English, understand cron expression, cron generator online, cron schedule explainer free',
    steps: [
      'Paste your cron expression (e.g., "0 9 * * 1-5") into the input field.',
      'The descriptor instantly translates it to plain English: "At 9:00 AM, Monday through Friday".',
      'Use the visual builder to generate a cron expression without memorizing the syntax — click to set fields.',
    ],
    faqs: [
      { q: 'Is the cron descriptor free?', a: 'Yes, 100% free. No signup required.' },
      { q: 'What is a cron expression?', a: 'A cron expression is a string of 5 or 6 fields that defines a schedule for running automated tasks. Fields represent: minute, hour, day-of-month, month, day-of-week.' },
      { q: 'What cron formats are supported?', a: 'Standard Unix cron (5 fields), extended cron with seconds (6 fields), and common cron shorthand (@daily, @weekly, @hourly, @monthly, @yearly) are all supported.' },
      { q: 'How do I run a cron job every 5 minutes?', a: 'Use the expression "*/5 * * * *" — this runs every 5 minutes of every hour, every day. The descriptor confirms: "Every 5 minutes".' },
    ],
  },
  '/number-base': {
    title: 'Number Base Converter Online Free – Binary, Decimal, Hex | DocCraft',
    desc: 'Convert numbers between binary, decimal, octal, and hexadecimal formats online for free. See all base conversions simultaneously. Free number base converter.',
    keywords: 'number base converter online free, binary to decimal, decimal to binary, hex to decimal, binary to hex, octal converter, number system converter, base conversion tool free',
    steps: [
      'Enter a number in any base: decimal (e.g., 255), binary (0b11111111), octal (0o377), or hex (0xFF).',
      'All other base representations update instantly — see decimal, binary, octal, and hexadecimal at the same time.',
      'Copy any base value from the result panel.',
    ],
    faqs: [
      { q: 'Is the number base converter free?', a: 'Yes, completely free with no signup.' },
      { q: 'What number bases are supported?', a: 'Binary (base 2), Octal (base 8), Decimal (base 10), and Hexadecimal (base 16) are all displayed simultaneously.' },
      { q: 'What is hexadecimal used for?', a: 'Hexadecimal (base 16) is widely used in computing: memory addresses, RGB color codes (#FF6B35), HTML colors, byte values, and CPU registers.' },
      { q: 'Can I convert very large numbers?', a: 'Yes. The tool supports integers up to 64-bit range. For very large numbers, JavaScript\'s BigInt is used internally to maintain precision.' },
    ],
  },
  '/unicode-inspector': {
    title: 'Unicode Inspector Online Free – Inspect Unicode Characters | DocCraft',
    desc: 'Inspect any text for Unicode code points, block names, and character properties online for free. Identify hidden characters and emoji. Free Unicode character inspector.',
    keywords: 'Unicode inspector online free, Unicode character viewer, Unicode code point, inspect Unicode text, hidden characters detector, Unicode analyzer, character inspector free',
    steps: [
      'Paste any text into the input area — normal text, emoji, special characters, or text that looks "weird".',
      'Every character is listed individually with its Unicode code point (U+XXXX), character name, and Unicode block.',
      'Identify invisible characters, zero-width spaces, RTL marks, or unusual Unicode homoglyphs.',
    ],
    faqs: [
      { q: 'Is the Unicode inspector free?', a: 'Yes, 100% free with no signup.' },
      { q: 'What can I detect with the Unicode inspector?', a: 'Hidden zero-width spaces (U+200B), directional control characters, non-breaking spaces (U+00A0), invisible formatting characters, and homoglyph attacks (characters that look like ASCII but aren\'t).' },
      { q: 'What is a Unicode code point?', a: 'A Unicode code point is a unique number assigned to every character — written as U+XXXX (hex). For example, A is U+0041, the heart emoji ❤ is U+2764.' },
      { q: 'Why does copy-pasted text sometimes have strange characters?', a: 'Text copied from PDFs, websites, or word processors often contains invisible formatting characters, smart quotes, em dashes, or non-standard spaces that look normal but cause issues in code.' },
    ],
  },
  '/ip-calculator': {
    title: 'IP Calculator Online Free – Subnet & CIDR Calculator | DocCraft',
    desc: 'Calculate subnet masks, CIDR notation, network address, broadcast address, and usable hosts online for free. Free IP address and subnet calculator.',
    keywords: 'IP calculator online free, subnet calculator, CIDR calculator, IP subnet mask, network calculator, IP address calculator, subnet range calculator free',
    steps: [
      'Enter an IP address with CIDR notation (e.g., 192.168.1.0/24) in the input field.',
      'The calculator instantly shows: network address, broadcast address, subnet mask, usable host range, and total host count.',
      'Copy any calculated value for use in network configuration or documentation.',
    ],
    faqs: [
      { q: 'Is the IP calculator free?', a: 'Yes, 100% free. No signup required.' },
      { q: 'What is CIDR notation?', a: 'CIDR (Classless Inter-Domain Routing) notation represents an IP address and its subnet mask as a single string: 192.168.1.0/24, where /24 means the first 24 bits are the network part.' },
      { q: 'How many usable hosts does a /24 subnet have?', a: 'A /24 subnet (255.255.255.0) has 254 usable host addresses (256 total minus 1 network address and 1 broadcast address).' },
      { q: 'Can I calculate both IPv4 and IPv6?', a: 'This tool focuses on IPv4 subnet calculation. IPv6 follows similar principles but with 128-bit addresses.' },
    ],
  },
  '/calendar-converter': {
    title: 'Calendar Date Converter Online Free | DocCraft',
    desc: 'Convert dates between Gregorian, Julian, Islamic, Hebrew, and other calendar systems online for free. Free calendar date converter.',
    keywords: 'calendar converter online free, date converter, Gregorian to Julian, calendar system converter, date format converter, Islamic calendar converter, Hebrew calendar date free',
    steps: [
      'Select the source calendar system (e.g., Gregorian) and enter the date.',
      'Select the target calendar system (e.g., Islamic, Hebrew, Julian).',
      'The equivalent date in the target calendar system is calculated and displayed instantly.',
    ],
    faqs: [
      { q: 'Is the calendar converter free?', a: 'Yes, 100% free with no signup needed.' },
      { q: 'Which calendar systems are supported?', a: 'Gregorian (Western), Julian (Old Style), Islamic (Hijri), Hebrew (Jewish), Persian (Solar Hijri), and Ethiopian calendar systems are supported.' },
      { q: 'Why do different cultures use different calendars?', a: 'Different cultures developed calendars based on different astronomical cycles — solar (Gregorian, Persian), lunar (Islamic), or lunisolar (Hebrew, Chinese). Religious and historical traditions also play a role.' },
      { q: 'Is the Islamic calendar based on the moon?', a: 'Yes. The Islamic (Hijri) calendar is a purely lunar calendar of 12 months in a year of 354 or 355 days, which is about 11 days shorter than the solar year.' },
    ],
  },
  '/lorem-ipsum': {
    title: 'Lorem Ipsum Generator Online Free – Placeholder Text | DocCraft',
    desc: 'Generate Lorem Ipsum placeholder text for designs and mockups online for free. Choose number of words, sentences, or paragraphs. Free Lorem Ipsum generator.',
    keywords: 'Lorem Ipsum generator online free, placeholder text generator, dummy text generator, Lorem Ipsum text, random text generator, filler text free, Lorem Ipsum paragraphs',
    steps: [
      'Select the output unit: Words, Sentences, or Paragraphs.',
      'Enter the quantity you need (e.g., 5 paragraphs, 100 words).',
      'Click Generate and copy the Lorem Ipsum text directly into your design, mockup, or document.',
    ],
    faqs: [
      { q: 'Is the Lorem Ipsum generator free?', a: 'Yes, completely free. No signup, generate unlimited placeholder text.' },
      { q: 'What is Lorem Ipsum?', a: 'Lorem Ipsum is standard placeholder text used in graphic design, web design, and printing. It\'s derived from "de Finibus Bonorum et Malorum" by Cicero (45 BC) and has been used since the 1500s.' },
      { q: 'Why use Lorem Ipsum instead of real text?', a: 'Placeholder text lets designers focus on layout, fonts, and spacing without the distraction of meaningful content. Clients and reviewers focus on design rather than proofreading.' },
      { q: 'Can I generate a specific number of words?', a: 'Yes. Choose "Words" as the unit and enter any number from 1 to 10,000 words. For paragraphs, each paragraph has approximately 75–100 words.' },
    ],
  },
  '/lab-code-cleaner': {
    title: 'Lab Code Cleaner Online Free | DocCraft',
    desc: 'Clean and format lab code and experimental snippets online for free. Remove noise and format code for readability. Free code cleaner tool.',
    keywords: 'lab code cleaner online free, code cleaner, code formatter, clean code online, format code free',
    steps: [
      'Paste your lab code or experimental snippet into the input area.',
      'The cleaner removes noise, extra whitespace, and formatting inconsistencies.',
      'Copy the cleaned, readable code from the output panel.',
    ],
    faqs: [
      { q: 'Is the lab code cleaner free?', a: 'Yes, completely free with no signup.' },
      { q: 'What types of code can I clean?', a: 'Any programming language or script — Python, JavaScript, SQL, shell scripts, or experimental snippets work with the cleaner.' },
      { q: 'Does cleaning change the code logic?', a: 'No. Only formatting, whitespace, and style are adjusted. The code logic and functionality remain unchanged.' },
      { q: 'Is my code kept private?', a: 'Yes. Code cleaning happens in your browser. Your code is not stored or transmitted to any external server.' },
    ],
  },
  '/about': {
    title: 'About DocCraft – Free Online PDF & Document Tools by Arkaserve',
    desc: 'Learn about DocCraft, the free all-in-one document, PDF, and code tools platform by Arkaserve. 60+ tools, no signup required.',
    keywords: 'about DocCraft, free PDF tools, DocCraft tools, Arkaserve document tools',
  },
  '/contact': {
    title: 'Contact DocCraft – Get in Touch | DocCraft',
    desc: 'Contact the DocCraft team for support, feedback, or questions about our free online document and PDF tools.',
    keywords: 'contact DocCraft, DocCraft support, PDF tools help',
  },
}

export function getPageMeta(pathname) {
  const m = PAGE_META[pathname]
  if (m) {
    return {
      title: m.title,
      desc: m.desc,
      keywords: m.keywords || DEFAULT_KEYWORDS,
      steps: m.steps || [],
      faqs: m.faqs || [],
    }
  }
  return { title: `${SITE} – Free Document & Code Tools`, desc: DEFAULT_DESC, keywords: DEFAULT_KEYWORDS, steps: [], faqs: [] }
}
