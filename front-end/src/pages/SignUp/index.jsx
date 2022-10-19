import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUpMain = styled.div`
  display: flex;
  justify-content: center;
`

const SignUpWrapper = styled.div`
  background-color: #5a5c6e;
  color: white;
  padding: 25px;
  border-radius: 10px;
  margin-top: 45px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 25px 40px 25px 40px;
`
const SignUpTitle = styled.h1`
  margin: 0px 5px 20px 5px;
  font-size: 41px;
`
const SignUpForm = styled.form`
  margin: 0px;
  display: flex;
  flex-direction: column;
`
const SignUpLabel = styled.label`
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const SignUpInput = styled.input`
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 10px 0px 15px 0px;
  border-radius: 5px;
`
const SignUpPara = styled.p`
  text-align: center;
  margin: 0px;
  font-size: 21px;
`
const SignUpDivButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px 0px 0px;
`
const SignUpButton = styled.button`
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
const SignUpError = styled.div`
  color: ${colors.primary};
  box-sizing: content-box;
  text-align: center;
  margin-top: -5px;
  margin-bottom: 5px;
  height: auto;
  font-size: 16px;
`

function SignUp() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data, e) => {
    e.preventDefault()
    const emailError = document.getElementsByClassName('email error')[0]
    const passwordError = document.getElementsByClassName('password error')[0]
    const usernameError = document.getElementsByClassName('username error')[0]
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/user/signup',
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.errors) {
          usernameError.innerHTML = res.data.errors.username
          emailError.innerHTML = res.data.errors.email
          passwordError.innerHTML = res.data.errors.password
        } else {
          navigate('/auth/login')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <SignUpMain>
      <SignUpWrapper>
        <SignUpTitle> Inscription</SignUpTitle>
        <SignUpForm onSubmit={handleSubmit(onSubmit)}>
          <SignUpLabel htmlFor="username">
            <SignUpPara>Pseudo</SignUpPara>
            <SignUpInput
              type="text"
              {...register('username')}
              required
              id="username"
              name="username"
            />
            <SignUpError className="username error"></SignUpError>
          </SignUpLabel>
          <SignUpLabel htmlFor="email">
            <SignUpPara>Adresse-mail</SignUpPara>
            <SignUpInput
              type="email"
              required
              id="email"
              name="email"
              {...register('email')}
            />
            <SignUpError className="email error"></SignUpError>
          </SignUpLabel>
          <SignUpLabel htmlFor="password">
            <SignUpPara>Mots de passe</SignUpPara>
            <SignUpInput
              type="password"
              required
              id="password"
              name="password"
              {...register('password')}
            />
            <SignUpError className="password error"></SignUpError>
          </SignUpLabel>
          <SignUpDivButton>
            <SignUpButton type="submit">S'inscrire</SignUpButton>
          </SignUpDivButton>
        </SignUpForm>
      </SignUpWrapper>
    </SignUpMain>
  )
}

export default SignUp
