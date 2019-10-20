import axios from "axios";
import {getAuthHeader} from "./api";

export default {
    addWordToList(wordId, listId) {
        console.log(wordId);
        return axios.post(`https://127.0.0.1:5000/lists/${listId}/words`, {wordId}, {
            headers: getAuthHeader()
        });
    },
    getLists(with_words_id) {
        return axios.get(`https://127.0.0.1:5000/lists?with_words_id=${with_words_id}`, {
            headers: getAuthHeader()
        });
    },
    addList(list) {
        return axios.post("https://127.0.0.1:5000/lists", list, {
            headers: getAuthHeader()
        });
    },
    editList(list) {
        return axios.put("https://127.0.0.1:5000/lists", list, {
            headers: getAuthHeader()
        });
    },
    deleteList(listId) {
        return axios.delete("https://127.0.0.1:5000/lists?listId=" + listId, {
            headers: getAuthHeader()
        });
    }
};