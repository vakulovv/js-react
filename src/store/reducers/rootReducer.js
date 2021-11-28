import authReducer from "./authReducer";
import { combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import projectReducer from "./projectReducer";
import 'firebase/firestore';
import { firestoreReducer } from 'redux-firestore'
import userReducer from "./userReducer";
import notificationReducer from "./notification";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    users: userReducer,
    notification: notificationReducer,
    modal: modalReducer,

})

export default rootReducer;