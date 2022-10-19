import React from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useNavigate } from 'react-router-dom'

const LogoutA = styled.a`
  color: white;
  text-decoration: none;
  margin: 0px 0px 10px 0px;
  font-size: 19px;
  transition-duration: 200ms;
  padding: 10px;
  border: 2px solid ${colors.tertiary};
  :hover {
    color: ${colors.primary};
    border: 2px solid white;
    border-radius: 5px;
  }
`

const Logout = () => {
  const navigate = useNavigate()
  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 })
    }
  }

  const logout = async () => {
    await axios({
      method: 'get',
      url: `http://localhost:8080/api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err))
    navigate('/auth/login')
  }

  return (
    <LogoutA classname="redirection" onClick={logout}>
      Se déconnecté
    </LogoutA>
  )
}

export default Logout
