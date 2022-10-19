import {
  GET_USER,
  UPLOAD_PICTURE_PROFIL,
  DELETE_USER,
  ADMIN_USER,
} from '../actions/user'

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case UPLOAD_PICTURE_PROFIL:
      return {
        ...state,
        imageUrl: action.payload,
      }
    case DELETE_USER:
      return state.filter((user) => user._id !== action.payload.userId)

    case ADMIN_USER:
      return state.filter((user) => user._id !== action.payload.userId)
    default:
      return state
  }
}
