export default class M347 {
    constructor(e) {
        this.complexTable = e.complexTable;
        this.id = e.complexTable.nextId();
        this.init(e);
    }

    init(t) {
        var e = t.complexTable, n = !0, r = !1, i = void 0;
        try {
            for (var o, a = e.contentRows[Symbol.iterator](); !(n = (o = a.next()).done); n = !0) o.value.addNewConditionCell(t, this)
        } catch (t) {
            r = !0;
            i = t;
        } finally {
            try {
                !n && a.return && a.return()
            } finally {
                if (r) throw i
            }
        }
        e.headerRow.addConditionHeader(t, this)
    }

    refreshConditionCellVariableMenus() {
        var t = this.complexTable.contentRows, e = !0, n = !1, r = void 0;
        try {
            for (var i, o = t[Symbol.iterator](); !(e = (i = o.next()).done); e = !0) {
                var a = i.value, s = !0, c = !1, f = void 0;
                try {
                    for (var u, l = a.conditionCells[Symbol.iterator](); !(s = (u = l.next()).done); s = !0) {
                        var h = u.value;
                        h.conditionCol === this && h.refreshVariableMenus()
                    }
                } catch (t) {
                    c = !0, f = t
                } finally {
                    try {
                        !s && l.return && l.return()
                    } finally {
                        if (c) throw f
                    }
                }
            }
        } catch (t) {
            n = !0, r = t
        } finally {
            try {
                !e && o.return && o.return()
            } finally {
                if (n) throw r
            }
        }
    }
}