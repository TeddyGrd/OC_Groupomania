import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import logo from '../../assets/Groupomania_logos/icon-left-font-monochrome-black2.png'
import { useSelector } from 'react-redux'
import Logout from '../Logout/Logout'

const HeaderBanner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px;
  background: ${colors.primary};
  max-height: 120px;
  min-height: 110px;
`
const HeaderLogo = styled.img`
  height: 50px;
  width: auto;
  align-self: center;
  margin-left: 15px;
`
const HeaderHome = styled.a`
  margin: auto;
  text-decoration: none;
  color: white;
  font-size: 20px;
  padding: 15px;
  border-radius: 25px;
  background: ${colors.tertiary};
  border: 2px solid ${colors.primary};
  transition-duration: 200ms;
  :hover {
    border: 2px solid white;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  }
`
const HeaderDiv = styled.div`
  align-self: center;
  text-align: center;
  margin-right: 30px;
  font-size: 19px;
  font-weight: 500;
  align-items: center;
  background: ${colors.tertiary};
  padding: 15px;
  border-radius: 10px 10px 0px 0px;
  color: white;
  max-width: 200px;
  min-width: 150px;
  overflow: hidden;
  cursor: pointer;
  :focus {
    border: 2px solid white;
  }
`
const HeaderDivHome = styled.div`
  align-self: center;
  margin: auto;
`
const HeaderNav = styled.nav`
  background-color: ${colors.tertiary};
  width: 210px;
  right: 0px;
  margin: 15px 30px 0px 0px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 0px 0px 7px 7px;
  border: 1px solid black;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  height: auto;
  border-top: 2px solid ${colors.primary};
`
const HeaderA = styled.a`
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

function Header() {
  const [state, setState] = useState(false)
  const userData = useSelector((state) => state.userReducer)

  const showDropDown = () => {
    setState(true)
  }

  const hideDropDown = () => {
    setState(false)
  }

  return (
    <HeaderBanner>
      <HeaderLogo src={logo} alt="Logo groupomania" />
      <HeaderDivHome>
        <HeaderHome href="/">
          <i className="fa-solid fa-house"></i>
        </HeaderHome>
      </HeaderDivHome>
      <HeaderDiv
        onMouseEnter={showDropDown}
        onClick={showDropDown}
        onMouseLeave={hideDropDown}
        onFocus={showDropDown}
        tabIndex="1"
      >
        Mon compte
        {state ? (
          <HeaderNav
            onMouseEnter={showDropDown}
            onClick={showDropDown}
            onFocus={showDropDown}
          >
            <HeaderA href="/profil" className="redirection">
              Mon profil
            </HeaderA>
            <Logout />
            {userData.admin === 1 ? (
              <HeaderA href="/admin" className="redirection">
                Outil admin
              </HeaderA>
            ) : null}
          </HeaderNav>
        ) : null}
      </HeaderDiv>
    </HeaderBanner>
  )
}

export default Header
