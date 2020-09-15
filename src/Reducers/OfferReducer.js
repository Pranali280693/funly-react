import * as types from '../Actions/ActionType';

const initialState = {
    title:'',
    expiry_date:'',
    description:'',
    external_link:'',
    redeem_code:'',
    start_date:'',
    redeem_frequency:'',
    status:'',
    selectedRedeemFrequency:'',
    offer_type:'',
    selectedOfferType:'',
    business_offer_id:'',
    business_id:'',
    isLoading:false,
    offersDetails: []
};

export default function offer(state = initialState, action = null) {
    switch (action.type) {
        case types.OFFER_GET:
            return { ...state, isLoading: true, OfferValue: action.data, OfferValue:action.offerId };
        case types.OFFER_ADD_POST:
            return { ...state, isLoading: true, OfferValue: action.data };
        case types.OFFER_EDIT_POST:
            return { ...state, isLoading: true, OfferValue: action.data };
        case types.OFFER_GET_SUCCESS:
            return { ...state, isLoading: false, 
                title:action.data.title,
                expiry_date:action.data.expiry_date,
                description:action.data.description,
                external_link:action.data.external_link,
                redeem_code:action.data.redeem_code,                
                start_date:action.data.start_date,
                status:action.data.status,
                redeem_frequency:action.data.redeem_frequency,
                selectedRedeemFrequency:action.data.redeem_frequency,
                offer_type:action.data.type,
                selectedOfferType:action.data.type,
                business_offer_id:action.data.id,
                business_id:action.data.business_id,
            };
        case types.OFFER_POST_SUCCESS:
            return { ...state, isLoading: false, OfferValue: action.data };
        case types.OFFER_MANAGE_GET:
            return { ...state, isLoading: true, OfferValue: action.data };
        case types.OFFER_MANAGE_SUCCESS:
            return { ...state, isLoading: false, offersDetails: action.data };
        case types.OFFER_REDEEMED_GET:
            return { ...state, isLoading: true, OfferValue: action.data };
        case types.OFFER_REDEEMED_SUCCESS:
            return { ...state, isLoading: false, offersDetails: action.data };
        case types.OFFER_FAIL:
            return { ...state, isLoading: false };
        case types.ON_CHANGES_PROPS:
            return { ...state, isLoading: false, [action.props]: action.value };        
        default:
            return state
     }
}