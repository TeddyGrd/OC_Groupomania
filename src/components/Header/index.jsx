import styled from 'styled-components'
import colors from '../../utils/style/colors'
import logo from '../../assets/Groupomania_logos/icon-left-font-monochrome-black.png'

const HeaderBanner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px;
  margin: 0px;
  background: ${colors.primary};
  border-radius: 10px;
`
const HeaderLogo = styled.img`
  height: 200px;
  width: 200px;
`

function Header() {
  return (
    <div>
      <HeaderBanner>
        <HeaderLogo src={logo} alt="Logo groupomania" />
      </HeaderBanner>
    </div>
  )
}

export default Header
