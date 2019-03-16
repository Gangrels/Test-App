import types from './types';
import {Record, List} from 'immutable'
import { toImmutable } from '../../utils/utils'


const authRecord = Record({
    loading: false,
    loaded: false,
    users: new List([]),
    err: null,
    people: {},
    index: 0,
    isDragging: false
})

const userRecord = Record({
    id: null,
    email: null,
    firstName: null,
    lastName: null,
})

const peopleReducer = (state = new authRecord(), action) => {
    const { payload, error } = action;

    switch(action.type) {
        //PEOPLE_ADD*****
        case types.PEOPLE_ADD_START: {
            return state.set('loading', true)
        }
        case types.PEOPLE_ADD_SUCCESS: {
            console.log('add',payload)

            return state
                    .set('loading', false)
                    .mergeIn(['users'], toImmutable(payload, userRecord))
                    .set('err', null)
        }
        case types.PEOPLE_ADD_FAIL: {
            return state
                    .set('loading', false)
                    .set('err', error)
        }

        //PEOPLE_GET*****
        case types.PEOPLE_GET_START: {
            return state
                .set('loading', true)
                .set('loaded', false)
        }
        case types.PEOPLE_GET_SUCCESS: {
            return state
                    .set('loading', false)
                    .mergeIn(['users'], toImmutable(payload, userRecord))
                    .set('err', null)
                    .set('loaded', true)
        }
        case types.PEOPLE_GET_FAIL: {
            return state
                    .set('loading', false)
                    .set('err', error)
        }

        //PEOPLE_IS_DRAGGING*****
        case types.PEOPLE_IS_DRAGGING: {
            return state
                    .set('isDragging', payload)
        }

        //PEOPLE_UNMOUNT*****
        case types.PEOPLE_UNMOUNT_SUCCESS: {
            return state
                    .set('users', new List([]))
        }

        //Default *******
        default: return state;
    }
}

export default peopleReducer;