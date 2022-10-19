import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendPictureProfil } from '../../actions/user'
import colors from '../../utils/style/colors'
import styled from 'styled-components'

const UploadImgForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5px 0px 5px 0px;
`
const UploadImgLabel = styled.label`
  text-align: center;
  font-size: 19px;
  margin: 0px 0px 5px 0px;
`
const UploadImgInput = styled.input`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 5px 0px;
  color: white;
  padding: 5px;
  text-decoration: none;
  margin: 0px 0px 10px 0px;
  transition-duration: 200ms;
  border: 2px solid #5a5c6e;
  background: #5a5c6e;
  tex-align: center;
  cursor: pointer;
  :hover {
    color: ${colors.primary};
    border: 2px solid white;
    border-radius: 5px;
  }
`
const UploadInput = styled.input`
  margin: 0px 0px 5px 0px;
  color: white;
  padding: 5px;
  font-size: 18px;
  align-self: center;
  text-decoration: none;
  margin: 0px 0px 10px 0px;
  transition-duration: 200ms;
  border: 2px solid #5a5c6e;
  background: #5a5c6e;
  text-align: center;
  cursor: pointer;
  :hover {
    color: ${colors.primary};
    border: 2px solid white;
    border-radius: 5px;
  }
`

const UploadImg = () => {
  const [file, setFile] = useState()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)

  const handlePicture = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('username', userData.username)
    data.append('userId', userData._id)
    data.append('file', file)

    dispatch(sendPictureProfil(data, userData._id))
  }

  return (
    <UploadImgForm action="" onSubmit={handlePicture} className="upload-pic">
      <UploadImgLabel htmlFor="file">Changer d'image</UploadImgLabel>
      <UploadImgInput
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <UploadInput type="submit" value="Envoyer" />
    </UploadImgForm>
  )
}

export default UploadImg
