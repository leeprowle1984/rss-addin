"""OOXML for RSS boxes: plain tables with labelled empty cells, so nothing prints
unless the surveyor puts it there. The only content control is the condition label drop-down.
Shared by post.py (the template) and the add-in snippet generator."""
import re
from xml.sax.saxutils import escape

BRAND, ACCENT = "1F4E5A", "2E8B88"

# Row names the add-in uses to find each part of an element box.
ROWS = {"label": "Condition label", "desc": "Description", "cond": "Condition and implications",
        "rec": "Recommendations and Remedial Works"}


class Ids:
    """Supplies content control ids. token=True emits __ID__ for the add-in."""
    def __init__(self, start=2000, token=False):
        self.n, self.token = start, token
    def __call__(self):
        self.n += 1
        return "__ID__" if self.token else str(self.n)


def para(style="BoxText", center=False):
    jc = '<w:jc w:val="center"/>' if center else ""
    return f'<w:p><w:pPr><w:pStyle w:val="{style}"/>{jc}</w:pPr></w:p>'


def label_sdt(ids, title, labels):
    """Condition label drop-down. Blank until a label is chosen, so it never prints placeholder text."""
    items = "".join(f'<w:listItem w:displayText="{escape(l["name"])}" w:value="{escape(l["name"])}"/>' for l in labels)
    return ('<w:sdt><w:sdtPr><w:rPr><w:b/><w:bCs/><w:color w:val="1F4E5A"/></w:rPr>'
            f'<w:alias w:val="{escape(title)}"/><w:tag w:val="rss-label"/><w:id w:val="{ids()}"/>'
            f'<w:dropDownList>{items}</w:dropDownList></w:sdtPr>'
            '<w:sdtContent><w:r><w:rPr><w:b/><w:bCs/><w:color w:val="1F4E5A"/></w:rPr>'
            '<w:t xml:space="preserve">  </w:t></w:r></w:sdtContent></w:sdt>')


def tc(w, content, fill=None, span=1, vcenter=False):
    pr = f'<w:tcW w:w="{w}" w:type="dxa"/>'
    if span > 1:
        pr += f'<w:gridSpan w:val="{span}"/>'
    if fill:
        pr += f'<w:shd w:val="clear" w:color="auto" w:fill="{fill}"/>'
    if vcenter:
        pr += '<w:vAlign w:val="center"/>'
    return f'<w:tc><w:tcPr>{pr}</w:tcPr>{content}</w:tc>'


def tbl(grid, rows, borders=True, keep_together=True):
    """rows: list of (cells_xml, height_twips or None)."""
    if borders:
        b = '<w:{0} w:val="single" w:sz="4" w:space="0" w:color="BFC9CC"/>'
    else:
        b = '<w:{0} w:val="nil"/>'
    bx = "".join(b.format(s) for s in ("top", "left", "bottom", "right", "insideH", "insideV"))
    out = []
    for i, (cells, h) in enumerate(rows):
        trpr = '<w:cantSplit/>' + (f'<w:trHeight w:val="{h}" w:hRule="atLeast"/>' if h else "")
        if keep_together and i < len(rows) - 1:
            cells = keep(cells)
        out.append(f'<w:tr><w:trPr>{trpr}</w:trPr>{cells}</w:tr>')
    return ('<w:tbl><w:tblPr>'
            f'<w:tblW w:w="{sum(grid)}" w:type="dxa"/><w:tblBorders>{bx}</w:tblBorders>'
            '<w:tblLayout w:type="fixed"/>'
            '<w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="120" w:type="dxa"/>'
            '<w:bottom w:w="60" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar>'
            '<w:tblLook w:val="0000" w:firstRow="0" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="1" w:noVBand="1"/>'
            '</w:tblPr><w:tblGrid>' + "".join(f'<w:gridCol w:w="{g}"/>' for g in grid) + '</w:tblGrid>'
            + "".join(out) + '</w:tbl>')


def keep(cells):
    """Keep a box together on one page: every row except the last stays with the next."""
    return re.sub(r'(<w:pStyle w:val="(?:BoxText|ListBullet|RSSCaption)"/>)', r'\1<w:keepNext/>', cells)


def label_cell(w, text, dark=False):
    colour = "FFFFFF" if dark else BRAND
    fill = BRAND if dark else "E8F0F1"
    return tc(w, '<w:p><w:pPr><w:pStyle w:val="BoxText"/></w:pPr>'
                 f'<w:r><w:rPr><w:b/><w:bCs/><w:color w:val="{colour}"/><w:sz w:val="19"/></w:rPr>'
                 f'<w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>', fill=fill)


def kv(rows):
    return tbl([3200, 6438], [(label_cell(3200, r) + tc(6438, para()), None) for r in rows])


def box(label, height=900):
    return tbl([2200, 7438], [(label_cell(2200, label) + tc(7438, para()), height)])


def photo_cell(w, span=1):
    """Empty photo box: a centred line for the photo and a caption line beneath."""
    return tc(w, para("BoxText", center=True) + para("RSSCaption", center=True), span=span)


PHOTO_ROW_HEIGHT = 1100


def element(ids, title, rec, photos, labels):
    grid = [2200, 2619, 4819]
    span = 2619 + 4819
    rows = [
        (label_cell(2200, ROWS["label"], dark=True)
         + tc(span, f'<w:p><w:pPr><w:pStyle w:val="BoxText"/></w:pPr>{label_sdt(ids, title, labels)}</w:p>', span=2, vcenter=True), None),
        (label_cell(2200, ROWS["desc"]) + tc(span, para(), span=2), 600),
        (label_cell(2200, ROWS["cond"]) + tc(span, para(), span=2), 900),
    ]
    if rec:
        rows.append((label_cell(2200, ROWS["rec"]) + tc(span, para(), span=2), 700))
    if photos:
        rows.append((photo_cell(2200 + 2619, span=2) + photo_cell(4819), PHOTO_ROW_HEIGHT))
    return tbl(grid, rows)


def cover_box():
    """Borderless space on the cover for the front photo; prints blank if unused."""
    return tbl([9638], [(tc(9638, para("BoxText", center=True)), 5200)], borders=False) + '<w:p/>'
