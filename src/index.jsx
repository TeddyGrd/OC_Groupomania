import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header/index'
import Auth from './pages/auth'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Header />
    <Auth />
  </React.StrictMode>
)
