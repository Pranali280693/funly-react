import axios from 'axios';
import { apiURL, getFormUrlEncoded } from './../App';
import { all, call, put, take, takeLatest, select, actionChannel } from 'redux-saga/effects';
import * as types from '../Actions/ActionType';
import { offerActions } from '../Actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../Helpers';

function* addOfferPost(OfferValue){
    try {
        const OfferDetails = yield axios.post(
            apiURL +'offers/add', getFormUrlEncoded(OfferValue.data),
            {
                headers: {
                    "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                }
            })
            .then(response => response.data);
            yield put(offerActions.setOfferPostSuccess(OfferDetails.result));
            toast.success("Record Added Successfully.")
            setTimeout(() => {
                history.push('/ManageOffers')
            }, 1000)
    }
    catch (error) 
    { 
        yield put(offerActions.setOfferFail());
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

function* editOfferPost(OfferValue){
    try {
        const OfferDetails = yield axios.post(
            apiURL +'offers/edit', getFormUrlEncoded(OfferValue.data),
            {
                headers: {
                    "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                }
            })
            .then(response => response.data);
            yield put(offerActions.setOfferPostSuccess(OfferDetails.result));
            toast.success("Record Updated Successfully.")
            setTimeout(() => {
                history.push('/ManageOffers')
            }, 1000)
    }
    catch (error) 
    { 
        yield put(offerActions.setOfferFail());
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

function* offerGet(UserValue){
    try {
        const OfferDetails = yield axios.post(
            apiURL +'offers/detail', getFormUrlEncoded(UserValue.data),
            {
                headers: {
                    "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                }
            })
            .then(response => response.data);
            const OfferDetailsValue = OfferDetails.result.find(data => data.id === UserValue.OfferValue)
            yield put(offerActions.setOfferGetSuccess(OfferDetailsValue));
    }
    catch (error) 
    { 
        yield put(offerActions.setOfferFail());
        if (error.response.status === 400) {
            toast.error(error.response.data.result);
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    }
}

function* offerManagedGet(UserValue){
    try {
        const OfferDetails = yield axios.post(
            apiURL +'offers/detail', getFormUrlEncoded(UserValue.data),
            {
                headers: {
                    "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                }
            })
            .then(response => response.data);
            yield put(offerActions.setOfferManageSuccess(OfferDetails.result));
    }
    catch (error) 
    { 
        yield put(offerActions.setOfferFail());
        if (error.response.status === 400) {
            toast.error(error.response.data.result);
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    }
}

function* offerRedeemedGet(UserValue){
    try {
        const OfferDetails = yield axios.post(
            apiURL +'offers/get_redeemed_offer', getFormUrlEncoded(UserValue.data),
            {
                headers: {
                    "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"
                }
            })
            .then(response => response.data);
            yield put(offerActions.setOfferRedeemedSuccess(OfferDetails.result));
    }
    catch (error) 
    { 
        yield put(offerActions.setOfferFail());
        if (error.response.status === 400) {
            toast.error(error.response.data.result);
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    }
}

export function* offerWatcher() {
    const subChannel = yield actionChannel(types.OFFER_GET);
    while (true) {
        const action = yield take(subChannel);
        yield call(offerGet, action);
    }
  }

export function* offerSaga() {
    yield all( [
        takeLatest(types.OFFER_GET, offerGet),
        takeLatest(types.OFFER_ADD_POST, addOfferPost),
        takeLatest(types.OFFER_EDIT_POST, editOfferPost),
        takeLatest(types.OFFER_MANAGE_GET, offerManagedGet),
        takeLatest(types.OFFER_REDEEMED_GET, offerRedeemedGet),
    ])
}