import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import { connect } from 'react-redux';
import { peopleOperations } from '../modules/people';

const layerStyle = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: 'none'
  }

class CustomDragLayer extends Component {
    state = {  }

    componentDidUpdate(){
      const {dragoperation, isDragging} = this.props;
      dragoperation(isDragging);
    }

    getPreview() {
        const { item, offset } = this.props
        if (!item || !item.DragPreview || !offset) return null

        const style = {
          transform: `translate(${offset.x}px,${offset.y}px)`
        }

        return (
          <div style={style}>
            <item.DragPreview {...item} />
          </div>
        )
    }

    render() {
        return (
            <div style={layerStyle}>{this.getPreview()}</div>
        );
    }
}

const collect = (monitor) => {
    return {
        item: monitor.getItem(),
        offset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    }
}

export default connect(
  null,
  {dragoperation: peopleOperations.peopleIsDraggingRequest}
  )(DragLayer(collect)(CustomDragLayer));