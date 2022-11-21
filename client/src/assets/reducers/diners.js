
import {
    GET_DINERS,
    GET_DINER,
    DINER_ERROR,
    DELETE_DINER,
    ADD_DINER,
    CLEAR_DINER,
    UPDATE_DINER
} from '../actions/types'

const initialState = {
    diners: [],
    diner: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_DINERS:
            return {
                ...state,
                diners: payload,
                loading: false
            }   
        case GET_DINER:
            return {
                ...state,
                diner: payload,
                loading: false
            }  
            case CLEAR_DINER:
                return {
                    ...state,
                    post: null,
                    loading: false
                } 
        case DINER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case DELETE_DINER:
            return {
                ...state,
                diner: state.diner.filter
                (
                    item => item._id != payload
                ),
                loading: false
            }     
        case ADD_DINER:
            return {
                ...state,
                diner: [payload, ...state.diner],
                loading: false
            }   
        case UPDATE_DINER:
            return {
                ...state,
                diner: [payload, ...state.diner],
                loading: false
            }   
        default:
            return state         
    }

}