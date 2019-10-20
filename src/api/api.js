import axios from "axios";

const baseURL = "https://127.0.0.1:5000/";

// let instance = axios.create({
//     baseURL
// });

export const getAuthHeader = () => {
    return {
        "Authorization": "Bearer " + localStorage.getItem("access_token")
    }
}