import * as types from './ActionType';

export const loginActions = {
    getLoginPost,
    setLoginSuccess,
    setLoginFail,
};

function getLoginPost(LoginValue) {
    return { type: types.LOGIN_POST, data: LoginValue};
}

function setLoginSuccess(LoginValue) {
    return { type: types.LOGIN_SUCCESS, data: LoginValue};
}

function setLoginFail() {
    return { type: types.LOGIN_FAIL};
}