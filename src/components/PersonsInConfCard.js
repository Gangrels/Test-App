import React, { Component } from 'react';
import { DragSource } from 'react-dnd';


class PersonsInConfCard extends Component {
    state = {  }
    render() {
        const {email, connectDragSource, isDragging} = this.props
        const cardStyle = isDragging ? {backgroundColor: 'rgba(195,14,74,.2)'} : null;

        return connectDragSource(
            <span style={cardStyle}>
                {email};
            </span>
        );
    }
}

const source = {
    beginDrag(props, monitor, component) {
        return {
            id: props.id,
            event: props.event
        }
      }
  };

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

export default DragSource('personInConf', source, collect)(PersonsInConfCard);