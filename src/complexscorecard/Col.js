// 319.js
export default class Col {
    buildColResizeTrigger() {
        this.resizeTrigger = $(`<span style="cursor: col-resize;width: 3px;height: 20px;float: right;border: solid 2px transparent;">&nbsp;</span>`);
        return this.resizeTrigger;
    }

    bindColResize() {
        let resizeStart = false, resizeTargetCol, resizeStartX, resizeStartWidth;
        const _this = this;

        this.resizeTrigger.mouseover(function () {
            $(this).css("border", "solid 2px #999")
        });
        this.resizeTrigger.mouseout(function () {
            $(this).css("border", "solid 2px transparent")
        });
        this.resizeTrigger.mousedown(function (e) {
            resizeTargetCol = $(this).parent();
            resizeStart = true;
            resizeStartX = e.pageX;
            resizeStartWidth = resizeTargetCol.width();
            e.preventDefault();
        });

        $(document).mousemove(function (e) {
            if (resizeStart) {
                const newWidth = resizeStartWidth + (e.pageX - resizeStartX);
                _this.actionCol ? _this.actionCol.width = newWidth : _this.conditionCol.width = newWidth;
                resizeTargetCol.width(newWidth);
                _this._rebuildHighLightDiv(e);
                e.preventDefault();
            }
        });
        $(document).mouseup(function (e) {
            resizeStart = false;
            window._setDirty();
        })
    }

    _rebuildHighLightDiv(e) {
        const highlightDiv = e.getHighlightDiv();
        const currentTD = e.currentTD;

        if (currentTD) {
            const clientWidth = currentTD.get(0).clientWidth;
            const clientHeight = currentTD.get(0).clientHeight;
            highlightDiv.css({width: clientWidth + "px", height: clientHeight + "px"})
        }
    }
}