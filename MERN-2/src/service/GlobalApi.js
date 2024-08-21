import axios from "axios";

const axiosClient = axios.create({
      baseURL: 'http://localhost:3000/api/v1/'
})

const getUserResumes = (email)=>axiosClient.get('/userResume', {
      params: { email }
})

export default {
      getUserResumes
}