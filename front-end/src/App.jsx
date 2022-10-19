import React, { useEffect, useState } from 'react'
import { UidContext } from './components/Context/AppContext'
import Routes from './components/Routes'
import { useDispatch } from 'react-redux'
import { getUser } from './actions/user'
import axios from 'axios'

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'GET',
        url: 'http://localhost:8080/jwtid',
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data)
        })
        .catch((err) => console.log('No token'))
    }
    fetchToken()
    if (uid) dispatch(getUser(uid))
  }, [uid])

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

export default App
