import {wordsApi} from "../../api/api";
import {setNotifications} from "./notificationsReducer";

// {
//     words: [
//         {
//             id: "0",
//             word: "fakeWord0"
//         }
//     ],
// }

const initialState = {
    words: [],
    isFetching: false,
    wordsFormMessages: []
};

// ACTIONS
const SET_WORDS = "SET_WORDS";
export const setWords = (words) => ({type: SET_WORDS, words});

const REMOVE_WORD = "REMOVE_WORD";
export const removeWord = wordId => ({type: REMOVE_WORD, wordId});

const PUSH_WORD = "PUSH_WORD";
export const pushWord = (word) => ({type: PUSH_WORD, word});

const SET_FETCHING = "SET_FETCHING";
export const setFetching = (state) => ({type: SET_FETCHING, state});

const SET_WORDS_FORM_MESSAGES = "SET_WORDS_FORM_MESSAGES";
export const setWordsFormMessages = (messages) => ({type: SET_WORDS_FORM_MESSAGES, messages});

// THUNKS
export const notifyNoWords = (words) => dispatch => {
    if(words.length === 0)
    dispatch(setNotifications("words", [{type: "", title: "You have no words"}]))
};

export const deleteWord = wordId => dispatch => {
    wordsApi.deleteWord(wordId)
        .then(res => {
            if(res.status === 204) {
                dispatch(removeWord(wordId));
            }
        })
        .catch(err => console.log(err.response));
};

export const addWord = (wordFormData) => ({
    type: "withCreds",
    thunk: dispatch => {
        wordsApi.addWord(wordFormData)
            .then(res => {
                if(res.status === 201) {
                    dispatch(pushWord(res.data));
                }
            })
            .catch(err => {
                console.log(err.response)
                let errorMessage;
                if(err.response && err.response.status === 400 && (errorMessage = err.response.data.message)) {
                    // dispatch(setNotifications("words",
                    //     Object.keys(errorMessage).map((key) => ({
                    //         type: "error",
                    //         title: key,
                    //         message: errorMessage[key]
                    //     }))    
                    // ));
                    dispatch(setWordsFormMessages(
                        Object.keys(errorMessage).map((key) => ({
                            title: key,
                            message: errorMessage[key]
                        }))
                    ));
                }
            });
    }
});

export const requestEditWord = (word) => ({
    type: "withCreds",
    thunk: dispatch => {
        wordsApi.editWord(word)
        .then(res => {
            console.log(res);
            if(res.status === 200) {
                dispatch(editWord(res.data));
            }
        })
        .catch(err => console.log(err));
        // console.log(word);
    }
})

const EDIT_WORD = "EDIT_WORD";
export const editWord = (word) => ({type: EDIT_WORD, word});

export const getWords = (limit) => ({
    type: "withCreds",
    thunk: dispatch => {
        dispatch(setFetching(true));
        wordsApi.requestWords(limit)
        .then(res => {
            if(res.status === 200) {
                dispatch(setNotifications("words", []));
                res.data.length !== 0 && dispatch(setWords(res.data));
                dispatch(setFetching(false));
            }
        })
        .catch(err => {
            dispatch(setFetching(false));
            dispatch(setNotifications("words", [{type: "error", title: "Can't load words", message: "No connection with server"}]));
            console.log(err.response)
        });
    }
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.state
            }
        case EDIT_WORD: {
            return {
                ...state,
                words: state.words.map(item => {
                    if(item.id === action.word.id) {
                        return action.word;
                    }
                    return item;
                })
            };
        }
        case PUSH_WORD:
            return {
                ...state,
                words: [
                    ...state.words,
                    action.word
                ]
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
        case SET_WORDS_FORM_MESSAGES:
            return {
                ...state,
                wordsFormMessages: action.messages
            };
        default:
            return state;
    }
};