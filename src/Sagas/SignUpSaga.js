import axios from 'axios';
import { apiURL, getFormUrlEncoded } from './../App';
import { all, call, put, take, takeLatest, select, actionChannel } from 'redux-saga/effects';
import * as types from '../Actions/ActionType';
import { signupActions } from '../Actions/SignUpAction'
import { history } from '../Helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* signUp(SignUpValue){
    try {
        const SignupDetails = yield axios.post(
            apiURL +'auth/register', getFormUrlEncoded(SignUpValue.data),
                {
                    headers: {
                        "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                    }
                })                
            .then(response => response.data);
            yield put(signupActions.setSignUpSuccess(SignupDetails.result));
            history.push('/Login');
    }
    catch (error) 
    {
        yield put(signupActions.setSignUpFail());
        if (error.response.status === 400) {
            error.response.data.result.forEach(element => {
                toast.error(element)
            });
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    }
}

export function* signUpWatcher() {
    const subChannel = yield actionChannel(types.SIGNUP_POST);
    while (true) {
        const action = yield take(subChannel);
        yield call(signUp, action);
    }
  }

  export function* signUpSaga() {
    yield all( [
        takeLatest(types.SIGNUP_POST, signUp),
    ])
}