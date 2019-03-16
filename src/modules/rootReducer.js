import { combineReducers } from 'redux';
import  authReducer  from './auth'
import  confReducer  from './conf'
import  peopleReducer  from './people'
import { connectRouter } from 'connected-react-router'
import { history } from '../history'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    conf: confReducer,
    people: peopleReducer,
    form: formReducer
});

export default rootReducer;