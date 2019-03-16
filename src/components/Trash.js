import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { confOperations } from '../modules/conf'

class Trash extends Component {
    state = {  }
    render() {
        const {connectDropTarget} = this.props;

        return connectDropTarget(
            <div
                style={{width: '100px', height: '100px', backgroundColor: 'rgba(0,255,0,.2)',right: '0',position: 'absolute'}}>
                Trash
            </div>
        );
    }
}

const spec = {
    drop(props, monitor, component) {
        props.deletePersonFromEvent(monitor.getItem().id, monitor.getItem().event)
      }
  };

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

export default connect(
    null,
    {
        deletePersonFromEvent : confOperations.deletePersonFromEvent
    }
)(DropTarget('personInConf', spec, collect)(Trash));
