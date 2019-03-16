import types from './types';
import {takeEvery, all, put, call, select } from 'redux-saga/effects';
import api from '../../utils/api';
import selectorApi from './selectors';
import {
    getConfRequest,
    getConf,
    getConfSuccess,
    getConfFail,
    selectConf,
    lazyGetConfRequest,
    lazyGetConf,
    lazyGetConfSuccess,
    addPersonToEvent,
    addPersonToEventSuccess,
    deletePersonFromEvent,
    deletePersonFromEventSuccess
} from './actions'


export function* conferenceSaga() {
    yield put(getConf());
    const conferences = yield call(api.fetchAllEvents);

    try {
      yield put(getConfSuccess(conferences));
    } catch (error) {
      yield put(getConfFail(error));
    }
  }


export function* fetchLazySaga(){

    const state = yield select(selectorApi.getConfPart);

    if (state.loading || state.loaded) return
    yield put(lazyGetConf());

    const lastEvent = state.conferences.last();
    const ref = api.lazyFetchAllEvents(lastEvent)
    const confs = yield call([ref, ref.once], 'value');

    yield put(lazyGetConfSuccess(confs.val()));

}

export function* addPersonToEventSaga({payload: { personId, eventId }}){
  const state = yield select(selectorApi.getConfs)

  const currentPeopleIds = state.toJS().find(ent => ent.id === eventId).peopleIds;


  if (currentPeopleIds.includes(personId)) return;


  const peopleIds = currentPeopleIds.concat(personId)


  try {
      yield call(api.addPersonToEvent, eventId, peopleIds)

      yield put( addPersonToEventSuccess(peopleIds, eventId) )
  } catch (error) {
      console.log(error)
  }

}

export function* deletePersonFromEventSaga({payload: { personId, eventId }}){
    const state = yield select(selectorApi.getConfs)

    const currentPeopleIds = state.toJS().find(ent => ent.id === eventId.toJS().id).peopleIds;

    if (!currentPeopleIds.includes(personId)) return;

    const peopleIds = currentPeopleIds.filter(currentId => currentId !== personId)

    try {
        yield call(api.addPersonToEvent, eventId.toJS().id, peopleIds)

        yield put( deletePersonFromEventSuccess(peopleIds, eventId.toJS().id) )
    } catch (error) {
        console.log(error)
    }

  }

export default {
    getConfRequest,
    selectConf,
    lazyGetConfRequest,
    addPersonToEvent,
    deletePersonFromEvent
}

export function* saga() {
  yield all([
    yield takeEvery(types.GET_CONFERENCES_REQUEST, conferenceSaga),
    yield takeEvery(types.LAZY_GET_CONFERENCES_REQUEST, fetchLazySaga),
    yield takeEvery(types.ADD_PERSON_REQUEST, addPersonToEventSaga),
    yield takeEvery(types.DELETE_PERSON_REQUEST, deletePersonFromEventSaga),
  ])
}