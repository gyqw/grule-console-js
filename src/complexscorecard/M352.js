import RowAction from "./RowAction";

// 352.js
export default class M352 {
    constructor(t) {
        var n = this;
        return r.complexTable = t, r.conditionCol = n, r.conditionCol.width = 200, r.variableCategoryList = [], r.parameterList = [], r.init(t), r
    }

    init(t) {
        this.td.css("width", "200px");
        var e = $('<div><i class="glyphicon glyphicon-filter"/></div>');
        this.td.append(e), this.labelContainer = $('<span style="color: #727171">请选择参数或变量</span>'), e.append(this.labelContainer), window._VariableValueArray.push(this), window._ParameterValueArray.push(this), this.initMenu([]), window._uruleEditorVariableLibraries && this.initMenu(window._uruleEditorVariableLibraries), window._uruleEditorParameterLibraries && this.initMenu(window._uruleEditorParameterLibraries, 1)
    }

    insertColumn(t, e) {
        var n = new RowAction(t);
        n.setRefHeaderCell(this), n.setBefore(e), t.addConditionColumn(n), window._setDirty()
    }

    deleteColumn(t) {
        if (t.headerRow.conditionHeaders.length < 2) bootbox.alert("条件列至少要有一列！"); else {
            var e = window._VariableValueArray.indexOf(this);
            e > -1 && window._VariableValueArray.splice(e, 1);
            var n = t.headerRow.conditionHeaders.indexOf(this);
            t.headerRow.conditionHeaders.splice(n, 1), this.td.remove();
            var r = !0, i = !1, o = void 0;
            try {
                for (var a, s = t.contentRows[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
                    var c = a.value, f = null, u = !0, l = !1, h = void 0;
                    try {
                        for (var d, p = c.conditionCells[Symbol.iterator](); !(u = (d = p.next()).done); u = !0) {
                            var b = d.value;
                            if (b.conditionCol === this.conditionCol) {
                                f = b;
                                break
                            }
                        }
                    } catch (t) {
                        l = !0, h = t
                    } finally {
                        try {
                            !u && p.return && p.return()
                        } finally {
                            if (l) throw h
                        }
                    }
                    f && (n = c.conditionCells.indexOf(f), c.conditionCells.splice(n, 1), f.td.remove())
                }
            } catch (t) {
                i = !0, o = t
            } finally {
                try {
                    !r && s.return && s.return()
                } finally {
                    if (i) throw o
                }
            }
            n = t.conditionColumns.indexOf(this.conditionCol), t.conditionColumns.splice(n, 1), window._setDirty()
        }
    }

    updateLabel(t) {
        if (t.variableCategory) {
            var e = this.conditionCol;
            e.variableCategory = t.variableCategory, e.variables = t.variables, this.labelContainer.html(e.variableCategory), this.labelContainer.css("color", "#1d1d1d"), "参数" === this.variableCategory ? this.labelContainer.css("font-weight", "bold") : this.labelContainer.css("font-weight", "normal")
        } else this.labelContainer.html('<span style="color: #727171">请选择参数或变量</span>')
    }

    initMenu(t, e) {
        var n = this, r = this.conditionCol, i = function (t) {
            if (r.variableCategory = t.label, n.labelContainer.html(r.variableCategory), n.labelContainer.css("color", "#1d1d1d"), "参数" === t.label) {
                n.labelContainer.css("font-weight", "bold");
                var e = [], i = !0, o = !1, a = void 0;
                try {
                    for (var s, c = (t.variables || [])[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                        var f = s.value;
                        e = e.concat(f)
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
                r.variables = e
            } else n.labelContainer.css("font-weight", "normal"), r.variables = t.variables || [];
            r.refreshConditionCellVariableMenus(t.variables)
        }, o = [];
        e ? (this.parameterList = t, o = (o = this.buildVariableMenus(this.variableCategoryList, i)).concat(this.buildParameterMenus(t, i))) : (this.variableCategoryList = t, o = (o = this.buildVariableMenus(t, i)).concat(this.buildParameterMenus(this.parameterList, i)));
        var a = this.buildMenuConfig(o), s = new URule.menu.Menu(a);
        this.td.contextmenu(function (t) {
            s.show(t)
        })
    }

    buildVariableMenus(t, e) {
        var n = [];
        if (0 === t.length) return n;
        var r = !0, i = !1, o = void 0;
        try {
            for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
                var c = a.value, f = !0, u = !1, l = void 0;
                try {
                    for (var h, d = c[Symbol.iterator](); !(f = (h = d.next()).done); f = !0) {
                        var p = h.value;
                        n.push({
                            label: p.name,
                            variables: p.variables,
                            icon: "glyphicon glyphicon-tasks",
                            onClick: e
                        })
                    }
                } catch (t) {
                    u = !0, l = t
                } finally {
                    try {
                        !f && d.return && d.return()
                    } finally {
                        if (u) throw l
                    }
                }
            }
        } catch (t) {
            i = !0, o = t
        } finally {
            try {
                !r && s.return && s.return()
            } finally {
                if (i) throw o
            }
        }
        return n
    }

    buildParameterMenus(t, e) {
        var n = [];
        return 0 === t.length ? n : (n.push({
            label: "参数",
            variables: t,
            icon: "glyphicon glyphicon-th-list",
            onClick: e
        }), n)
    }

    buildMenuConfig(t) {
        var e = this.complexTable, n = this, r = {
            menuItems: [{
                label: "插入条件列",
                icon: "glyphicon glyphicon-filter",
                subMenu: {
                    menuItems: [{
                        label: "前",
                        icon: "glyphicon glyphicon-chevron-left",
                        onClick: function () {
                            n.insertColumn(e, !0)
                        }
                    }, {
                        label: "后", icon: "glyphicon glyphicon-chevron-right", onClick: function () {
                            n.insertColumn(e, !1)
                        }
                    }]
                }
            }, {
                label: "删除当前条件列", icon: "glyphicon glyphicon-minus-sign", onClick: function () {
                    a.MsgBox.confirm("真的要删除当前条件列？", function () {
                        n.deleteColumn(e)
                    })
                }
            }]
        };
        return r.menuItems = r.menuItems.concat(t), r
    }
}
