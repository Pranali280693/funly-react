import axios from 'axios';
import { apiURL, getFormUrlEncoded } from './../App';
import { all, call, put, take, takeLatest, select, actionChannel } from 'redux-saga/effects';
import * as types from '../Actions/ActionType';
//import * as actions from '../Actions/LoginAction';
import { loginActions } from '../Actions';
import { history } from '../Helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* login(LoginValue){
    try {
        const loginDetails = yield axios.post(
            apiURL +'auth/login', getFormUrlEncoded(LoginValue.data),
                {
                    headers: {
                        "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                    }
                })                
            .then(response => response.data);
            const resultValue = yield put(loginActions.setLoginSuccess(loginDetails.result));
            localStorage.setItem('id',resultValue.data.id);
            history.push('/Dashboard');
    }
    catch (error) 
    { 
        yield put(loginActions.setLoginFail());
        if (error.response.status === 400) {
            toast.error(error.response.data.result);
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    }
}

export function* loginWatcher() {
    const subChannel = yield actionChannel(types.LOGIN_POST);
    while (true) {
        const action = yield take(subChannel);
        yield call(login, action);
    }
  }

  export function* loginSaga() {
    yield all( [
        takeLatest(types.LOGIN_POST, login),
    ])
}