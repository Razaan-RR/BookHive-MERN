// // save or update uses in db

// import axios from "axios"

// export const saveOrUpdateUser = async (userData) => {
//     const {data} = await axios.post(`${import.meta.env.REACT_APP_IMAGE_HOST_KEY}/users`, userData)
//     return data;
// }

// save or update user in db
import axios from 'axios'

export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    'https://book-hive-server-pink.vercel.app/user',
    userData
  )
  return data
}
