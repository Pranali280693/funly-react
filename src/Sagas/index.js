import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { loginWatcher, login } from './LoginSaga'
import { signUpWatcher, signUp } from './SignUpSaga'
import { profileWatcher, profileSaga } from './ProfileSaga'
import { businessWatcher, businessSaga } from './BusinessSaga';
import { offerWatcher, offerSaga } from './OfferSaga';

export default function* rootSaga() {
    yield all([
        loginWatcher(),
        signUpWatcher(),
        profileWatcher(),
        profileSaga(),
        businessWatcher(),
        businessSaga(),
        offerWatcher(),
        offerSaga(),        
    ]);
}
