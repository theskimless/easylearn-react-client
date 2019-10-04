const initialState = {
    app: [],
    words: []
};

const SET_NOTIFICATION = "SET_NOTIFICATION";
export const setNotifications = (page, notifications) => ({type: SET_NOTIFICATION, page, notifications});

const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const clearNotifications = (page) => ({type: CLEAR_NOTIFICATIONS, page});

export default (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                [action.page]: []
            }
        case SET_NOTIFICATION:
            return {
                ...state,
                [action.page]:action.notifications
            }
        default:
            return state;
    }
}