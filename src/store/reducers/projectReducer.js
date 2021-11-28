import {FETCH_PROJECTS_BEGIN, FETCH_PROJECTS_SUCCESS} from "../actions/projectActions";

const initState = {
    data: [],
    loading: false,
    showList: false,
    size: 0,
    error: null
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created project', action)

            return {
                ...state,
            }
        case FETCH_PROJECTS_BEGIN:
            console.log("FETCH_PROJECTS_BEGIN")
            return {
                ...state,
                loading: true,
                showList: action.showList,
                error: null

            }
        case FETCH_PROJECTS_SUCCESS:
            console.log('FETCH_PROJECT', action);

            return {
                ...state,
                data: action.isAppend
                    ? [...state.data, ...action.payload]
                    : action.payload,
                size: action.count,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
    return state;
}

export default projectReducer;
