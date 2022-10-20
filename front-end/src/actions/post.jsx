import axios from 'axios'

export const GET_POST = 'GET_POST'
export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const POST_LIKE = 'POST_LIKE'
export const POST_DISLIKE = 'POST_DISLIKE'

export const getPost = (num) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:8080/api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num)
        dispatch({ type: GET_POST, payload: array })
        dispatch({ type: GET_ALL_POSTS, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const createPost = (data) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `http://localhost:8080/api/post/`,
      data: data,
      withCredentials: true,
    })
  }
}

export const PostUpdate = (postId, post) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `http://localhost:8080/api/post/${postId}`,
      data: { post },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { post, postId } })
      })
      .catch((err) => console.log(err))
  }
}

export const PostDelete = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `http://localhost:8080/api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } })
      })
      .catch((err) => console.log(err))
  }
}

export const PostLike = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `http://localhost:8080/api/post/like/${postId}`,
      data: { id: userId },
    })
      .then(() => {
        dispatch({ type: POST_LIKE, payload: { userId, postId } })
      })
      .catch((err) => console.log(err))
  }
}

export const PostDislike = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `http://localhost:8080/api/post/dislike/${postId}`,
      data: { id: userId },
    })
      .then(() => {
        dispatch({ type: POST_DISLIKE, payload: { userId, postId } })
      })
      .catch((err) => console.log(err))
  }
}
