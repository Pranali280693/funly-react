import * as types from './ActionType';

export const profileActions = {
    getProfile,
    onChangeProps,
    onChangeFileChange,
    setProfilePost,
    setProfileGetSuccess,
    setProfilePostSuccess,
    setProfileFail
};

function getProfile(ProfileValue) {
    return { type: types.PROFILE_GET, data: ProfileValue};
}

function onChangeProps(props, event) {
    return { type: types.ON_CHANGES_PROPS, props: props, value: event.target.value};
}

function onChangeFileChange(props, event) {
    return { type: types.ON_CHANGES_PROPS, props: props, value: event.target.files[0]};
}

function setProfilePost(ProfileValue) {
    return { type: types.PROFILE_POST, data: ProfileValue};
}

function setProfileGetSuccess(ProfileValue) {
    return { type: types.PROFILE_GET_SUCCESS, data: ProfileValue};
}

function setProfilePostSuccess() {
    return { type: types.PROFILE_POST_SUCCESS};
}

function setProfileFail() {
    return { type: types.PROFILE_FAIL};
}