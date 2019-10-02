import {wordsApi} from "../../api/api";

// {
//     words: [
//         {
//             id: "0",
//             name: "fakeWord0"
//         }
//     ],
//     error: ""
// }

const initialState = {
    words: [],
    notifications: []
};

const SET_WORDS = "SET_WORDS";
export const setWords = (words) => ({type: SET_WORDS, words});

const REMOVE_WORD = "REMOVE_WORD";
export const removeWord = wordId => ({type: REMOVE_WORD, wordId});

//SET INSTEAD
const SET_NOTIFICATION = "SET_NOTIFICATION";
export const setNotifications = notifications => ({type: SET_NOTIFICATION, notifications});

const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const clearNotifications = () => ({type: CLEAR_NOTIFICATIONS});

export const deleteWord = wordId => dispatch => {
    wordsApi.deleteWord(wordId)
        .then(res => {
            if(res.status === 204) {
                dispatch(removeWord(wordId));
            }
        })
        .catch(err => console.log(err.response));
}

export const getWords = (limit) => dispatch => {
    wordsApi.requestWords(limit)
        .then(res => {
            if(res.status === 200) {
                dispatch(setNotifications([]));
                dispatch(setWords(res.data));
            }
        })
        .catch(err => {
            dispatch(setNotifications([{type: "error", title: "error", message: "No connection with server"}]));
            console.log(err.response)
        });
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                notifications: []
            }
        case SET_NOTIFICATION:
            return {
                ...state,
                notifications: action.notifications
            }
        case REMOVE_WORD:
            return {
                ...state,
                words: state.words.filter(item => (item.id === action.wordId) ? false : true)
            }
        case SET_WORDS:
            return {
                ...state,
                words: action.words
            };
        default:
            return state;
    }
}