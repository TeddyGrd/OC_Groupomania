import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import CardUsers from '../../components/Users'
import { isEmpty } from '../../utils/utils'
import { getUsers } from '../../actions/users'
import colors from '../../utils/style/colors'

const UserUl = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 30%;
  margin: 5px;
  padding: 0px;
`
const UserRedirection = styled.div`
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
const UserP = styled.p`
  color: white;
`
const UserA = styled.a`
  text-decoration: none;
  color: ${colors.primary};
`

function Admin() {
  const [userLoad, setUserLoad] = useState(true)
  const [numberUser, setNumberUser] = useState(8)
  const displayUsers = useSelector((state) => state.usersReducer)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const displayMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    )
      return setUserLoad(true)
  }

  useEffect(() => {
    if (userLoad) {
      dispatch(getUsers(numberUser))
      setUserLoad(false)
      setNumberUser(numberUser + 8)
    }
    window.addEventListener('scroll', displayMore)
    return () => window.removeEventListener('scroll', displayMore)
  }, [userLoad, dispatch, numberUser])

  return (
    <div className="displayUser">
      {userData.admin === 1 ? (
        <UserUl>
          {!isEmpty(displayUsers[0]) &&
            displayUsers.map((users) => {
              return <CardUsers users={users} key={users._id} />
            })}
        </UserUl>
      ) : (
        <UserRedirection>
          <UserP>
            Vous n'êtez pas autorisé a être ici, Cliquez
            <UserA href="/"> ici </UserA>
            pour retourner a la page principale
          </UserP>
        </UserRedirection>
      )}
    </div>
  )
}

export default Admin
