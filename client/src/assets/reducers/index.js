import { combineReducers } from "redux";
import alert from './alert'
import auth from './auth'
import diner from './diners'


export default combineReducers({
    alert,
    auth,
    diner
})