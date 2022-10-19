import axios from 'axios'

export const GET_USER = 'GET_USER'
export const UPLOAD_PICTURE_PROFIL = 'UPLOAD_PICTURE_PROFIL'
export const DELETE_USER = 'DELETE_USER'
export const ADMIN_USER = 'ADMIN_USER'

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}
export const sendPictureProfil = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`http://localhost:8080/api/user/upload`, data)
      .then((res) => {
        return axios.get(`http://localhost:8080/api/user/${id}`).then((res) => {
          dispatch({ type: UPLOAD_PICTURE_PROFIL, payload: res.data.imageUrl })
        })
      })
      .catch((err) => console.log(err))
  }
}

export const UserDelete = (userId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `http://localhost:8080/api/user/admin/${userId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: { userId } })
      })
      .catch((err) => console.log(err))
  }
}

export const UserAdmin = (userId, admin) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `http://localhost:8080/api/user/admin-add/${userId}`,
    })
      .then((res) => {
        dispatch({ type: ADMIN_USER, payload: { userId } })
      })
      .catch((err) => console.log(err))
  }
}
