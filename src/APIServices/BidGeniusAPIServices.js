import axios from "axios"

const BaseUrl = "http://localhost:8000/"

function LoginAPI(data){
    const RelativeUrl = `${BaseUrl}access/`
    axios.post(RelativeUrl, data).then(
        (response)=>{
            if(response.status===200){
                return response.data
            }
        }
    ).catch(
        (error)=>{
            console.error(error)
        }
    )
}