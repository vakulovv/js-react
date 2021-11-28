import {reduxFirestore, getFirestore, createFirestoreInstance} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import "firebase/firestore"

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((error) => {
            dispatch({type: 'LOGIN_ERROR', error})
        });
    }
}

export const signOut = () =>  {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" })
        })

    }
}

export const myChange = () =>  {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'CHANGE_SUCCESS'})
         return true;
    }
}

export const signUp = (newUser) =>  {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('user').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastname,
                initials: newUser.firstName[0] + newUser.lastName[0],
                city: newUser.city,
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(error => {
            dispatch({type: 'SIGNUP_ERROR', error})
        })

    }
}