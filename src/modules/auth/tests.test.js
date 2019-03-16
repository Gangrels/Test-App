import { call, put } from 'redux-saga/effects'
import reducer from "./reducers";
import actions from "./actions";
import operations, { registerSaga, loginSaga} from "./operations";
import types from './types.js';
import api from '../../utils/api'

describe('auth tests', ()=> {
    describe('login test', ()=> {
        it('should login person', ()=> {
            const person = {
                login: '123456.1@rambler.ua',
                password: 'qweqwe'
            }

            const action = operations.logInRequest(person.login, person.password);

            const loginPerson = loginSaga(action);

            expect(loginPerson.next().value).toEqual(
                put({
                    type: types.LOG_IN
                })
            )

            const user = call(api.signIn, person.login, person.password);

            loginPerson.next()

            expect(loginPerson.next(user).value).toEqual(
                put({
                    type: types.LOG_IN_SUCCESS,
                    payload: user
                })

            )

            loginPerson.next()


            expect(loginPerson.next().done).toEqual(true)
        })


    })


    describe('register test', ()=> {
        it('should register person', ()=> {
            const person = {
                login: 'qwe@rr.ua',
                password: 'qweqwe'
            }

            const action = operations.registerRequest(person.login, person.password);

            const registeredPerson = registerSaga(action);

            expect(registeredPerson.next().value).toEqual(
                put({
                    type: types.REGISTER
                })
            )

            const user = call(api.signUp, person.login, person.password);

            registeredPerson.next()

            expect(registeredPerson.next(user).value).toEqual(
                put({
                    type: types.REGISTER_SUCCESS,
                    payload: user
                })

            )

            registeredPerson.next()


            expect(registeredPerson.next().done).toEqual(true)
        })
    })

})