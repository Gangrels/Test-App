import React, { Component } from 'react';
import './App.css';
import { Route, NavLink } from "react-router-dom";
import LogInForm from './components/LogInForm'
import Register from './components/Register'
import AdminPage from './components/AdminPage'
import People from './components/People'
import Conf from './components/Conf'
import ProtectedRoute from './components/ProtectedRoute'
import {authOperations, authSelectors} from './modules/auth'
import {peopleOperations, peopleSelectors} from './modules/people'
import {connect} from 'react-redux'
import './config'

class App extends Component {
  render() {
    const {
      authError,
      getPeople,
      allPeople,
      loadingPeople,
      loadedPeople,
      isDragging,
      unmountPeople
    } = this.props;

    return (
        <div>
          <ul style={{listStyle: 'none'}}>
            <li><NavLink to='/admin'>Admin</NavLink></li>
            <li><NavLink to='/login'>Log In</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li>
            <li><NavLink to='/people'>People</NavLink></li>
            <li><NavLink to='/conf'>Conf</NavLink></li>
          </ul>

          <ProtectedRoute path="/admin" render={() => <AdminPage/>} />
          <Route path="/login" render = {()=><LogInForm onSubmit={this.handleSignIn} err={authError}/>}/>
          <Route path="/register" render = {()=><Register onSubmit={this.handleSignUp}/>} />
          <Route path="/people" render = {()=>
            <People
              onSubmit={this.handlePeople}
              getPeople={getPeople}
              allPeople={allPeople}
              loadingPeople={loadingPeople}
              loadedPeople={loadedPeople}
              unmountPeople={unmountPeople}
            />}
          />
          <Route path="/conf" render = {()=>
            <Conf
              getPeople={getPeople}
              isDragging={isDragging}
              unmountPeople={unmountPeople}
            />}
          />
        </div>
    );
  }

  handleSignIn = ({ email, password }) => this.props.logIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
  handlePeople = (people) => this.props.addPeople(people)
  getConfs = () => this.props.getConfs()
}

export default connect(
  state => {
    return {
      authError: authSelectors.checkError(state),
      allPeople: peopleSelectors.users(state),
      loadingPeople: peopleSelectors.loadingPeople(state),
      loadedPeople: peopleSelectors.loadedPeople(state),
      isDragging: peopleSelectors.isDragging(state),
    }
  },
  {
    logIn: authOperations.logInRequest,
    signUp: authOperations.registerRequest,
    addPeople: peopleOperations.addPeopleRequest,
    getPeople: peopleOperations.getPeopleRequest,
    unmountPeople: peopleOperations.peopleUnmountRequest,
  }
  )(App);
