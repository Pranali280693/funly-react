import * as types from './ActionType';

export const signupActions = {
    setSignupPost,
    setSignUpSuccess,
    setSignUpFail,
};

function setSignupPost(SignUpValue) {
    return { type: types.SIGNUP_POST, data: SignUpValue};
}

function setSignUpSuccess(SignUpValue) {
    return { type: types.SIGNUP_SUCCESS, data: SignUpValue};
}

function setSignUpFail() {
    return { type: types.SIGNUP_FAIL};
}
