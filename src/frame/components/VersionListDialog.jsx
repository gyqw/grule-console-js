/**
 * Created by Jacky.gao on 2016/7/28.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CommonDialog from '../../components/dialog/component/CommonDialog.jsx';
import * as event from '../event.js';
import * as action from '../action.js';
import * as componentEvent from '../../components/componentEvent.js';
import {formatDate} from '../../Utils.js';

export default class VersionListDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', list: []};
    }

    componentDidMount() {
        event.eventEmitter.on(event.OPEN_FILE_VERSION_DIALOG, config => {
            $(ReactDOM.findDOMNode(this)).modal('show');
            const {list, data} = config, file = data.fullPath;
            this.setState({title: `${file}文件版本列表`, list, data});
        });
        event.eventEmitter.on(event.CLOSE_FILE_VERSION_DIALOG, () => {
            $(ReactDOM.findDOMNode(this)).modal('hide');
        });
    }

    componentWillUnmount() {
        event.eventEmitter.removeAllListeners(event.OPEN_FILE_VERSION_DIALOG);
        event.eventEmitter.removeAllListeners(event.CLOSE_FILE_VERSION_DIALOG);
    }

    render() {
        const {list, data} = this.state;
        const body = (
            <table className="table table-bordered table-hover" style={{tableLayout: 'fixed',wordBreak: 'break-all'}}>
                <thead>
                <tr>
                    <td style={{width: '80px'}}>版本号</td>
                    <td>版本描述</td>
                    <td>修改前</td>
                    <td>修改后</td>
                    <td>审批状态</td>
                    <td style={{width: '120px'}}>创建人</td>
                    <td style={{width: '160px'}}>创建时间</td>
                    <td style={{width: '100px'}}>操作</td>
                </tr>
                </thead>
                <tbody>
                {list.map(function (row, index) {
                    let auditStatusStr = "";
                    switch (row.auditStatus) {
                        case "1":
                            auditStatusStr = "通过";
                            break;
                        case "0":
                            auditStatusStr = "拒绝";
                            break;
                        case "2":
                            auditStatusStr = "审批中";
                            break;
                    }
                    return (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.comment}</td>
                            <td>{row.beforeComment}</td>
                            <td>{row.afterComment}</td>
                            <td>{auditStatusStr}</td>
                            <td>{row.createUser}</td>
                            <td>{formatDate(row.createDate, 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td>
                                <button type="button" className="btn btn-link" style={{padding: '0'}} onClick={() => {
                                    let url = '.' + data.editorPath + "?file=" + data.fullPath + ':' + row.name;
                                    let fullPath = data.fullPath + ':' + row.name;
                                    let name = data.name + ':' + row.name;
                                    if (data.type === 'resourcePackage') {
                                        const packageName = data.fullPath.split("/")[1];
                                        url = '.' + data.editorPath + "?file=" + packageName + '.rp:' + row.name;
                                        fullPath = '/' + packageName + ':' + row.name;
                                        name = data.name;
                                    }

                                    const config = {
                                        id: data.id + ':' + row.name,
                                        name: name,
                                        fullPath: fullPath,
                                        path: url,
                                        active: true
                                    };
                                    componentEvent.eventEmitter.emit(componentEvent.TREE_NODE_CLICK, config);
                                }}>打开
                                </button>
                                <button type="button" className="btn btn-link" style={{padding: '0', marginLeft: '8px'}}
                                        onClick={() => {
                                            const fullPath = data.fullPath + ':' + row.name;
                                            action.seeFileSource({fullPath});
                                        }}>源码
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
        return (<CommonDialog body={body} title={this.state.title} buttons={[]} large={true}/>);
    }
}