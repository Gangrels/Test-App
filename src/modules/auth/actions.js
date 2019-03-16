import types from './types.js';

////////////////////////
const registerRequest = (email, password) => ({
    type: types.REGISTER_REQUEST,
    email,
    password
});

const register = () => ({
    type: types.REGISTER,
});

const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user
});

const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    error
});

////////////////////////
const logInRequest = (email, password) => ({
    type: types.LOG_IN_REQUEST,
    email,
    password
});

const logIn = () => ({
    type: types.LOG_IN,
});

const logInSuccess = (user) => ({
        type: types.LOG_IN_SUCCESS,
        payload: user
    });

const logInFail = (error) => ({
    type: types.LOG_IN_FAIL,
    error
});

const peopleAddRequest = (people) => {
    return {
        type: types.ADD_PEOPLE_REQUEST,
        payload: people
      }
};

const peopleAddSuccess = (payload) => {
    return {
        type: types.ADD_PEOPLE,
        payload
    }
}

////////////////////////
export {
    registerRequest,
    register,
    registerSuccess,
    registerFail,
    logInRequest,
    logIn,
    logInSuccess,
    logInFail,
    peopleAddRequest,
    peopleAddSuccess
}