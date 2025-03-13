import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://localhost:5002/api",
    withCredentials:true
})

export default axiosInstance;