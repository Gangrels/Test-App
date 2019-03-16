import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import * as EmailValidator from 'email-validator';
import FormWithError from './FormWithError';

class LogInForm extends Component {


    render() {
        const {handleSubmit, err} = this.props;

        return (
            <div>
                <h1>Login</h1>
                    {err && <b>{err.message}</b>}
                    <form onSubmit={handleSubmit}>
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

export default reduxForm({
    form: 'login',
    validate
  })(LogInForm);