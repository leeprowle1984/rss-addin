// Stage 1: builds the RSS Level 3 template skeleton from ../addin/data.js.
// Boxes, placeholders and photo boxes are written as markers (§§{json}§§) and
// replaced with real Word content controls by post.py.
const fs = require("fs");
const path = require("path");
const RSS = require("../addin/data.js");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, BorderStyle, Header, Footer, PageNumber, TableOfContents, LevelFormat, PageBreak
} = require("docx");

const BRAND = "1F4E5A", ACCENT = "2E8B88", GREY = "808080", FONT = "Arial";
const W = 9638;

const M = (obj) => new Paragraph({ children: [new TextRun({ text: "§§" + JSON.stringify(obj) + "§§" })] });
const h1 = (t) => new Paragraph({ style: "Heading1", children: [new TextRun(t)] });
const h2 = (t) => new Paragraph({ style: "Heading2", children: [new TextRun(t)] });
const body = (t) => new Paragraph({ children: [new TextRun(t)] });
const bullet = (t) => new Paragraph({ style: "ListBullet", numbering: { reference: "bullets", level: 0 }, children: [new TextRun(t)] });

const border = { style: BorderStyle.SINGLE, size: 4, color: "BFC9CC" };
const borders = { top: border, bottom: border, left: border, right: border };
function labelKeyTable() {
  const w1 = 3600, w2 = W - w1;
  const cell = (w, fill, kids) => new TableCell({ borders, width: { size: w, type: WidthType.DXA },
    shading: fill ? { type: ShadingType.CLEAR, fill, color: "auto" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: kids });
  const head = new TableRow({ tableHeader: true, children: [
    cell(w1, BRAND, [new Paragraph({ children: [new TextRun({ text: "Condition label", bold: true, color: "FFFFFF" })] })]),
    cell(w2, BRAND, [new Paragraph({ children: [new TextRun({ text: "What it means", bold: true, color: "FFFFFF" })] })])] });
  const rows = RSS.labels.map(l => new TableRow({ children: [
    cell(w1, l.colour.slice(1), [new Paragraph({ children: [new TextRun({ text: l.name, bold: true, color: "FFFFFF" })] })]),
    cell(w2, null, [body(l.note)])] }));
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [w1, w2], rows: [head, ...rows] });
}

const children = [];

// Cover
children.push(
  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "LEVEL 3", size: 28, bold: true, color: ACCENT, characterSpacing: 60 })] }),
  new Paragraph({ spacing: { line: 240, lineRule: "auto", after: 160 }, children: [new TextRun({ text: "Building Survey Report", size: 64, bold: true, color: BRAND })] }),
  new Paragraph({ spacing: { after: 300 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: ACCENT, space: 8 } },
    children: [new TextRun({ text: "Prepared under the Residential Survey Standard (RSS)", size: 24, color: GREY })] }),
  M({ t: "cover" }),
  M({ t: "kv", rows: ["Property address", "Client", "Date of inspection", "Report reference", "Surveyor", "Firm"] }),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ children: [new TextRun({ text: "Contents", size: 36, bold: true, color: BRAND })], spacing: { after: 200 } }),
  new TableOfContents("Contents", { hyperlink: true, headingStyleRange: "1-2" })
);

// A
children.push(
  h1("A  About the Inspection"),
  h2("A1 Instructions and Scope"),
  body("This is a Level 3 Building Survey prepared under the Residential Survey Standard (RSS). It is a detailed visual inspection of the property, intended to describe its construction and condition, identify defects and explain what should be done about them."),
  body("This report advises on the condition of the property only. Any decision to purchase, and the price paid, is a matter for you and your advisers."),
  h2("A2 The Inspection"),
  M({ t: "kv", rows: ["Date and time", "Weather", "Occupancy", "Property type", "Approximate year built"] }),
  h2("A3 Limitations"),
  body("My inspection was visual and non-invasive. I did not move furniture, lift floor coverings, open up the structure or test the services. I have not inspected parts of the property that were covered, unexposed or not reasonably accessible, and I cannot confirm that these areas are free from defects."),
  M({ t: "box", label: "Limitations for this inspection", tag: "rss-text:A3", bullets: true }),
  h2("A4 How to Read This Report"),
  body("Each part of the property is given a condition label, which summarises the action needed. The label supports the written description and should always be read with it. The labels are explained in section B3.")
);

// B
children.push(
  h1("B  Overall Opinion and Summary"),
  h2("B1 Overall Opinion"),
  M({ t: "box", label: "Overall opinion", tag: "rss-text:B1" }),
  h2("B2 Summary of Condition Labels"),
  M({ t: "summary" }),
  h2("B3 Condition Labels Explained"),
  labelKeyTable()
);

