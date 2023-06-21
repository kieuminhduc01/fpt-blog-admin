import { apiAccountAuthValidatePost } from 'api/accountAPI'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isValid, setIsValid] = useState(null)
  const { children } = props

  const jwt = Cookies.get('jwt')
  if (jwt) {
    apiAccountAuthValidatePost(jwt)
      .then(() => {
        setIsValid(true)
      })
      .catch(() => {
        setIsValid(false)
      })
      .finally(() => setIsLoading(false))
  } else {
    return <Navigate to="/login" />
  }

  return isLoading ? <div>Loading...</div> : isValid === true ? children : <Navigate to="/login" />
}

export default PrivateRoute
