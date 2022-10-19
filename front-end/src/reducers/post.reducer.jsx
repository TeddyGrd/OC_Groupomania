import {
  GET_POST,
  UPDATE_POST,
  DELETE_POST,
  POST_LIKE,
  POST_DISLIKE,
} from '../actions/post'

const initialState = {}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return action.payload
    case POST_LIKE:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          }
        }
        return post
      })
    case POST_DISLIKE:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          }
        }
        return post
      })
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            post: action.payload.post,
          }
        } else return post
      })
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId)
    default:
      return state
  }
}
