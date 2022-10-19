import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../../utils/utils'
import { getPost } from '../../actions/post'

const ThreadUl = styled.ul`
  padding: 0px;
  margin: 0px;
`

const Thread = () => {
  const [postLoad, setpostLoad] = useState(true)
  const [numberPost, setNumberPost] = useState(8)
  const dispatch = useDispatch()
  const displayPost = useSelector((state) => state.postReducer)

  const displayMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    )
      return setpostLoad(true)
  }

  useEffect(() => {
    if (postLoad) {
      dispatch(getPost(numberPost))
      setpostLoad(false)
      setNumberPost(numberPost + 8)
    }
    window.addEventListener('scroll', displayMore)
    return () => window.removeEventListener('scroll', displayMore)
  }, [postLoad, dispatch, numberPost])

  return (
    <div className="displayPost">
      <ThreadUl>
        {!isEmpty(displayPost[0]) &&
          displayPost.map((posts) => {
            return <Card posts={posts} key={posts._id} />
          })}
      </ThreadUl>
    </div>
  )
}

export default Thread
