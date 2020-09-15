import { combineReducers } from "redux"
import LoginReducer from './LoginReducer';
import SignUpReducer from './SignUpReducer';
import profile from './ProfileReducer';
import offer from './OfferReducer';
import { business } from './BusinessReducer';

// import LoginReducer, * as login from "./LoginReducer"
// import OffresReducer, * as offres from "./OffresReducer"

const rootReducer = combineReducers({ 
    LoginReducer,
    SignUpReducer,
    profile,
    offer,
    business
});

export default rootReducer;