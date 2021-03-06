/**
 * Created by jacky on 2016/6/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '../../components/grid/component/Grid.jsx';
import Splitter from '../../components/splitter/component/Splitter.jsx';
import * as action from '../action.js';
import PackageDialog from './PackageDialog.jsx';
import ItemDialog from './ItemDialog.jsx';
import * as event from '../event.js';
import KnowledgeTreeDialog from '../../components/dialog/component/KnowledgeTreeDialog.jsx';
import SimulatorPage from './SimulatorPage.jsx';
import ReteDiagramDialog from './ReteDiagramDialog.jsx';
import FlowDialog from './FlowDialog.jsx';
import ImportExcelDataDialog from './ImportExcelDataDialog.jsx';
import ExportExcelDataDialog from './ExportExcelDataDialog.jsx';
import BatchTestDialog from './BatchTestDialog.jsx';
import ChildListDialog from '../../components/grid/component/ChildListDialog.jsx';

class PackageEditor extends Component {
    render() {
        var containerWidth = $('#container').width();
        const {masterData, masterRowData, dispatch, project, packageConfig} = this.props, _this = this;
        const masterGridHeaders = [
            {id: 'm-id', name: 'id', label: '编码', filterable: true},
            {id: 'm-name', name: 'name', label: '名称', filterable: true, width: '160px'},
            {id: 'm-createDate', name: 'createDate', label: '创建日期', width: '150px', dateFormat: 'yyyy-MM-dd HH:mm:ss'}
        ];
        const slaveGridHeaders = [
            {id: 's-name', name: 'name', label: '名称', filterable: true, width: '200px'},
            {id: 's-path', name: 'path', label: '资源文件路径'},
            {id: 's-version', name: 'version', label: '版本', width: '70px'}
        ];

        const masterGridOperationCol = {
            width: '80px',
            operations: [
                {
                    label: '编辑',
                    icon: 'glyphicon glyphicon-edit',
                    style: {fontSize: '16px', color: '#d9534f', padding: '0px 4px', cursor: 'pointer'},
                    click: function (rowIndex, rowData) {
                        event.eventEmitter.emit(event.OPEN_CREATE_PACKAGE_DIALOG, {
                            create: false,
                            rowIndex,
                            rowData,
                            title: '编辑知识包'
                        });
                    }
                },
                {
                    label: '删除',
                    icon: 'glyphicon glyphicon-trash',
                    style: {fontSize: '16px', color: '#d9534f', padding: '0px 4px', cursor: 'pointer'},
                    click: function (rowIndex) {
                        bootbox.confirm('真的要删除当前记录？', function (result) {
                            if (!result) return;
                            _this.currentPackage = null;
                            dispatch(action.deleteMaster(rowIndex));
                            dispatch(action.loadSlaveData({}));
                        });
                    }
                }
            ]
        };

        const slaveGridOperationCol = {
            width: '90px',
            operations: [
                {
                    label: '编辑',
                    icon: 'glyphicon glyphicon-edit',
                    style: {fontSize: '16px', color: '#d9534f', padding: '0px 4px', cursor: 'pointer'},
                    click: function (rowIndex, rowData) {
                        event.eventEmitter.emit(event.OPEN_CREATE_PACKAGE_ITEM_DIALOG, {
                            create: false,
                            rowData,
                            rowIndex,
                            title: '编辑知识文件'
                        })
                    }
                },
                {
                    label: '删除',
                    icon: 'glyphicon glyphicon-trash',
                    style: {fontSize: '16px', color: '#d9534f', padding: '0px 10px', cursor: 'pointer'},
                    click: function (rowIndex) {
                        bootbox.confirm('真的要删除当前记录？', function (result) {
                            if (!result) return;
                            dispatch(action.deleteSlave(rowIndex));
                        })
                    }
                }
            ]
        };
        return (
            <div>
                <PackageDialog dispatch={dispatch}/>
                <SimulatorPage/>
                <ItemDialog dispatch={dispatch} project={this.props.project}/>
                <KnowledgeTreeDialog/>
                <ReteDiagramDialog/>
                <ImportExcelDataDialog/>
                <ExportExcelDataDialog/>
                <FlowDialog/>
                <BatchTestDialog/>
                <ChildListDialog/>
                <Splitter orientation='vertical' position='50%' limit='300'>
                    <div>
                        <div style={{margin: '2px'}}>
                            <div className="btn-group btn-group-sm" style={{margin: '2px'}}>
                                <button className="btn btn-primary" type="button" onClick={(e) => {
                                    event.eventEmitter.emit(event.OPEN_CREATE_PACKAGE_DIALOG, {
                                        create: true,
                                        title: '添加知识包'
                                    });
                                }}><i className="glyphicon glyphicon-plus-sign"/> 添加包
                                </button>
                            </div>
                            <div className="btn-group btn-group-sm" style={{margin: '2px'}}>
                                <button className="btn btn-success" type="button" onClick={(e) => {
                                    dispatch(action.save(true, project))
                                }}><i className="glyphicon glyphicon-floppy-disk"/> 保存新版本
                                </button>
                            </div>
                            <div className="btn-group btn-group-sm" style={{margin: '2px'}}>
                                <button className="btn btn-info" type="button" onClick={(e) => {
                                    const projectArray = project.split(':');
                                    if (projectArray.length !== 2) {
                                        bootbox.alert("请先打开带版本的知识包文件,再进行发起审批操作");
                                        return
                                    }
                                    // const ce = window.parent.componentEvent;
                                    // ce.eventEmitter.emit(ce.SHOW_LOADING);
                                    action.startApprovalProcess(projectArray[0], projectArray[1], function (result) {
                                        bootbox.alert("发起审批成功");
                                    })
                                }}><i className="glyphicon glyphicon-send"/> 发起审批
                                </button>
                            </div>
                            <div className="btn-group btn-group-sm" style={{margin: '2px'}}>
                                <button className="btn btn-warning" type="button" onClick={() => {
                                    if (this.currentPackage && this.currentPackage.resourceItems && this.currentPackage.resourceItems.length > 0) {
                                        let files = '', i = 0;
                                        for (let item of this.currentPackage.resourceItems) {
                                            if (!item.path) {
                                                bootbox.alert('当前知识包有未定义具体文件的项目，不能进行此操作！');
                                                return;
                                            }
                                            let path = item.path;
                                            if (item.version !== 'LATEST') {
                                                path += ":" + item.version;
                                            }
                                            if (i > 0) {
                                                files += ';';
                                            }
                                            files += path;
                                            i++;
                                        }
                                        action.refreshKnowledgeCache(project, this.currentPackage.id, files);
                                    } else {
                                        bootbox.alert('请先选择一个知识包！');
                                    }

                                }}><i className="glyphicon glyphicon-cloud-upload"/> 发布当前知识包
                                </button>
                                <button className="btn btn-danger" type="button" onClick={() => {
                                    if (this.currentPackage) {
                                        const ce = window.parent.componentEvent;
                                        ce.eventEmitter.emit(ce.SHOW_LOADING);
                                        event.eventEmitter.emit(event.OPEN_SIMULATOR_DIALOG, this.currentPackage);
                                    } else {
                                        bootbox.alert('请先选择一个知识包！');
                                    }
                                }}><i className="glyphicon glyphicon-flash"/> 仿真测试
                                </button>
                            </div>
                            <div className="btn-group btn-group-sm" style={{margin: '2px'}}>
                                <kbd>使用中版本: {packageConfig.version}</kbd>
                            </div>
                        </div>

                        <Grid headers={masterGridHeaders} dispatch={dispatch} rows={masterData}
                              operationConfig={masterGridOperationCol} rowClick={(rowData) => {
                            this.currentPackage = rowData;
                            setTimeout(function () {
                                dispatch(action.loadSlaveData(rowData));
                            }, 100);
                        }}/>
                    </div>
                    <div>
                        <div style={{margin: '2px'}}>
                            <div className="btn-group btn-group-sm" style={{margin: '2px'}}>
                                <button className="btn btn-primary" type="button" onClick={(e) => {
                                    if (masterRowData.resourceItems) {
                                        event.eventEmitter.emit(event.OPEN_CREATE_PACKAGE_ITEM_DIALOG, {
                                            create: true,
                                            title: "添加包[" + masterRowData.name + "]中的知识文件"
                                        })
                                    } else {
                                        bootbox.alert('请先选择一个知识包！');
                                    }
                                }}><i className="fa fa-plus-square"/> 添加文件
                                </button>
                            </div>
                        </div>
                        <Grid headers={slaveGridHeaders} dispatch={dispatch} operationConfig={slaveGridOperationCol}
                              rows={masterRowData.resourceItems || []}/>
                    </div>
                </Splitter>
            </div>
        );
    }
}

function select(state) {
    return {
        masterData: state.master.data || [],
        masterRowData: state.slave.data || {},
        packageConfig: state.config.data || {}
    };
}

export default connect(select)(PackageEditor);