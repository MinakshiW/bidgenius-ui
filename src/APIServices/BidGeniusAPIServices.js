






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






   






// import axios from "axios"

// const BaseUrl = "http://localhost:8000/"

// function LoginAPI(data){
//     const RelativeUrl = `${BaseUrl}access/`
//     axios.post(RelativeUrl, data).then(
//         (response)=>{
//             if(response.status===200){

//                 const {access,refresh} = response.data
//                 sessionStorage.setItem("access",access)
//                 sessionStorage.setItem("refresh",refresh)
//                 return response.data

                
//             }
//         }
//     ).catch(
//         (error)=>{
//             console.error(error)
//         }
//     )
// }