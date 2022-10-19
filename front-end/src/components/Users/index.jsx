import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import colors from '../../utils/style/colors'
import { dateParser } from '../../utils/utils'
import { UserDelete, UserAdmin } from '../../actions/user'

const CardContenair = styled.li`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 15px;
  padding: 10px;
  margin: 8px auto;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  background: #5a5c6e;
  color: white;
  max-width: 375px;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 125px;
  max-width: 500px;
`

const CardPicture = styled.img`
  object-fit: cover;
  max-width: 85px;
  max-height: 85px;
  border-radius: 45px;
  margin: 5px 5px 5px 5px;
  position: relative;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const CardUsername = styled.h2`
  margin: 10px 0px 15px 0px;
  padding: 0px;
  font-size: 19px;
`

const CardCreated = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 17px;
`

const CardInfoPlus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 5px 0px 0px 0px;
`

const CardDelete = styled.div``

const DeleteInput = styled.input`
  padding: 10px;
  background: ${colors.tertiary};
  color: white;
  border-radius: 15px;
  cursor: pointer;
  transition-duration: 200ms;
  font-size: 15px;
  border: 2px solid black;
  :hover {
    color: ${colors.primary};
    border: 2px solid white;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  }
`

const CardAdmin = styled.div``

const AdminInput = styled.input`
  padding: 10px;
  background: ${colors.tertiary};
  color: white;
  border-radius: 15px;
  cursor: pointer;
  transition-duration: 250ms;
  font-size: 15px;
  border: 2px solid black;
  :hover {
    color: ${colors.primary};
    border: 2px solid white;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  }
`

function CardUsers({ users }) {
  const dispatch = useDispatch() //Pour déclencher les actions

  const admin = () => {
    if (users.admin === 1) {
      return '( administrateur )'
    }
  }
  const handleDelete = () => {
    if (
      window.confirm(
        'Êtes-vous sûr de vouloir supprimer cette utilisateur compte ?'
      )
    ) {
      dispatch(UserDelete(users._id))
    }
  }

  const handleAdmin = () => {
    if (
      window.confirm(
        'Êtes-vous sûr de vouloir passer cette utilisateur administrateur ?'
      )
    ) {
      dispatch(UserAdmin(users._id))
    }
  }

  return (
    <CardContenair key={users._id}>
      <CardWrapper>
        <CardPicture src={users.imageUrl} alt="profilPicture"></CardPicture>
        <CardInfo>
          <CardUsername>
            {users.username} {users.admin === 1 ? admin() : null}
          </CardUsername>
          <CardCreated>
            Compte créer le {dateParser(users.createdAt)}
          </CardCreated>
        </CardInfo>
      </CardWrapper>
      <CardInfoPlus>
        <CardDelete>
          {users.admin === 0 ? (
            <DeleteInput
              type="submit"
              value="Supprimer"
              onClick={() => {
                handleDelete()
              }}
            />
          ) : null}
        </CardDelete>
        <CardAdmin>
          {users.admin === 0 ? (
            <AdminInput
              type="submit"
              value="Admin +"
              onClick={() => handleAdmin()}
            />
          ) : null}
        </CardAdmin>
      </CardInfoPlus>
    </CardContenair>
  )
}

export default CardUsers
