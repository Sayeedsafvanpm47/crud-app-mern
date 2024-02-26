import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const registerUser = (userData)=> {
          return axios.post(`${API_BASE_URL}/api/register`,userData)
}