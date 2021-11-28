import "firebase/firestore"

export const toggleNotification =  (content = null, isOpen = false) => {
    return  (dispatch) => {
        if (isOpen) {
            const {title, body, type} = content;
            dispatch({type: 'NOTIFICATION_SHOW', title: title, body: body, typeNotification: type});
        } else {
            dispatch({type: 'NOTIFICATION_HIDE'});
        }
    }
}

