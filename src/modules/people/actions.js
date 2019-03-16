import types from './types.js';

////////////////////////
const addPeopleRequest = (people) => ({
    type: types.PEOPLE_ADD_REQUEST,
    payload: people
});

const addPeopleStart = () => ({
    type: types.PEOPLE_ADD_START,
});

const addPeopleSuccess = (user) => ({
    type: types.PEOPLE_ADD_SUCCESS,
    payload: user
});

const addPeopleFail = (error) => ({
    type: types.PEOPLE_ADD_FAIL,
    error
});


////////////////////////
const getPeopleRequest = () => ({
    type: types.PEOPLE_GET_REQUEST,
});

const getPeopleStart = () => ({
    type: types.PEOPLE_GET_START,
});

const getPeopleSuccess = (user) => ({
    type: types.PEOPLE_GET_SUCCESS,
    payload: user
});

const getPeopleFail = (error) => ({
    type: types.PEOPLE_GET_FAIL,
    error
});

////////////////////////
const peopleIsDraggingRequest = (val) => ({
    type: types.PEOPLE_IS_DRAGGING_REQUEST,
    val
});

const peopleIsDragging = (val) => ({
    type: types.PEOPLE_IS_DRAGGING,
    payload: val
})

////////////////////////
const peopleUnmountRequest = () => ({
    type: types.PEOPLE_UNMOUNT_REQUEST,
})

const peopleUnmountSuccess = () => ({
    type: types.PEOPLE_UNMOUNT_SUCCESS,
})


export {
    addPeopleRequest,
    addPeopleStart,
    addPeopleSuccess,
    addPeopleFail,
    getPeopleRequest,
    getPeopleStart,
    getPeopleSuccess,
    getPeopleFail,
    peopleIsDraggingRequest,
    peopleIsDragging,
    peopleUnmountRequest,
    peopleUnmountSuccess
}