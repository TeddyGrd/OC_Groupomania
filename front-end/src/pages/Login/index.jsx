import React from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const LoginMain = styled.div`
  display: flex;
  justify-content: center;
`

const LoginWrapper = styled.div`
  background-color: #5a5c6e;
  color: white;
  padding: 25px;
  border-radius: 10px;
  margin-top: 45px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 25px 40px 25px 40px;
`
const LoginTitle = styled.h1`
  margin: 0px 5px 10px 5px;
  font-size: 41px;
`
const LoginSpan = styled.span`
  display: flex;
  justify-content: center;
  font-size: 15px;
  margin: 0px 0px 3px 0px;
`
const LoginHref = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: none;
  font-size: 15px;
  color: ${colors.primary};
  margin: 0px 0px 15px 0px;
`
const LoginForm = styled.form`
  margin: 0px;
  display: flex;
  flex-direction: column;
`
const LoginLabel = styled.label`
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const LoginInput = styled.input`
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 10px 0px 15px 0px;
  border-radius: 5px;
`
const LoginPara = styled.p`
  text-align: center;
  margin: 0px;
  font-size: 21px;
`
const LoginDivButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px 0px 0px;
`
const LoginButton = styled.button`
  cursor: pointer;
  font-size: 16px;
  background: ${colors.tertiary};
  border: 1px solid ${colors.secondary};
  color: ${colors.primary};
  padding: 10px 20px;
  border-radius: 10px;
  transition: 350ms;
  :hover {
    background: ${colors.primary};
    color: ${colors.tertiary};
  }
`
const LoginError = styled.div`
  color: ${colors.primary};
  box-sizing: content-box;
  text-align: center;
  margin-top: -5px;
  margin-bottom: 5px;
  height: auto;
  font-size: 16px;
`

function Login() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data, e) => {
    e.preventDefault()
    const emailError = document.getElementsByClassName('email error')[0]
    const passwordError = document.getElementsByClassName('password error')[0]

    axios({
      method: 'post',
      url: 'http://localhost:8080/api/user/login',
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email
          passwordError.innerHTML = res.data.errors.password
        } else {
          window.location.assign('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <LoginMain>
      <LoginWrapper>
        <LoginTitle> Connexion</LoginTitle>
        <LoginSpan> Pas encore de compte ?</LoginSpan>
        <LoginHref href="/auth/signup"> Cliquez-ici</LoginHref>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <LoginLabel htmlFor="email">
            <LoginPara>Adresse-mail</LoginPara>
            <LoginInput
              type="email"
              {...register('email')}
              required
              id="email"
              name="email"
            />
            <LoginError className="email error"> </LoginError>
          </LoginLabel>
          <LoginLabel htmlFor="password">
            <LoginPara>Mots de passe</LoginPara>
            <LoginInput
              type="password"
              {...register('password')}
              required
              id="password"
              name="password"
            />
            <LoginError className="password error"></LoginError>
          </LoginLabel>
          <LoginDivButton>
            <LoginButton type="submit">Se connecter</LoginButton>
          </LoginDivButton>
        </LoginForm>
      </LoginWrapper>
    </LoginMain>
  )
}
export default Login
