import * as types from './ActionType';

export const businessActions = {
    getBusinessDetails,
    setBusinessDetailsGetSuccess,
    getBusinessCategory,
    setBusinessCategorySuccess,
    getBusinessSuburbs,
    setBusinessSuburbsSuccess,
    setBusinessAddPost,
    setBusinessEditPost,
    setBusinessPostSuccess,
    setBusinessFail,
    onChangeProps,
    onChangeBusinessFile,
    onDropdownChangeProps
};

function getBusinessDetails(UserValue) {
    return { type: types.BUSINESS_DETAIL_GET, data: UserValue};
}

function setBusinessDetailsGetSuccess(BusinessValue) {
    return { type: types.BUSINESS_DETAIL_GET_SUCCESS, data: BusinessValue};
}

function getBusinessCategory() {
    return { type: types.BUSINESS_CATEGORY_GET};
}

function setBusinessCategorySuccess(BusinessCategoryValue) {
    return { type: types.BUSINESS_CATEGORY_GET_SUCCESS, data: BusinessCategoryValue};
}

function getBusinessSuburbs() {
    return { type: types.BUSINESS_SUBURBS_GET};
}

function setBusinessSuburbsSuccess(BusinessSuburbsValue) {
    return { type: types.BUSINESS_SUBURBS_GET_SUCCESS, data: BusinessSuburbsValue};
}

function setBusinessAddPost(BusinessValue) {
    return { type: types.BUSINESS_ADD_POST, data: BusinessValue};
}

function setBusinessEditPost(BusinessValue) {
    return { type: types.BUSINESS_EDIT_POST, data: BusinessValue};
}

function setBusinessPostSuccess() {
    return { type: types.BUSINESS_POST_SUCCESS};
}

function setBusinessFail() {
    return { type: types.BUSINESS_FAIL};
}

function onChangeProps(props, event) {
    return { type: types.ON_CHANGES_PROPS, props: props, value: event.target.value};
}

function onChangeBusinessFile(props, event) {
    return { type: types.ON_CHANGES_PROPS, props: props, value: event.target.files};
}

function onDropdownChangeProps(props, event) {
    return {type: types.ON_CHANGES_PROPS, props: props, value: event}
}
