import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormWithError from './FormWithError';
import * as EmailValidator from 'email-validator';
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';

export class People extends Component {
    state = {  }

    componentDidMount = () => {
      const { getPeople } = this.props;
      getPeople();
    }

    componentWillUnmount = () => {
      const { unmountPeople } = this.props;
      unmountPeople();
    }

    render() {

      return (
            <div>
              <div>
                <h1 className='test-component'>People</h1>
                    <form onSubmit={this.handleWithReset}>
                        <div>
                            <label htmlFor="email">E-mail </label>
                            <Field name="email" component={FormWithError} type="text" />
                        </div>
                        <div>
                            <label htmlFor="firstName">FirstName </label>
                            <Field name="firstName" component={FormWithError} type="text" />
                        </div>
                        <div>
                            <label htmlFor="lastName">LastName </label>
                            <Field name="lastName" component={FormWithError} type="text" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
              </div>
              <div>
                <hr/>
                {this.getForm()}
              </div>
            </div>
        );
    }

    getForm = () => {
      const { allPeople, loadedPeople } = this.props;


      return (
        <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            rowCount={loadedPeople ? allPeople.length : allPeople.length + 1}
            loadMoreRows={this.loadMoreRows}
        >
            {({ onRowsRendered, registerChild }) => (
                <Table
                ref={registerChild}
                rowCount={allPeople.length}
                overscanRowCount={1}
                width={600}
                height={300}
                headerHeight={20}
                rowHeight={30}
                rowGetter={this.rowGetter}
                onRowsRendered={onRowsRendered}
                rowClassName="test__event_table_row"
                >
                    <Column label='Email' dataKey='email' width={150} />
                    <Column label='FirstName' dataKey='firstName' width={150} />
                    <Column label='LastName' dataKey='lastName' width={150} />
                </Table>
            )}
        </InfiniteLoader>
      )
    }

    rowGetter = ({ index }) => this.props.allPeople[index];

    loadMoreRows = () => {
        const { getPeople } = this.props;
        getPeople();
    }

    isRowLoaded = ({index}) => index < this.props.allPeople.length;

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

    if (!values.firstName) {
        errors.firstName = 'FirstName required'
      } else if (values.firstName.length < 3) {
        errors.firstName = 'FirstName must be bigger than 3 symbols'
      }

    if (!values.lastName) {
        errors.lastName = 'LastName required'
      } else if (values.lastName.length < 3) {
        errors.lastName = 'LastName must be bigger than 3 symbols'
      }

    return errors
  }


export default reduxForm({
    form: 'people',
    validate
  })(People);
