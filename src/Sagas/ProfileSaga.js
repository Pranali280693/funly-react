import axios from 'axios';
import { apiURL, getFormUrlEncoded } from './../App';
import { all, call, put, take, takeLatest, select, actionChannel } from 'redux-saga/effects';
import * as types from '../Actions/ActionType';
import { profileActions } from '../Actions/ProfileAction'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function* profileGet(ProfileValue){
    try {
        const ProfileDetails = yield axios.post(
            apiURL +'users/get_profile', getFormUrlEncoded(ProfileValue.data),
            {
                headers: {
                    "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                }
            })
            .then(response => response.data);
            yield put(profileActions.setProfileGetSuccess(ProfileDetails.result));
    }
    catch (error) 
    { 
        yield put(profileActions.setProfileFail());
        if (error.response.status === 400) {
            toast.error(error.response.data.result);
        } else if (error.request) {
            toast.error(error.request);
        } else {
            toast.error(error);
        }
    }
}

function* profilePost(ProfileValue)
{
    const ProfileData = new FormData();
    ProfileData.append('user_id',ProfileValue.data.user_id);
    ProfileData.append('email',ProfileValue.data.email);
    ProfileData.append('name',ProfileValue.data.name);
    ProfileData.append('password',ProfileValue.data.password);
    ProfileData.append('phone',ProfileValue.data.phone);
    ProfileData.append('job_title',ProfileValue.data.job_title);
    ProfileData.append('ABN',ProfileValue.data.location);
    ProfileData.append('profile_img',ProfileValue.data.profile_img);
    ProfileData.append('address',ProfileValue.data.address);
    ProfileData.append('latitude',ProfileValue.data.latitude);
    ProfileData.append('longitude',ProfileValue.data.longitude);
    
    try {
        const ProfileDetails = yield axios.post(
            apiURL +'users/edit_profile', ProfileData,
            {
                headers: {
                    "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                }
            })
            .then(response => response.data);
            yield put(profileActions.setProfilePostSuccess());
            toast.success("Record Update Successfully.")
            setTimeout(() => {
                window.location.reload(false);
            }, 1000)
    }
    catch (error) 
    { 
        yield put(profileActions.setProfileFail());
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

export function* profileWatcher() {
    const subChannel = yield actionChannel(types.PROFILE_GET);
    while (true) {
        const action = yield take(subChannel);
        yield call(profileGet, action);
    }
  }

  export function* profileSaga() {
    yield all( [
        takeLatest(types.PROFILE_GET, profileGet),
        takeLatest(types.PROFILE_POST, profilePost)
    ])
}