import * as types from '../Actions/ActionType';

export default function LoginReducer(state = { isLoading: false }, action = null) {
    switch (action.type) {      
        case types.LOGIN_POST:
            return { ...state, isLoading: true, LoginValue: action.data };
        case types.LOGIN_SUCCESS:
            return { ...state, isLoading: false, LoginValue: action.data };
        case types.LOGIN_FAIL:
            return { ...state, isLoading: false};
        default:
            return state;
    }
}