import types from './types';
import '../../config';
import {takeEvery, all, put, call, select} from 'redux-saga/effects';
import api from '../../utils/api';
import selector from './selectors'
import {
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
} from './actions'


export function* addPeopleSaga({payload}) {
  yield put(addPeopleStart());

  try {
    const ref = yield call(api.addPeopleToFB, payload);

    const person = {
      [ref.path.pieces_[1]]: payload
    }

    yield put(addPeopleSuccess(person));

} catch (error) {
    yield put(addPeopleFail(error));
  }
}


export function* getPeopleSaga({payload}) {
    const state = yield select(selector.peopleSelector);

    if (state.loading) return;

    yield put(getPeopleStart());

    try {
      const ref = api.fetchAllPeople(payload);
      const people = yield call([ref, ref.once], 'value');

      yield put(getPeopleSuccess(people.val()));

  } catch (error) {
      yield put(getPeopleFail(error));
    }
  }

export function* dragoperationSaga(val){
  yield put(peopleIsDragging(val.val));
}

export function* peopleUnmountSaga(){
  yield put(peopleUnmountSuccess());
}


export default {
    addPeopleRequest,
    getPeopleRequest,
    peopleIsDraggingRequest,
    peopleUnmountRequest
}

export function* saga() {
  yield all([
    yield takeEvery(types.PEOPLE_ADD_REQUEST, addPeopleSaga),
    yield takeEvery(types.PEOPLE_GET_REQUEST, getPeopleSaga),
    yield takeEvery(types.PEOPLE_IS_DRAGGING_REQUEST, dragoperationSaga),
    yield takeEvery(types.PEOPLE_UNMOUNT_REQUEST, peopleUnmountSaga)
  ])
}