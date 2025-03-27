import axios from "axios";
import Dummy from '@/data/Dummy';

const axiosClient = axios.create({
      baseURL: 'http://localhost:3000/api/v1/'
})

const getUserResumes = (email) => axiosClient.get('/userResume', {
      params: { email }
})

const updateResumeDetail = (resumeId, data) => axiosClient.put('/userResume/'+resumeId, data)

const getResumeById = async (resumeId) => {
      try {
            const response = await axiosClient.get('/userResume/' + resumeId);
            console.log(response)
            return response;

      } catch (error) {
            // If resume not found or error, return dummy data
            return { data: Dummy };
      }
}

const createNewResume = async (email, title) => {
      try {
            const response = await axiosClient.post('/userResume', { email, title });
            return response;
      } catch (error) {
            console.error('Error creating resume:', error);
            throw error;
      }
}

const deleteResumeById = async (resumeId) => {
      try {
            const response = await axiosClient.delete('/userResume/' + resumeId);
            return response;
      } catch (error) {
            console.error('Error deleting resume:', error);
            throw error;
      }
}

const GlobalApi = {
      getUserResumes,
      updateResumeDetail,
      getResumeById,
      createNewResume,
      deleteResumeById
}

export default GlobalApi;