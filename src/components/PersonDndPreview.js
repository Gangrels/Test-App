import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelectors } from '../modules/people';

class PersonDndPreview extends Component {
  static propTypes = {}

  render() {
    const { person } = this.props
    return <div style={{backgroundColor: 'rgba(0, 0, 255, 0.2)', width: '200px'}}>
      {person ? person.email : null}
    </div>
  }
}

export default connect((state, ownProps) => ({
  person: peopleSelectors.personSelector(state, ownProps)
}))(PersonDndPreview)