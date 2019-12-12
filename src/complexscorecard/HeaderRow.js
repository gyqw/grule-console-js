export default class HeaderRow {
    constructor(t) {
        // todo
        // t.tr.css("background", "#f1f1f1");
        t.conditionHeaders = [];
        t.actionHeaders = [];
        return t;
    }

    addConditionHeader() {
        var n = t.complexTable, r = new o.default(n, e);
        t.width && (e.width = t.width, r.td.css("width", t.width + "px"));
        var i = t.refHeaderCell;
        if (i) {
            var a = n.headerRow.conditionHeaders.indexOf(i), s = i.td;
            t.before ? (s.before(r.td), this.conditionHeaders.splice(a, 0, r)) : (s.after(r.td), this.conditionHeaders.splice(a + 1, 0, r))
        } else this.tr.append(r.td), this.conditionHeaders.push(r)
    }

    addActionHeader(t, e) {
        var n = t.complexTable, r = t.actionType, i = new a.default(n, r, e);
        t.width && (e.width = t.width, i.td.css("width", t.width + "px")), t.customActionHeaderLabel && i.updateLabel(t.customActionHeaderLabel);
        var o = t.refHeaderCell;
        if (o) {
            var s = n.headerRow.actionHeaders.indexOf(o), c = o.td;
            t.before ? (c.before(i.td), 0 === s && this.actionHeaders[0].td.css("border-left", "inherit"), this.actionHeaders.splice(s, 0, i)) : (c.after(i.td), this.actionHeaders.splice(s + 1, 0, i))
        } else this.tr.append(i.td), this.actionHeaders.push(i)

    }
}