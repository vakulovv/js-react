const initState = {
    isOpen: false,
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case "MODAL_SHOW":

            console.log("MODAL_SHOW", action);
            return {
                ...state,
                title: action.title,
                body: action.body,
                isOpen: true,
            };
        case "MODAL_HIDE":
            console.log("MODAL_HIDE");
            return {
                ...state,
                isOpen: false,
            };
        default:
            return state;
    }
    return state;
};

export default modalReducer;
