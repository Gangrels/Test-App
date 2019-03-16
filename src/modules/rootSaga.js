import { all } from 'redux-saga/effects'
import {saga as authSaga} from './auth/operations'
import {saga as confSaga} from './conf/operations'
import {saga as peopleSaga} from './people/operations'

export function* saga() {
    yield all([
      authSaga(),
      confSaga(),
      peopleSaga()
    ])
  }