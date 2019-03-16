import types from './types';
import {Record} from 'immutable'


const authRecord = Record({
    loading: false,
    user: null,
    err: null,
    people: {},
    index: 0
})

const homeReducer = (state = new authRecord(), action) => {
    const { payload, error } = action;

    switch(action.type) {
        //Register*****
        case types.REGISTER: {
            return state.set('loading', true)
        }
        case types.REGISTER_SUCCESS: {
            console.log('reg',payload)
            return state
                    .set('loading', false)
                    .set('user', payload.user)
                    .set('err', null)
        }
        case types.REGISTER_FAIL: {
            return state
                    .set('loading', false)
                    .set('err', payload.err)
        }

        //Login******
        case types.LOG_IN: {
            return state.set('loading', true)
        }
        case types.LOG_IN_SUCCESS: {
            return state
                    .set('loading', false)
                    .set('user', payload.user)
                    .set('err', null)
        }
        case types.LOG_IN_FAIL: {
            return state
                    .set('loading', false)
                    .set('err', error)
        }

        //Add people *******
        case types.ADD_PEOPLE: {
            return state
                    .setIn(['people', payload.email],  {...payload})
        }


        //Default *******
        default: return state;
    }
}

export default homeReducer;