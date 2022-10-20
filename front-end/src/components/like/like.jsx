import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../Context/AppContext'
import { useDispatch } from 'react-redux'
import { PostLike, PostDislike } from '../../actions/post'

const Like = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(PostLike(post._id, uid))
    setLiked(true)
    window.location.reload()
  }
  const unlike = () => {
    dispatch(PostDislike(post._id, uid))
    setLiked(false)
    window.location.reload()
  }

  useEffect(() => {
    if (post.likers.includes(uid)) {
      setLiked(true)
    } else setLiked(false)
  }, [uid, post, liked])

  return (
    <div>
      {uid && liked === false && (
        <i className="fa-solid fa-heart" onClick={like}></i>
      )}
      {uid && liked && <i className="fa-solid fa-heart" onClick={unlike}></i>}
      <span>{post.likers.length}</span>
    </div>
  )
}

export default Like
