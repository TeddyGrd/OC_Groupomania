import React, { useContext } from 'react'
import { UidContext } from '../Context/AppContext'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import UploadImg from './UploadImage'
import { dateParser } from '../../utils/utils'

const ProfilMain = styled.div`
  display: flex;

  justify-content: center;
`
const ProfilContainer = styled.div`
  margin: 20px 5px 5px 5px;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  background: #5a5c6e;
  color: white;
  justify-content: center;
  max-width: 850px;
  align-self: center;
`
const ProfilFigure = styled.figure`
  margin: 10px;
  padding: 0px;
`
const ProfilPicture = styled.img`
  max-height: 250px;
  max-width: 250px;
  border-radius: 25px;
`

const ProfilWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 0px 10px;
`
const ProfilH2 = styled.h2`
  text-align: center;
`

const ProfilRedirection = styled.div`
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
const ProfilP = styled.p`
  color: white;
`
const ProfilA = styled.a`
  text-decoration: none;
  color: ${colors.primary};
`

const UpdateProfil = () => {
  const uid = useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)
  const admin = userData.admin
  let admin_text = ''

  if (admin === 1) {
    admin_text = '( administrateur )'
  } else {
    admin_text = ''
  }

  return (
    <ProfilMain>
      <ProfilContainer>
        {uid ? (
          <>
            <ProfilFigure>
              <ProfilPicture
                src={userData.imageUrl}
                alt="photo de profil"
              ></ProfilPicture>
              <UploadImg />
            </ProfilFigure>
            <ProfilWrapper>
              <ProfilH2>
                {userData.username} {admin_text}
              </ProfilH2>
              <p>A rejoint le réseau le {dateParser(userData.createdAt)}</p>
            </ProfilWrapper>
          </>
        ) : (
          <ProfilRedirection>
            <ProfilP>
              Vous n'êtez pas connecté cliquée
              <ProfilA href="/auth/login"> ici </ProfilA>
              pour vous connecter
            </ProfilP>
          </ProfilRedirection>
        )}
      </ProfilContainer>
    </ProfilMain>
  )
}

export default UpdateProfil
