import React, { Component } from 'react';

class FormWithError extends Component {
    render() {
        const { input, meta: {touched, error}, ...rest } = this.props
        const errorText = error && touched && <p style={{color: 'red'}}>{error}</p>

        return (
            <div>
                <input {...input} {...rest}></input>
                {errorText}
            </div>
        );
    }
}

export default FormWithError;