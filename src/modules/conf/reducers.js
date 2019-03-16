import types from './types';
import {Record, List, OrderedSet} from 'immutable'
import { toImmutable } from '../../utils/utils'


const confRecord = Record({
    loading: false,
    loaded: false,
    conferences: new List([]),
    selected: new OrderedSet([]),
    err: null,
})

const conferenceRecord = Record({
    id: null,
    month: null,
    submissionDeadline: null,
    title: null,
    url: null,
    when: null,
    where: null,
    peopleIds: []
})

const confReducer = (state = new confRecord(), action) => {
    const { payload, error } = action;

    switch(action.type) {
        //Conf*****
        case types.GET_CONFERENCES:
        case types.LAZY_GET_CONFERENCES: {
            return state.set('loading', true)
        }
        case types.LAZY_GET_CONFERENCES_SUCCESS: {
            return state
                    .set('loading', false)
                    .mergeIn(['conferences'], toImmutable(payload, conferenceRecord))
                    .set('loaded', Object.keys(payload).length < 10)
        }
        case types.GET_CONFERENCES_SUCCESS: {
            return state
                    .set('loading', false)
                    .set('conferences', toImmutable(payload, conferenceRecord))
                    .set('err', null)
        }
        case types.GET_CONFERENCES_FAIL: {
            return state
                    .set('loading', false)
                    .set('err', error)
        }

        //Select*****
        case types.SELECT_CONF: {
            return state.update('selected', (selected) =>
                selected.has(payload)
                    ? selected.remove(payload)
                    : selected.add(payload)
            )
        }

        //Add person*****
        case types.ADD_PERSON_SUCCESS:
        // console.log('123',payload)

        const index = state.toJS().conferences.findIndex(conf => conf.id === payload.eventId)

            return state.setIn(
                ['conferences', index, 'peopleIds'],
                payload.peopleIds
        )

        //Delete person from event*****
        case types.DELETE_PERSON_SUCCESS:

        const ind = state.toJS().conferences.findIndex(conf => conf.id === payload.eventId)

            return state.setIn(
                ['conferences', ind, 'peopleIds'],
                payload.peopleIds
        )

     //Default *******
     default: return state;
    }
}

export default confReducer;