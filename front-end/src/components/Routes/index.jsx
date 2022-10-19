import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../Header'
import Login from '../../pages/Login'
import SignUp from '../../pages/SignUp'
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Admin from '../../pages/Admin'

const index = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home></Home>} />
          <Route exact path="/auth/login" element={<Login></Login>} />
          <Route exact path="/auth/signup" element={<SignUp></SignUp>} />
          <Route exact path="/profil" element={<Profil></Profil>} />
          <Route exact path="/admin" element={<Admin></Admin>} />
          <Route element={<Home></Home>} />
        </Routes>
      </Router>
    </div>
  )
}

export default index
