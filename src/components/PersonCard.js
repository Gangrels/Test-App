import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './PersonDndPreview'

class PersonCard extends Component {
    state = {  }

    componentDidMount() {
        this.props.dragPreview(getEmptyImage())
    }

    render() {
        const { person, isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <p>
                <b>{person.firstName}</b><br/>
                <i>{person.email}</i>
                {isDragging && ' (and I am being dragged now)'}
            </p>
        );
    }
}

const personSource = {
    beginDrag(props, monitor, component) {
        const item = { id: props.person.id };

        return {
            item,
            DragPreview
        }
      }
  };

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        dragPreview: connect.dragPreview()
    };
}

export default DragSource('person', personSource, collect)(PersonCard);