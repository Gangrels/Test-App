import React, { Component } from 'react';
import { Route } from "react-router-dom";
import {connect} from 'react-redux'
import { authSelectors} from '../modules/auth'

class ProtectedRoute extends Component {
    state = {  }
    render() {
        const { ...rest} = this.props;

        return (
            <Route {...rest} render={this.protected}/>
        );
    }

    protected = () => {
        const { render: Comp, user} = this.props;

        if(!user) return <h1>You are not logged in</h1>
        return <Comp/>
    }
}

export default connect(
    state => {
        return {
            user: authSelectors.checkUser(state)
        }
    }
)(ProtectedRoute);