// C
children.push(
  h1("C  About the Property"),
  h2("C1 Description"),
  M({ t: "box", label: "Description", tag: "rss-text:C1" }),
  h2("C2 Construction"),
  M({ t: "kv", rows: ["Roof", "Walls", "Floors", "Windows", "Heating"] }),
  h2("C3 Accommodation"),
  M({ t: "kv", rows: ["Ground floor", "First floor", "Second floor", "Outside"] }),
  h2("C4 Typical Issues for Properties of This Age"),
  M({ t: "box", label: "Typical issues", tag: "rss-text:C4" })
);

// Element chapters
const withAdvice = ["D", "E", "F", "G"];
const noPhotos = ["H", "I", "J"];
for (const ch of RSS.chapters.filter(c => !c.front)) {
  children.push(h1(`${ch.code}  ${ch.name}`));
  for (const el of ch.elements) {
    children.push(h2(`${el.code} ${el.name}`));
    children.push(M({ t: "element", code: el.code, title: `${el.code} ${el.name}`, rec: el.rec !== false, photos: !noPhotos.includes(ch.code) }));
  }
  if (withAdvice.includes(ch.code)) {
    children.push(h2(`${ch.code} General Advice`));
    children.push(M({ t: "box", label: "General advice", tag: `rss-text:${ch.code}-advice`, bullets: true }));
  }
}

// L
children.push(
  h1("L  What To Do Next"),
  body("This section sets out, in order, the practical steps I recommend you take."),
  h2("L1 Before You Commit to the Purchase"),
  bullet("Arrange any further investigations recommended in this report, and read the results before you commit to the purchase."),
  bullet("Obtain quotations from suitably qualified contractors for the work described in this report."),
  bullet("Pass section H, Legal Matters, to your legal adviser."),
  h2("L2 Choosing Contractors"),
  bullet("Use contractors who are members of a recognised trade body for their work, for example NFRC for roofing, a Gas Safe registered engineer for gas, and a registered electrician for electrical work."),
  bullet("Roof replacement should be carried out by a contractor registered with the NFRC Competent Person Scheme, who can self certify the work under the Building Regulations."),
  h2("L3 Building Regulations"),
  bullet("Compliance with the Building Regulations is ultimately the homeowner's responsibility. Your contractor should carry out the work so it can easily be signed off, and should keep photographic records of concealed work."),
  bullet("Where more than half of a roof or wall is renewed, the Building Regulations will usually require it to be insulated to current standards."),
  h2("L4 After You Move In"),
  M({ t: "box", label: "Ongoing maintenance", tag: "rss-text:L4", bullets: true })
);

// M
children.push(
  h1("M  Surveyor's Declaration"),
  body("I confirm that I inspected the property on the date stated and that this report sets out my opinion of its condition at that time."),
  M({ t: "kv", rows: ["Surveyor", "Signature", "For and on behalf of", "Date of report"] })
);

const doc = new Document({
  creator: "RSS",
  title: "RSS Level 3 Building Survey Template",
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: FONT, size: 21 }, paragraph: { spacing: { after: 120, line: 276, lineRule: "auto" } } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: BRAND, font: FONT },
        paragraph: { pageBreakBefore: true, spacing: { before: 0, after: 240 }, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: ACCENT, space: 6 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: BRAND, font: FONT },
        paragraph: { keepNext: true, spacing: { before: 320, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 21, bold: true, color: ACCENT, font: FONT },
        paragraph: { keepNext: true, spacing: { before: 160, after: 60 }, outlineLevel: 2 } },
      { id: "ListBullet", name: "List Bullet", basedOn: "Normal", quickFormat: true,
        paragraph: { spacing: { after: 60 } } },
      { id: "BoxText", name: "RSS Box Text", basedOn: "Normal", quickFormat: true,
        paragraph: { spacing: { before: 40, after: 40 } } },
      { id: "RSSCaption", name: "RSS Caption", basedOn: "Normal", quickFormat: true,
        run: { size: 17, italics: true, color: "4A5A5E" },
        paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 40, after: 40 } } }
    ]
  },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 280 } } } }] }] },
  sections: [{
    properties: { page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } }, titlePage: true },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "Level 3 Building Survey", size: 16, color: GREY })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: "Prepared under the Residential Survey Standard (RSS)   Page ", size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GREY })] })] }) },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(path.join(__dirname, "stage1.docx"), buf);
  console.log("stage1 written");
});
