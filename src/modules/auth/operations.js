import types from './types';
import '../../config'
import {takeEvery, all, put, call, spawn, take} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import api from '../../utils/api'
import { push } from 'connected-react-router'
import {
  registerRequest,
  register,
  registerSuccess,
  registerFail,
  logInRequest,
  logIn,
  logInSuccess,
  logInFail,
  peopleAddSuccess,
  peopleAddRequest
} from './actions'


export function* registerSaga({email, password}) {
  yield put(register());
  try {
    const user = yield call(api.signUp, email, password);
    yield put(registerSuccess(user));
    yield put(push('/admin'));
  } catch (error) {
    yield put(registerFail(error));
  }
}


export function* loginSaga({email, password}) {
  yield put(logIn());
  try {
    const user = yield call(api.signIn, email, password);
    yield put(logInSuccess(user));
    yield put(push('/admin'));
  } catch (error) {
    yield put(logInFail(error));
  }
}

export function* peopleAdd ({payload}) {
  yield put(peopleAddSuccess(payload))
}


export const authorizationChannel = () => eventChannel(emit => {
  return api.onAuthStateChanged((user) => {
    return emit({user})
  })
})


export function* authSaga(){
  const authChan = yield call(authorizationChannel);

  try {
    while(true){
      const { user } = yield take(authChan);

      yield put ({
        type: types.LOG_IN_SUCCESS,
        payload: { user }
      })
    }
  } finally {
    yield call([authChan, authChan.close])
    console.log('---', 'cancelled realtime saga')
  }

}

export default {
    logInRequest,
    registerRequest,
    peopleAddRequest
}

export function* saga() {
  yield spawn(authSaga)

  yield all([
    yield takeEvery(types.REGISTER_REQUEST, registerSaga),
    yield takeEvery(types.LOG_IN_REQUEST, loginSaga),
    yield takeEvery(types.ADD_PEOPLE_REQUEST, peopleAdd)
  ])
}