import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../css/iconfont.css';
import '../editor/context.standalone.css';
import '../editor/urule/ruleset.css';
import React from 'react';
import ReactDOM from 'react-dom';
import '../Remark.js';
import '../editor/common/jquery.utils.js';
import '../editor/common/URule.js';
import '../editor/common/contextMenu.js';
import '../editor/Math.uuid.js';
import '../editor/common/Context.js';
import '../editor/decisiontable/CellCondition.js';
import '../editor/decisiontable/Condition.js';
import '../editor/decisiontable/Join.js';
import '../editor/decisiontable/Connection.js';

import '../editor/common/ComparisonOperator.js';
import '../editor/common/ComplexArithmetic.js';
import '../editor/common/VariableValue.js';
import '../editor/common/ConstantValue.js';

import '../editor/urule/SimpleArithmetic.js';
import '../editor/common/InputType.js';
import '../editor/common/NextType.js';
import '../editor/common/Paren.js';
import '../editor/common/MethodParameter.js';
import '../editor/common/MethodAction.js';
import '../editor/common/ParameterValue.js';
import '../editor/common/MethodValue.js';
import '../editor/common/FunctionProperty.js';
import '../editor/common/FunctionParameter.js';
import '../editor/common/FunctionValue.js';
import '../editor/common/SimpleValue.js';

import '../editor/urule/ConfigActionDialog.js';
import '../editor/urule/ConfigConstantDialog.js';
import '../editor/urule/ConfigParameterDialog.js';
import '../editor/urule/ConfigVariableDialog.js';
import '../editor/urule/RuleProperty.js';
import KnowledgeTreeDialog from "../components/dialog/component/KnowledgeTreeDialog.jsx";
import ComplexScoreCardTable from "./ComplexScoreCardTable";

// 355.js
$(document).ready(function (e) {
    const saveButton = $("#saveButton");
    const saveButtonNewVersion = $("#saveButtonNewVersion");

    window._setDirty = function () {
        if (self._dirty) {
            return;
        }
        self._dirty = true;
        window._dirty = true;

        saveButton.html("<i class='rf rf-save'/> *保存");
        saveButton.prop("disabled", !1);
        saveButtonNewVersion.html("<i class='rf rf-savenewversion'/> *保存新版本");
        saveButtonNewVersion.prop("disabled", !1);
    };
    window.cancelDirty = function () {
        if (!self._dirty) {
            return;
        }
        self._dirty = false;
        window._dirty = false;
        saveButton.html("<i class='rf rf-save'/> 保存");
        saveButton.prop("disabled", !0);
        saveButtonNewVersion.html("<i class='rf rf-savenewversion'/> 保存新版本");
        saveButtonNewVersion.prop("disabled", !0);
    };

    ReactDOM.render(
        <KnowledgeTreeDialog/>,
        document.getElementById("dialogContainer")
    );

    new ComplexScoreCardTable($("#container"));
});

