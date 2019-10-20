import axios from "axios";
import {getAuthHeader} from "./api";

export default {
    requestWords(limit = 2) {
        return axios.get(`https://127.0.0.1:5000/words?limit=${limit}`, {
            headers: getAuthHeader()
        });
    },
    deleteWord(wordId) {
        if(wordId) {
            return axios.delete("https://127.0.0.1:5000/words?wordId=" + wordId, {
                headers: getAuthHeader()
            });
        }
    },
    addWord(wordFormData) {
        return axios.post("https://127.0.0.1:5000/words", wordFormData, {
            headers: getAuthHeader()
        });
    },
    editWord(wordFormData) {
        return axios.put("https://127.0.0.1:5000/words", wordFormData, {
            headers: getAuthHeader()
        });
    }
};
