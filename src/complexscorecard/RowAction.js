// 281.js
export default class RowAction {
    constructor(t) {
        this.complexTable = t;
        this.actionType = 0;
    }

    fetchConditionCell(t, e) {
        var n = this._findConditionCell(t, e);
        if (n) return n;
        for (var r = this.complexTable.contentRows, i = r.indexOf(t) - 1; i >= 0; i--) {
            var o = r[i];
            if (n = this._findConditionCell(o, e)) break
        }
        return n

    }

    _findConditionCell(t, e) {
        var n = null, r = t.conditionCells, i = !0, o = !1, a = void 0;
        try {
            for (var s, c = r[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                var f = s.value;
                if (f.conditionCol === e) {
                    n = f;
                    break
                }
            }
        } catch (t) {
            o = !0;
            a = t;
        } finally {
            try {
                !i && c.return && c.return()
            } finally {
                if (o) throw a
            }
        }
        return n
    }

    fetchActionCell(t, e) {
        var n = this._findActionCell(t, e);
        if (n) return n;
        for (var r = this.complexTable.contentRows, i = r.indexOf(t) - 1; i >= 0; i--) {
            var o = r[i];
            if (n = this._findActionCell(o, e)) break
        }
        return n
    }

    _findActionCell(t, e) {
        var n = null, r = t.actionCells, i = !0, o = !1, a = void 0;
        try {
            for (var s, c = r[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                var f = s.value;
                if (f.contentRow === t && f.actionCol === e) {
                    n = f;
                    break
                }
            }
        } catch (t) {
            o = !0, a = t
        } finally {
            try {
                !i && c.return && c.return()
            } finally {
                if (o) throw a
            }
        }
        return n
    }

    setRefHeaderCell(t) {
        this.refHeaderCell = t, this.refHeaderCellIndex = this.complexTable.headerRow.conditionHeaders.indexOf(t), -1 === this.refHeaderCellIndex && (this.refHeaderCellIndex = this.complexTable.headerRow.actionHeaders.indexOf(t))
    }

    setBefore(t) {
        this.before = t
    }

    setRefConditionCell(t) {
        this.refConditionCell = t
    }

    setActionType(t) {
        this.actionType = t
    }

    setRowCells(t) {
        this.rowCells = t
    }

    setWidth(t) {
        this.width = t
    }

    setCustomActionHeaderLabel(t) {
        this.customActionHeaderLabel = t
    }

}
