import * as types from '../Actions/ActionType';

const initialState = { 
    id:'',
    user_id:'',
    name:'',
    contact_number:'',
    email:'',
    description:'',
    facebook_url:'',
    instagram_url:'',
    website:'',
    total_views:'',
    first_offer_id:'',
    userData:'',
    total_likes:'',
    total_ratings:'',
    liked:'',
    rating:'',
    offerData:[],
    businessSuburbsData:[],
    businessCategoriesData:[],
    businessImagesData:[],

    selectedCategories: [],
    selectedCategoriesValue: [],
    selectedSuburbs:[],
    selectedSuburbsValue:[],
    business_id:'',
    isLoading:false
};

export function business(state = initialState, action = null) {
    switch (action.type) {
        case types.BUSINESS_DETAIL_GET:
            return { 
                ...state, isLoading: true, 
                BusinessValue: action.data 
            };

        case types.BUSINESS_DETAIL_GET_SUCCESS:
            //Select Categories
            const optionsSelectCategories = action.data.businessCategoriesData.map(d => ({
                "value" : d.category_id,
                "label" : d.name
            })) 
            var selectedCategoriesValues = optionsSelectCategories.map(function (option) {
                return option.value;
            });
            //Select Suburbs
            const optionsSelectSuburbs = action.data.businessSuburbsData.map(d => ({
                "value" : d.suburb_id,
                "label" : d.locality
            }))
            var selectedSuburbsValues = optionsSelectSuburbs.map(function (option) {
                return option.value;
            });
            return {
                ...state, isLoading: false,
                id:action.data.id,
                user_id:action.data.user_id,
                name:action.data.name,
                contact_number:action.data.contact_number,
                email:action.data.email,
                description:action.data.description,
                facebook_url:action.data.facebook_url,
                instagram_url:action.data.instagram_url,
                website:action.data.website,
                total_views:action.data.total_views,
                first_offer_id:action.data.first_offer_id,
                userData:action.data.userData,
                total_likes:action.data.total_likes,
                total_ratings:action.data.total_ratings,
                liked:action.data.liked,
                rating:action.data.rating,
                offerData:action.data.offerData,
                businessSuburbsData:action.data.businessSuburbsData,
                selectedSuburbs:optionsSelectSuburbs,
                selectedSuburbsValue:selectedSuburbsValues,
                businessCategoriesData:action.data.businessCategoriesData,
                selectedCategories: optionsSelectCategories,
                selectedCategoriesValue: selectedCategoriesValues,
                businessImagesData:action.data.businessImagesData,
            };

        case types.BUSINESS_CATEGORY_GET:
            return { 
                ...state, isLoading: true 
            };

        case types.BUSINESS_CATEGORY_GET_SUCCESS:
            const optionsCategories = action.data.map(value => ({
                "value" : value.id,
                "label" : value.name
            }))
            return {
                ...state, isLoading: false,
                businessCategoriesData:optionsCategories
            };

        case types.BUSINESS_SUBURBS_GET:
            return { 
                ...state, isLoading: true 
            };

        case types.BUSINESS_SUBURBS_GET_SUCCESS:
            const optionsSuburbs = action.data.map(value => ({
                "value" : value.id,
                "label" : value.locality
            }))
            return {
                ...state, isLoading: false,
                businessSuburbsData:optionsSuburbs
            };

        case types.BUSINESS_ADD_POST:
            return {
                ...state, isLoading: true
            };
        case types.BUSINESS_EDIT_POST:
            return {
                ...state, isLoading: true
            };

        case types.BUSINESS_POST_SUCCESS:
            return {
                ...state, isLoading: false
            };

        case types.BUSINESS_FAIL:
            return { 
                ...state, isLoading: false 
            };

        case types.ON_CHANGES_PROPS:
            return {
                ...state,
                [action.props]: action.value
            };

        default:
            return state
     }
}