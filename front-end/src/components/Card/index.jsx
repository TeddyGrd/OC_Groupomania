import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../../utils/utils'
import { PostUpdate } from '../../actions/post'
import { PostDelete } from '../../actions/post'
import Like from '../../components/like/like'
import colors from '../../utils/style/colors'
import { dateParser } from '../../utils/utils'

const CardContenair = styled.li`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid black;
  margin: 10px;
  padding: 10px;
  margin: 8px auto;
  position: relative;
  min-height: 100px;
`
const CardFigure = styled.figure`
  margin: 0px;
`
const CardWrapper = styled.div`
  width: 100%;
`
const UserPicture = styled.img`
  object-fit: cover;
  max-width: 85px;
  max-height: 85px;
  border-radius: 45px;
  margin: 5px 5px 5px 5px;
  position: relative;
`
const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px;
  min-height: 35px;
`
const UserName = styled.h2`
  margin: 0px 0px 0px 20px;
`
const CardDivPost = styled.div`
  margin: 10px 10px 10px 17px;
`
const CardPost = styled.p`
  margin: 0px 0px 30px 0px;
`
const CardPicture = styled.img`
  max-height: 400px;
  max-width: 100%;
  object-fit: cover;
  align-self: center;
  border-radius: 10px;
`
const CardDivButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 15px;
`
const CardButton = styled.div`
  margin-right: 20px;
  cursor: pointer;
  font-size: 20px;
  transition-duration: 250ms;
  :hover {
    color: ${colors.secondary};
  }
`
const CardDivButtonMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const CardDivButtonAdmin = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`
const CardButtonAdmin = styled.div`
  margin-right: 20px;
  cursor: pointer;
  font-size: 20px;
  color: ${colors.secondary};
  transition-duration: 250ms;
  :hover {
    color: black;
  }
`
const CardDateP = styled.p`
  margin: 0px 0px 5px 25px;
  font-size: 14px;
`

const Card = ({ posts }) => {
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)
  const [Update, setUpdate] = useState(false)
  const [updateTextPost, setupdateTextPost] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {}, [usersData])

  const UpdateCard = () => {
    if (updateTextPost) {
      dispatch(PostUpdate(posts._id, updateTextPost))
    }
    setUpdate(false)
  }

  const DeleteCard = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      dispatch(PostDelete(posts._id))
    }
  }

  return (
    <CardContenair key={posts._id}>
      <>
        <CardFigure>
          <UserPicture
            src={
              !isEmpty(usersData[0]) &&
              usersData
                .map((user) => {
                  if (user._id === posts.posterId) return user.imageUrl
                })
                .join('')
            }
            alt="profilPicture"
          />
        </CardFigure>
        <CardWrapper>
          <CardHeader>
            <UserName>
              {!isEmpty(usersData[0]) &&
                usersData.map((user) => {
                  if (user._id === posts.posterId) return user.username
                })}
            </UserName>
            <CardDateP>{dateParser(posts.createdAt)}</CardDateP>
          </CardHeader>
          <CardDivPost>
            {Update === false && <CardPost>{posts.post}</CardPost>}

            {Update && (
              <div className="updateMessage">
                <textarea
                  id="updateMessageTextarea"
                  defaultValue={posts.post}
                  onChange={(e) => setupdateTextPost(e.target.value)}
                />
                <div className="btnMessageUpdate">
                  <button className="btn" id="btnMssg" onClick={UpdateCard}>
                    Valider vos modifications
                  </button>
                </div>
              </div>
            )}

            {posts.picture && (
              <CardPicture
                src={posts.picture}
                alt="card-pic"
                className="card-pic"
              />
            )}
          </CardDivPost>
          <CardDivButtonMain>
            {userData.admin === 1 && (
              <CardDivButtonAdmin>
                <CardButtonAdmin>
                  <span onClick={() => setUpdate(true)}>
                    <i
                      className="fa-regular fa-pen-to-square"
                      id="logoEdit"
                    ></i>
                  </span>
                </CardButtonAdmin>

                <CardButtonAdmin
                  onClick={() => {
                    DeleteCard()
                  }}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </CardButtonAdmin>
              </CardDivButtonAdmin>
            )}
            <CardButton>
              <Like post={posts} />
            </CardButton>
            {userData._id === posts.posterId && (
              <CardDivButton>
                <CardButton>
                  <span onClick={() => setUpdate(true)}>
                    <i
                      className="fa-regular fa-pen-to-square"
                      id="logoEdit12"
                    ></i>
                  </span>
                </CardButton>

                <CardButton
                  onClick={() => {
                    DeleteCard()
                  }}
                >
                  <i
                    className="fa-regular fa-trash-can"
                    id="logoDeletePost"
                  ></i>
                </CardButton>
              </CardDivButton>
            )}
          </CardDivButtonMain>
        </CardWrapper>
      </>
    </CardContenair>
  )
}

export default Card
