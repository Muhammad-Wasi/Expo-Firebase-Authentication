import ActionTypes from '../Constant/Constant';
// import firebase from '../../Config'
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAE6vqCmAU6iA43phS2y7b8vqAC2m6G7AY",
    authDomain: "chat-room-935bb.firebaseapp.com",
    databaseURL: "https://chat-room-935bb.firebaseio.com",
    projectId: "chat-room-935bb",
    storageBucket: "chat-room-935bb.appspot.com",
    messagingSenderId: "967204331612"
};
firebase.initializeApp(config);



export function signinAction(user) {
    return function (dispatch) {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((success) => {
                    console.log('success', success)
                    resolve(success)
                })
                .catch((error) => {
                    console.log('error', error)
                    reject(error.message)
                })
            // console.log('user', user);
        })
    }
}



export function signupAction(user) {
    return dispatch => {
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(success => {
                    console.log('success', success)
                    resolve(success)
                })
                .catch(error => {
                    console.log('error', error)
                    reject(error.message)
                })

        })
        // firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        //     .then(success => {
        //         console.log('success', success)

        //     })
        //     .catch(error => {
        //         console.log('error', error)
        //     })
    }
}






export function loginRequest(data) {
    return function (dispatch) {
        return new Promise(function (resolve, reject) {
            {
                dispatch({
                    type: LOGIN_REQUEST
                })
                // API
                HTTP('post', 'auth/login', data)
                    .then(function (response) {
                        console.log("login user response: ", response.data);
                        dispatch({
                            type: LOGIN_SUCCESS,
                            data: response.data
                        })
                        resolve(response.data);
                    })
                    .catch(error => {
                        console.log("error: ", error.message);
                        dispatch({
                            type: LOGIN_FAIL
                        })
                        reject(error.response);
                        checkInternetConnection(error)
                    })
            }
        })
    }
}