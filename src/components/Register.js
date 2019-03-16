import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import * as EmailValidator from 'email-validator';
import FormWithError from './FormWithError';

class Register extends Component {

    render() {
        return (
            <div>
                <h1>Register</h1>
                    <form onSubmit={this.handleWithReset}>
                        <div>
                            <label htmlFor="email">E-mail </label>
                            <Field name="email" component={FormWithError} type="text" />
                        </div>
                        <div>
                            <label htmlFor="password">Password </label>
                            <Field name="password" component={FormWithError} type="password" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
            </div>
        );
    }

    handleWithReset = (e) => {
        const { handleSubmit, reset } = this.props;

        e.preventDefault();
        handleSubmit();
        reset();
    }
}

const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'E-mail required'
    } else if (!EmailValidator.validate(values.email)) {
      errors.email = 'E-mail must be valid'
    }

    if (!values.password) {
        errors.password = 'Password required'
      } else if (values.password.length < 6) {
        errors.password = 'Password must be bigger than 6 symbols'
      }

    return errors
  }

Register = reduxForm({
    form: 'register',
    validate
  })(Register)

export default Register;