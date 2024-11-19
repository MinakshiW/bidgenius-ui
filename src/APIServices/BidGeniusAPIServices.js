






import axios from "axios"

const BaseUrl = "http://localhost:8000/"

const AI = axios.create({
    baseURL: BaseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})



const AI2 = axios.create({
    baseURL: BaseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})


export {AI, AI2}

