import axios from "axios";
import Dummy from '@/data/Dummy';

const axiosClient = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/signin';
    } else if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 500) {
      throw new Error('Server error occurred');
    } else if (!error.response) {
      throw new Error('Network error - please check your connection');
    }
    return Promise.reject(error);
  }
);

// Public endpoints (no auth required)
const login = (data) => axiosClient.post('/user/login', data);
const register = (data) => axiosClient.post('/user/register', data);
const googleAuth = (credential) => axiosClient.post('/user/google', { credential });

// Protected endpoints (auth required)
const getUserResumes = (params) => axiosClient.get('/userResume', { params });
const createResume = (data) => axiosClient.post('/userResume', data);
const updateResume = (id, data) => axiosClient.put(`/userResume/${id}`, data);
const deleteResume = (id) => axiosClient.delete(`/userResume/${id}`);
const getResumeById = (id) => axiosClient.get(`/userResume/${id}`);
const updateResumeDetail = (id, data) => axiosClient.put(`/userResume/${id}`, data);

const createNewResume = async (email, title) => {
      try {
            if (!email || !title) {
                  throw new Error('Email and title are required');
            }
            const response = await axiosClient.post('/userResume', { email, title });
            return response;
      } catch (error) {
            console.error('Error creating resume:', error);
            throw new Error(error.message || 'Failed to create resume');
      }
}

const deleteResumeById = async (resumeId) => {
      try {
            if (!resumeId) {
                  throw new Error('Resume ID is required');
            }
            const response = await axiosClient.delete(`/userResume/${resumeId}`);
            return response;
      } catch (error) {
            console.error('Error deleting resume:', error);
            throw new Error(error.message || 'Failed to delete resume');
      }
}

const GlobalApi = {
  login,
  register,
  googleAuth,
  getUserResumes,
  createResume,
  updateResume,
  deleteResume,
  getResumeById,
  createNewResume,
  deleteResumeById,
  updateResumeDetail
};

export default GlobalApi;