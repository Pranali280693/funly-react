import axios from 'axios';
import { apiURL, getFormUrlEncoded } from './../App';
import { all, call, put, take, takeLatest, select, actionChannel, fork } from 'redux-saga/effects';
import * as types from '../Actions/ActionType';
import { businessActions } from '../Actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../Helpers';

function* businessDetailGet(BusinessValue){
    try {
        const BusinessDetails = yield axios.post(
            apiURL +'business/get_business_detail', getFormUrlEncoded(BusinessValue.data),
            {
                headers: { "Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd" }
            }
        )                
        .then(response => response.data)
        .catch(err => {
            if (err.response.status === 400) {
                toast.error(err.response.data.result)
                setTimeout(() => {
                    history.push('/BusinessDetailAdd')
                }, 1000) 
            } else if (err.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
        });
        yield put(businessActions.setBusinessDetailsGetSuccess(BusinessDetails.result));
    }
    catch (error)
    { 
        yield put(businessActions.setBusinessFail());
    }
}

function* businessCategoriesGet(){
    try {
        const BusinessCategory = yield axios.get(
            apiURL + 'common/categories',
            {
                headers: {"Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"}
            })
        .then(response => response.data);
        yield put(businessActions.setBusinessCategorySuccess(BusinessCategory.result));
    }
    catch (error)
    {
        yield put(businessActions.setBusinessFail());
        if (error.response.status === 400) {
            toast.error(error.response.data.result)
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    }
}

function* businessSuburbsGet(){
    try {
        const BusinessSuburbs = yield axios.get(
            apiURL + 'common/suburbs',
            {
                headers: {"Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"}
            })
        .then(response => response.data);
        yield put(businessActions.setBusinessSuburbsSuccess(BusinessSuburbs.result));
    }
    catch (error)
    {
        yield put(businessActions.setBusinessFail());
        if (error.response.status === 400) {
            toast.error(error.response.data.result)
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            // anything else
        }
    }
}

function* businessAddPost(BusinessValue){
    try {
        const BusinessData = new FormData();
        BusinessData.append('user_id',BusinessValue.data.user_id);
        BusinessData.append('email',BusinessValue.data.email);
        BusinessData.append('name',BusinessValue.data.name);
        BusinessData.append('contact_number',BusinessValue.data.contact_number);
        BusinessData.append('description',BusinessValue.data.description);
        BusinessData.append('facebook_url',BusinessValue.data.facebook_url);
        BusinessData.append('instagram_url',BusinessValue.data.instagram_url);
        BusinessData.append('website_url',BusinessValue.data.website_url);
        for (let i = 0; i < BusinessValue.data.selectedSuburbs.length; i++) {
            BusinessData.append('business_suburbs[]', BusinessValue.data.selectedSuburbsValue[i])
        }
        for (let i = 0; i < BusinessValue.data.selectedCategories.length; i++) {
            BusinessData.append('business_categories[]', BusinessValue.data.selectedCategoriesValue[i])
        }
        for (let i = 0; i < BusinessValue.data.businessImagesData.length; i++) {
            BusinessData.append('business_images[]', BusinessValue.data.businessImagesData[i])
        }
        
        const BusinessDetail = yield axios.post(
            apiURL + 'business/add', BusinessData,
            {
                headers: {"Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"}
            })
        .then(response => response.data);
        yield put(businessActions.setBusinessAddPost(BusinessDetail.result));
        toast.success("Record Added Successfully.")
        setTimeout(() => {
            history.push('/BusinessDetail')
        }, 1000)
    }
    catch (error)
    {
        yield put(businessActions.setBusinessFail());
        if (error.response.status === 400) {
            error.response.data.result.forEach(element => {
                toast.error(element)
            });
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            toast.error(error);
        }
    }
}

function* businessEditPost(BusinessValue){
    try {
        const BusinessData = new FormData();
        BusinessData.append('business_id',BusinessValue.data.business_id);
        BusinessData.append('email',BusinessValue.data.email);
        BusinessData.append('name',BusinessValue.data.name);
        BusinessData.append('contact_number',BusinessValue.data.contact_number);
        BusinessData.append('description',BusinessValue.data.description);
        BusinessData.append('facebook_url',BusinessValue.data.facebook_url);
        BusinessData.append('instagram_url',BusinessValue.data.instagram_url);
        BusinessData.append('website_url',BusinessValue.data.website_url);
        BusinessData.append('user_id',BusinessValue.data.user_id);
        for (let i = 0; i < BusinessValue.data.selectedSuburbs.length; i++) {
            BusinessData.append('business_suburbs[]', BusinessValue.data.selectedSuburbsValue[i])
        }
        for (let i = 0; i < BusinessValue.data.selectedCategories.length; i++) {
            BusinessData.append('business_categories[]', BusinessValue.data.selectedCategoriesValue[i])
        }
        for (let i = 0; i < BusinessValue.data.businessImagesData.length; i++) {
            BusinessData.append('business_images[]', BusinessValue.data.businessImagesData[i])
        }

        const BusinessDetail = yield axios.post(
            apiURL + 'business/edit', BusinessData,
            {
                headers: {"Apikey": "qwetrFghjm8der5ocFjdmsD4KLmdd2oweiqeamd"}
            })
        .then(response => response.data);
        yield put(businessActions.setBusinessPostSuccess(BusinessDetail.result));
        toast.success("Record Updated Successfully.")
        setTimeout(() => {
            history.push('/BusinessDetail')
        }, 1000)
    }
    catch (error)
    {
        yield put(businessActions.setBusinessFail());
        if (error.response.status === 400) {
            error.response.data.result.forEach(element => {
                toast.error(element)
            });
        } else if (error.request) {
            // client never received a response, or request never left
        } else {
            toast.error(error);
        }
    }
}

export function* businessWatcher() {
    const subChannel = yield actionChannel(types.BUSINESS_DETAIL_GET);
    while (true) {
        const action = yield take(subChannel);
        yield call(businessDetailGet, action);
    }
  }

  export function* businessSaga() {
    yield all( [        
        takeLatest(types.BUSINESS_DETAIL_GET, businessDetailGet),
        takeLatest(types.BUSINESS_CATEGORY_GET, businessCategoriesGet),
        takeLatest(types.BUSINESS_SUBURBS_GET, businessSuburbsGet),
        takeLatest(types.BUSINESS_ADD_POST, businessAddPost),
        takeLatest(types.BUSINESS_EDIT_POST, businessEditPost),
    ])
}