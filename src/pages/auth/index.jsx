import React, { useState } from 'react'
import './style.css'

function Authentification() {
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const database = [
    {
      email: 'user1@gmail.com',
      password: 'pass1',
    },
    {
      email: 'user2@gmail.com',
      password: 'pass2',
    },
  ]
  const errors = {
    email: 'email incorrect',
    password: 'mots de passe incorrect',
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    let { email, password } = document.forms[0]

    const userData = database.find((user) => user.email === email.value)
    if (userData) {
      if (userData.password !== password.value) {
        setErrorMessages({ name: 'password', message: errors.password })
      } else {
        setIsSubmitted(true)
      }
    } else {
      setErrorMessages({ name: 'email', message: errors.email })
    }
  }
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    )
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>adresse-mail</label>
          <input type="email" name="email" required />
          {renderErrorMessage('email')}
        </div>
        <div className="input-container">
          <label>Mot de passe</label>
          <input type="password" name="password" required />
          {renderErrorMessage('password')}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  )
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Connectez-vous</div>
        {isSubmitted ? <div>Vous êtez bien connecté</div> : renderForm}
      </div>
    </div>
  )
}

export default Authentification
