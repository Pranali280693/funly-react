import * as types from '../Actions/ActionType';

export default function SignUpReducer(state = { isLoading: false }, action = null) {
    switch (action.type) {
        case types.SIGNUP_POST:
            return { ...state, isLoading: true, SignupValue: action.data };
        case types.SIGNUP_SUCCESS:
            return { ...state, isLoading: false, SignupValue: action.data };
        case types.SIGNUP_FAIL:
            return { ...state, isLoading: false};
        default:
            return state;
    }
}
