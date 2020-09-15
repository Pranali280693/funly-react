import * as types from './ActionType';

export const offerActions = {
    getOffer,
    onBindProps,
    onChangeProps,
    onCheckboxChangeProps,
    setAddOfferPost,
    setEditOfferPost,
    setOfferGetSuccess,
    setOfferPostSuccess,
    getOfferManage,
    setOfferManageSuccess,
    getOfferRedeemed,
    setOfferRedeemedSuccess,
    setOfferFail,
};

function getOffer(OfferValue, offerId) {
    return { type: types.OFFER_GET, data: OfferValue, OfferValue:offerId};
}

function onBindProps(props, value){
    return { type: types.ON_CHANGES_PROPS, props: props, value: value};
}

function onChangeProps(props, event) {    
    return { type: types.ON_CHANGES_PROPS, props: props, value: event.target.value};
}

function onCheckboxChangeProps(props, event) {
    return { type: types.ON_CHANGES_PROPS, props: props, value: event.target.value};
}

function setAddOfferPost(OfferValue) {
    return { type: types.OFFER_ADD_POST, data: OfferValue};
}

function setEditOfferPost(OfferValue) {
    return { type: types.OFFER_EDIT_POST, data: OfferValue};
}

function setOfferGetSuccess(OfferValue) {
    return { type: types.OFFER_GET_SUCCESS, data: OfferValue};
}

function setOfferPostSuccess() {
    return { type: types.OFFER_POST_SUCCESS};
}

function getOfferManage(OfferValue) {
    return { type: types.OFFER_MANAGE_GET, data: OfferValue};
}

function setOfferManageSuccess(OfferValue) {
    return { type: types.OFFER_MANAGE_SUCCESS, data: OfferValue};
}

function getOfferRedeemed(OfferValue) {
    return { type: types.OFFER_REDEEMED_GET, data: OfferValue};
}

function setOfferRedeemedSuccess(OfferValue) {
    return { type: types.OFFER_REDEEMED_SUCCESS, data: OfferValue};
}

function setOfferFail() {
    return { type: types.OFFER_FAIL};
}
