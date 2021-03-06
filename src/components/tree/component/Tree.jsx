import '../css/tree.css';
import '../../../css/iconfont.css';
import TreeItem from './TreeItem.jsx';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Tree extends Component {
    render() {
        const {data, dispatch, draggable} = this.props;
        if (data) {
            return (
                <ul style={{paddingLeft: '20px'}}>
                    <TreeItem data={data} dispatch={dispatch} expandLevel={this.props.expandLevel}
                              draggable={draggable}/>
                </ul>
            );
        } else {
            return (<ul/>);
        }
    }
}

Tree.defaultProps = {expandLevel: 3};

function selector(state) {
    let data = state.data;
    return {data};
}

export default connect(selector)(Tree);