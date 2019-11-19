import React from 'react';
import ReactDOM from 'react-dom';
import KnowledgeTreeDialog from "../components/dialog/component/KnowledgeTreeDialog.jsx";

$(document).ready(function () {
    window._setDirty = function () {
        if (self._dirty) {
            return;
        }
        self._dirty = true;
        window._dirty = true;
        $("#saveButton").html("<i class='rf rf-save'></i> *保存");
        $("#saveButton").prop("disabled", !1);
        $("#saveButtonNewVersion").html("<i class='rf rf-savenewversion'></i> *保存新版本");
        $("#saveButtonNewVersion").prop("disabled", !1);
    };
    window.cancelDirty = function () {
        if (!self._dirty) {
            return;
        }
        self._dirty = false;
        window._dirty = false;
        $("#saveButton").html("<i class='rf rf-save'></i> 保存");
        $("#saveButton").prop("disabled", !0);
        $("#saveButtonNewVersion").html("<i class='rf rf-savenewversion'></i> 保存新版本");
        $("#saveButtonNewVersion").prop("disabled", !0);
    };

    ReactDOM.render(
        <div>
            <KnowledgeTreeDialog/>
        </div>,
        document.getElementById("dialogContainer")
    );
});

