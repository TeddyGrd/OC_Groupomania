import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { UidContext } from '../../components/Context/AppContext'
import { createPost, getPost } from '../../actions/post'
import { useDispatch, useSelector } from 'react-redux'
import Thread from '../../components/thread'

document.body.style.background = `${colors.tertiary}`
document.body.style.margin = '0px'

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 15px 10px 0px 10px;
`
const ContenueWrapper = styled.div`
  margin: 0px;
`

const HomeTitle = styled.h2`
  text-align: left;
  margin: 20px 500px 15px 30px;
  color: white;
  font-size: 40px;
  text-align: center;
`

const HomeForm = styled.form`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${colors.tertiary};
`
const HomeLabel = styled.label`
  color: white;
  display: flex;
  flex-direction: column;
  margin: 10px 0px 6px 0px;
  align-self: center;
`
const HomeTextarea = styled.textarea`
  border-radius: 10px;
  align-self: center;
  resize: none;
  text-align: center;
  max-width: 400px;
  min-width: 300px;
  height: 75px;
  font-size: 16px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
`

const HomeDivButton = styled.div`
  text-align: center;
  color: white;
  margin: 6px 0px 20px 0px;
  height: 40px;
`

const HomeButton = styled.button`
  background: radial-gradient(${colors.secondary}, ${colors.primary});
  width: 135px;
  height: 45px;
  font-size: 18px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: 400ms ease;
  margin-top: 3px;
  :hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);
    transform: translateY(-3px);
  }
`
const HomePrincipal = styled.div`
  border-right: 2px solid black;
  border-left: 2px solid black;
  border-top: 2px solid black;
  border-radius: 15px;
  background: #9fa0a8;
  margin: auto;
`
const HomeRedirection = styled.div`
  margin: auto;
  top: 20%;
  left: 20%;
  right: 20%;
  background: #5a5c6e;
  position: fixed;
  padding: 50px;
  z-index: 1;
  border-radius: 15px;
  font-size: 22px;
  text-align: center;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
`
const HomeP = styled.p`
  color: white;
`
const HomeA = styled.a`
  text-decoration: none;
  color: ${colors.primary};
`

const UploadImgInput = styled.input`
  color: white;
  padding: 5px;
  margin: 10px auto 0px auto;
  transition-duration: 200ms;
  border: 2px solid ${colors.tertiary};
  background: ${colors.tertiary};
  text-align: center;
  cursor: pointer;
  width: 300px;
  :hover {
    color: ${colors.primary};
    border: 2px solid white;
    border-radius: 5px;
  }
`

function Home() {
  const Uid = useContext(UidContext)
  const [sendMessage, setSendMessage] = useState('')
  const [file, setFile] = useState('')
  const [sendPicture, setPostPicture] = useState(null)

  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const handlePost = async () => {
    if (sendMessage || sendPicture || file) {
      const data = new FormData()
      data.append('posterId', userData._id)
      data.append('message', sendMessage)
      if (file) data.append('file', file)
      await dispatch(createPost(data))
      dispatch(getPost())
      handleCancel()
    } else {
      alert('veuillez écrire un message')
    }
  }

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const handleCancel = () => {
    setSendMessage('')
    setPostPicture('')
    setFile('')
  }
  return (
    <ContenueWrapper>
      <HomeTitle>Accueil</HomeTitle>
      <HomeWrapper id="test">
        {Uid ? (
          <>
            <HomeForm>
              <HomeLabel htmlFor="post">
                <p>Exprimez-vous !</p>
                <HomeTextarea
                  type="text"
                  onChange={(e) => setSendMessage(e.target.value)}
                  value={sendMessage}
                  required
                  id="post"
                  name="post"
                />
              </HomeLabel>
              <UploadImgInput
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
              <HomeDivButton>
                <HomeButton type="button" onClick={handlePost}>
                  Poster
                </HomeButton>
              </HomeDivButton>
            </HomeForm>

            <HomePrincipal>
              <Thread />
            </HomePrincipal>
          </>
        ) : (
          <HomeRedirection>
            <HomeP>
              Vous n'êtez pas connecté cliquée
              <HomeA href="/auth/login"> ici </HomeA>
              pour vous connecter
            </HomeP>
          </HomeRedirection>
        )}
      </HomeWrapper>
    </ContenueWrapper>
  )
}
export default Home
