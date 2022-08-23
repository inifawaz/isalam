import Axios from "axios";

export const axios = Axios.create({
    baseURL: "https://api.isalamwakaf.com/api",
    "Content-Type": "application/json",
    Accept: "application/json",
});
