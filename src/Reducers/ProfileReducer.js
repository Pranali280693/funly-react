import * as types from '../Actions/ActionType';

const initialState = { 
    user_id:'',            
    email:'',
    name:'',
    password:'',
    phone:'',
    job_title:'',
    location:'',
    ABN:'',
    profile_img:'',
    address:'',    
    latitude:'',
    longitude:'',
    isLoading:false
};

//export default function profile(state = { isLoading: false }, action = null) {
export default function profile(state = initialState, action = null) {
    switch (action.type) {      
        case types.PROFILE_GET:
            return { ...state, isLoading: true, ProfileValue: action.data };
        case types.ON_CHANGES_PROPS:
            return { ...state, isLoading: false, [action.props]: action.value };
        case types.PROFILE_POST:
            return { ...state, isLoading: true, ProfileValue: action.data };
        case types.PROFILE_GET_SUCCESS:
            return { ...state, isLoading: false, 
                user_id: action.data.id,
                email: action.data.email,
                name:action.data.name,
                password: '',
                phone: action.data.phone, 
                job_title: action.data.job_title,
                location: action.data.location,
                profile_img:action.data.profile_img,
                address: action.data.address,
                latitude: action.data.latitude,
                longitude: action.data.longitude,
            };
        case types.PROFILE_POST_SUCCESS:
            return{ ...state, isLoading: false }
        case types.PROFILE_FAIL:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}