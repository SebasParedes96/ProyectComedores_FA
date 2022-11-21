import axios from 'axios'
import { setAlert } from './alert'
import { GET_DINERS,
    GET_DINER, 
    DINER_ERROR, 
    DELETE_DINER,
    ADD_DINER,
    CLEAR_DINER
} from "./types"; 

//Get DINERS
export const getDiners = () => async dispatch => {
    dispatch({type: CLEAR_DINER})

    try {
        const res = await axios.get('http://localhost:5000/api/diners')


        dispatch({
            type: GET_DINERS,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: DINER_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}
//Get DINER
export const getDiner = id => async dispatch => {

    /* dispatch({type: CLEAR_PROFILE})
    dispatch({type: CLEAR_REPOS}) */

    try {
        const res = await axios.get(`http://localhost:5000/api/diners/${id}`)

        dispatch({
            type: GET_DINER,
            payload: res.data
        })
        
    } catch (err) {
        console.log(err)
        /* dispatch({
            type: DINER_ERROR,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        }) */
    }
}

//Delete DINER
export const deleteDiner = (id) => async dispatch => {  

    try {

        await axios.delete(`http://localhost:5000/api/diners/${id}`)
    
        dispatch({
            type: DELETE_DINER,
            payload: id
        })

        dispatch(setAlert('diner deleted', 'success'))    
        
    } catch (err) {
        if(err.response){
            dispatch({
                type: DINER_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    } 
}

//Add DINER
export const addDiner = formData => async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`http://localhost:5000/api/diners/`, formData, config)
        console.log(res)
        dispatch(setAlert('diner created', 'success'))
            
        dispatch({
            type: ADD_DINER,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: DINER_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

//Add DINER
export const updateDiner = (id,formData) => async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.put(`http://localhost:5000/api/diners/${id}`, formData, config)
    
        dispatch(setAlert('diner updated', 'success'))
            
        dispatch({
            type: UPDATE_DINER,
            payload: res.data
        })

    } catch (err) {

        if(err.response){
            dispatch({
                type: DINER_ERROR,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}