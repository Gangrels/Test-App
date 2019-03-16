import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { confOperations } from '../modules/conf';
import { peopleSelectors } from '../modules/people';
import PersonsInConfCard from './PersonsInConfCard.js';

class SelectedConfCard extends Component {
    state = {  }

    render() {
        const { event, connectDropTarget, isOver } = this.props;

        return connectDropTarget(
            <div style={{backgroundColor: isOver && 'green'}}>
                <h3>{event.title}</h3>
                <h4>{event.where}</h4>
                {this.getPeopleList()}
            </div>
        );
    }

    getPeopleList = () => {
        const { persons, event } = this.props;
        return <p>{persons.map((person, index) => <PersonsInConfCard key={index} event={event} {...person}/> )}</p>
    }
}

const spec = {
    drop(props, monitor, component) {
        props.addPersonToEvent(monitor.getItem().item.id, props.event.id)
      }
  };

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

export default connect(
    (state, {event}) => ({
        persons: peopleSelectors.peopleByIdsSelector(state, event.peopleIds)
    }),
    { addPersonToEvent : confOperations.addPersonToEvent }
)(DropTarget('person', spec, collect)(SelectedConfCard));