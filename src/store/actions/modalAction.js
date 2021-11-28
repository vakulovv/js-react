import "firebase/firestore"

export const toggleModal =  (isOpen = false, content = null) => {
    return  (dispatch) => {
        if (isOpen) {
            const {title, body} = content;
            dispatch({type: 'MODAL_SHOW', title: title, body: body});
        } else {
            dispatch({type: 'MODAL_HIDE'});
        }
    }
}

