import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../Context/AppContext'
import { useDispatch } from 'react-redux'
import { PostLike, PostDislike } from '../../actions/post'

const Like = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true)
    else setLiked(false)
  }, [uid, post.likers, liked])

  const like = () => {
    dispatch(PostLike(post._id, uid))
    setLiked(true)
  }
  const unlike = () => {
    dispatch(PostDislike(post._id, uid))
    setLiked(false)
  }

  return (
    <div className="ContenaireLike">
      {uid && liked === false && (
        <i className="fa-solid fa-heart" onClick={like}></i>
      )}
      {uid && liked && <i className="fa-solid fa-heart" onClick={unlike}></i>}
      <span className="numberLike">{post.likers.length}</span>
    </div>
  )
}

export default Like
