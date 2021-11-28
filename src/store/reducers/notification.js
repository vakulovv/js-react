const initState = {
    isOpen: false,
};

const notificationReducer = (state = initState, action) => {
    switch (action.type) {
        case "NOTIFICATION_SHOW":
            const typeMap = {
                success: "success",
                danger: "danger",
            };
            console.log("NOTIFICATION_SHOW", action);
            return {
                ...state,
                title: action.title,
                body: action.body,
                type: typeMap[action.typeNotification] || "success",
                isOpen: true,
            };
        case "NOTIFICATION_HIDE":
            console.log("NOTIFICATION_HIDE");
            return {
                ...state,
                isOpen: false,
            };
        default:
            return state;
    }
    return state;
};

export default notificationReducer;
