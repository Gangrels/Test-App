import types from './types.js';

// Get conferences
const getConfRequest = () => ({
    type: types.GET_CONFERENCES_REQUEST,
});

const getConf = () => ({
    type: types.GET_CONFERENCES,
});

const getConfSuccess = (confs) => ({
    type: types.GET_CONFERENCES_SUCCESS,
    payload: confs
});

const getConfFail = (error) => ({
    type: types.GET_CONFERENCES_FAIL,
    error
});

//Select
const selectConf = (id) => ({
    type: types.SELECT_CONF,
    payload: id
});


// Lazy get conferences
const lazyGetConfRequest = () => ({
    type: types.LAZY_GET_CONFERENCES_REQUEST,
});

const lazyGetConf = () => ({
    type: types.LAZY_GET_CONFERENCES,
});

const lazyGetConfSuccess = (confs) => ({
    type: types.LAZY_GET_CONFERENCES_SUCCESS,
    payload: confs
});

const lazyGetConfFail = (error) => ({
    type: types.LAZY_GET_CONFERENCES_FAIL,
    error
});

// Add person to dnd
const addPersonToEvent = (personId, eventId) => {
    return {
      type: types.ADD_PERSON_REQUEST,
      payload: { personId, eventId }
    }
  }

const addPersonToEventSuccess = (peopleIds, eventId) => {
    return {
        type: types.ADD_PERSON_SUCCESS,
        payload: { peopleIds, eventId }
    }
}

// Delete person from dnd
const deletePersonFromEvent = (personId, eventId) => {
    return {
      type: types.DELETE_PERSON_REQUEST,
      payload: { personId, eventId }
    }
  }

const deletePersonFromEventSuccess = (peopleIds, eventId) => {
    return {
        type: types.DELETE_PERSON_SUCCESS,
        payload: { peopleIds, eventId }
    }
}

export {
    getConfRequest,
    getConf,
    getConfSuccess,
    getConfFail,
    selectConf,
    lazyGetConfRequest,
    lazyGetConf,
    lazyGetConfSuccess,
    lazyGetConfFail,
    addPersonToEvent,
    addPersonToEventSuccess,
    deletePersonFromEvent,
    deletePersonFromEventSuccess
}