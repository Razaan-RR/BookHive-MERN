// import axios from 'axios';

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:3000',
//     // You can add headers or other configurations here
// });
// const useAxiosSecure = () => {
//     return axiosSecure;
// };

// export default useAxiosSecure;
import axios from 'axios'
import { getAuth } from 'firebase/auth'

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
})

// Add a request interceptor to include Firebase token
axiosSecure.interceptors.request.use(async (config) => {
  const auth = getAuth()
  const user = auth.currentUser

  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const useAxiosSecure = () => {
  return axiosSecure
}

export default useAxiosSecure
