import {wordsApi} from "../../api/api";

const initialState = [
    {
        id: "0",
        name: "fakeWord0"
    },
    {
        id: "1",
        name: "fakeWord1"
    }
];

const SET_WORDS = "SET_WORDS";
export const setWords = (words) => ({type: SET_WORDS, words});

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_WORDS:
            return action.words;
        default:
            return state;
    }
}

export const getWords = (limit) => dispatch => {
    wordsApi.requestWords(limit)
        .then(res => {
            if(res.status === 200) {
                dispatch(setWords(res.data));
            }
        });
}
