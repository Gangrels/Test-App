import React, { Component } from 'react';
import {connect} from 'react-redux';
import { peopleSelectors } from '../modules/people';
import PersonCard from './PersonCard';

class FewPeople extends Component {
    state = {  }

    componentDidMount = () => {
        const { getPeople } = this.props;
        getPeople();
      }

    render() {
        const { people } = this.props;

        return (
            <div>
                {
                    people
                        ?
                        people.map((person, index) => <PersonCard person={person} key={person.id}/>)
                        :
                        <b>Loading...</b>
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        people: peopleSelectors.users(state)
    })
)(FewPeople);