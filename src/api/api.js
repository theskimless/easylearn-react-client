import axios from "axios";

let instance = axios.create({
    baseURL: "https://127.0.0.1:5000/"
});

export const wordsApi = {
    requestWords(limit = 2) {
        return instance.get(`words?limit=${limit}`);
    }
}

export const auth = {
    requestToken(authorizationCode) {
        let form = new FormData();
        form.append("code", authorizationCode);
        form.append("client_id", "632277419807-7k3fohav6n5dtrbhdrrga12vipr22qi5.apps.googleusercontent.com");
        form.append("client_secret", "gb-xu0MzAu4dFr8dAkJCc-hk");
        form.append("redirect_uri", "http://localhost:3000/login");
        form.append("grant_type", "authorization_code");
        return axios.post("https://oauth2.googleapis.com/token", form);
    }
}