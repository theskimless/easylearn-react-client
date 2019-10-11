import axios from "axios";
// import {KJUR, b64utoutf8} from "jsrsasign";

const baseURL = "https://127.0.0.1:5000/";

// let instance = axios.create({
//     baseURL
// });

export const wordsApi = {
    requestWords(limit = 2) {
        return axios.get(`https://127.0.0.1:5000/words?limit=${limit}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        });
    },
    deleteWord(wordId) {
        if(wordId) {
            return axios.delete("https://127.0.0.1:5000/words?wordId=" + wordId, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token")
                }
            });
        }
    },
    addWord(wordFormData) {
        return axios.post("https://127.0.0.1:5000/words", wordFormData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        });
    },
    editWord(wordFormData) {
        return axios.put("https://127.0.0.1:5000/words", wordFormData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        });
    }
};

export const auth = {
    getUserInfo() {
        return axios.get("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        });
    },
    checkIfRegistered() {
        console.log("CHECK IF REGISTERED");
        return axios.get("https://127.0.0.1:5000/login", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        });
    },
    requestToken(authorizationCode) {
        return new Promise((resolve, reject) => {
            let form = new FormData();
            
            form.append("code", authorizationCode);
            form.append("client_id", "632277419807-7k3fohav6n5dtrbhdrrga12vipr22qi5.apps.googleusercontent.com");
            form.append("client_secret", "gb-xu0MzAu4dFr8dAkJCc-hk");
            form.append("redirect_uri", "http://localhost:3000/login/callback");
            form.append("grant_type", "authorization_code");
            axios.post("https://oauth2.googleapis.com/token", form)
            .then(res => {
                    console.log(res);
                    if(res.status === 200) {
                        localStorage.setItem("access_token", res.data["access_token"]);
                        localStorage.setItem("refresh_token", res.data["refresh_token"]);
                        localStorage.setItem("expires_in", res.data["expires_in"] * 1000 + Date.now());
                        
                        console.log("HERE WE TRY TO REGISTER");
                        //REGISTER IN DB
                        axios.post("https://127.0.0.1:5000/login", {}, {
                            headers: {
                                "Authorization": "Bearer " + res.data["access_token"]
                            }
                        })
                            .then(res => console.log(res))
                            .catch(res => console.log(res.response));

                        resolve(res.status);
                    } 
                    // else if(res.status === 401) {

                    // }
                });
        });
    },
    refreshToken() {
        return new Promise((resolve, reject) => {
            let form = new FormData();
            form.append("client_id", "632277419807-7k3fohav6n5dtrbhdrrga12vipr22qi5.apps.googleusercontent.com");
            form.append("client_secret", "gb-xu0MzAu4dFr8dAkJCc-hk");
            form.append("grant_type", "refresh_token");
            form.append("refresh_token", localStorage.getItem("refresh_token"));
            axios.post("https://oauth2.googleapis.com/token", form)
                .then(res => {
                    console.log(res);
                    if(res.status === 200) {
                        localStorage.setItem("access_token", res.data["access_token"]);
                        localStorage.setItem("expires_in", res.data["expires_in"] * 1000 + Date.now());
                        
                        resolve();
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    reject();
                });
        });
    },
    revokeToken() {
        let token = localStorage.getItem("access_token");
        localStorage.clear();
        return axios.get(`https://accounts.google.com/o/oauth2/revoke?token=${token}`);
    }
};