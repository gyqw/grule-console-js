/**
 * Created by jacky on 2016/6/23.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as event from '../event.js';
import * as action from '../action.js';
import Grid from '../../components/grid/component/Grid.jsx';
import CommonDialog from '../../components/dialog/component/CommonDialog.jsx';
import RuleFlowDesigner from "../../flow/RuleFlowDesigner";
import StartTool from "../../flow/StartTool";
import RuleTool from "../../flow/RuleTool";
import PackageTool from "../../flow/PackageTool";
import ActionTool from "../../flow/ActionTool";
import ScriptTool from "../../flow/ScriptTool";
import DecisionTool from "../../flow/DecisionTool";
import ForkTool from "../../flow/ForkTool";
import JoinTool from "../../flow/JoinTool";

export default class FlowDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {flows: null};
    }

    componentDidMount() {
        event.eventEmitter.on(event.OPEN_FLOW_DIALOG, (config) => {
            this.rowData = null;
            $(ReactDOM.findDOMNode(this)).modal('show');
            var files = config.files;
            var data = config.data;
            action.loadFlows(files, function (result) {
                this.setState({files, data, flows: result});
                const ce = window.parent.componentEvent;
                ce.eventEmitter.emit(ce.HIDE_LOADING);
            }.bind(this));
        });
        event.eventEmitter.on(event.HIDE_FLOW_DIALOG, () => {
            $(ReactDOM.findDOMNode(this)).modal('hide');
        });
    }

    componentWillUnmount() {
        event.eventEmitter.removeAllListeners(event.OPEN_FLOW_DIALOG);
        event.eventEmitter.removeAllListeners(event.HIDE_FLOW_DIALOG);
    }

    render() {
        const containerId = 'div-flow';
        const formId = 'export-test-excel-form';

        const headers = [
            {id: 'f-id', name: 'id', label: '决策流ID', filterable: true},
        ];
        const {files, data} = this.state;
        const gridOperationCol = {
            width: '70px',
            operations: [
                {
                    label: '测试',
                    icon: 'glyphicon glyphicon-flash',
                    style: {fontSize: '20px', color: '#d9534f', padding: '0px 4px', cursor: 'pointer'},
                    click: function (rowIndex, rowData) {
                        const ce = window.parent.componentEvent;
                        ce.eventEmitter.emit(ce.SHOW_LOADING);
                        var flowId = rowData.id;
                        action.testFlow(files, data, flowId, function (result) {
                            event.eventEmitter.emit(event.REFRESH_SIMULATOR_DATA, result);
                            ce.eventEmitter.emit(ce.HIDE_LOADING);
                            bootbox.alert("决策流[" + flowId + "]执行完成，" + result.info);
                        });
                    }
                },
                {
                    label: '批量测试',
                    icon: 'glyphicon glyphicon-send',
                    style: {fontSize: '20px', color: '#d9534f', padding: '0px 4px', cursor: 'pointer'},
                    click: function (rowIndex, rowData) {
                        const ce = window.parent.componentEvent;
                        ce.eventEmitter.emit(ce.SHOW_LOADING);
                        var flowId = rowData.id;
                        action.doBatchTest(files, function (testResult) {
                            ce.eventEmitter.emit(ce.HIDE_LOADING);
                            // bootbox.alert("决策流[" + flowId + "]执行完成，" + result.info);

                            // 展示流程图
                            $.ajax({
                                url: window._server + '/ruleflowdesigner/loadFlowDefinition',
                                data: {file: files.split(':')[1].split(',')[0]},
                                success: function (flowJson) {
                                    $('#' + containerId).html('');

                                    const designer = new RuleFlowDesigner(containerId);
                                    delete flowJson.libraries;
                                    designer.addTool(new StartTool());
                                    designer.addTool(new RuleTool());
                                    designer.addTool(new PackageTool());
                                    designer.addTool(new ActionTool());
                                    designer.addTool(new ScriptTool());
                                    designer.addTool(new DecisionTool());
                                    designer.addTool(new ForkTool());
                                    designer.addTool(new JoinTool());

                                    designer.buildDesigner();

                                    $('.fd-toolbar').hide();
                                    $('.fd-property-panel').hide();
                                    $('.fd-node-toolbar').hide();

                                    for (const index in flowJson.nodes) {
                                        const num = testResult[flowJson.nodes[index].name];
                                        if (num != null) {
                                            flowJson.nodes[index].text = flowJson.nodes[index].name + ' (' + num + ')';
                                        }
                                    }
                                    designer.fromJson(flowJson);
                                    document.getElementById(formId).submit();
                                },
                                error: function () {
                                    alert(`加载决策流${files}失败！`);
                                }
                            });
                        });
                    }
                }
            ]
        };
        let body = (<div></div>);
        if (this.state.flows) {
            body = (
                <div>
                    <Grid headers={headers} operationConfig={gridOperationCol} rows={this.state.flows}/>
                    <div id={containerId}></div>
                    <form id={formId} method="post"
                          action={window._server + '/packageeditor/exportBatchTestExcel'}>
                    </form>
                </div>
            );
        }
        const buttons = [
            {
                name: '关闭',
                className: 'btn btn-primary',
                icon: 'fa fa-close',
                click: function () {
                    event.eventEmitter.emit(event.HIDE_FLOW_DIALOG);
                }
            }
        ];

        return (
            <CommonDialog title='测试决策流' body={body} buttons={buttons}/>
        );
    }
}