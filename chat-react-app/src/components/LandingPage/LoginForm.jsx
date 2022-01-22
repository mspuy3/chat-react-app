import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import { login } from '../../api/slack-api'

const LoginForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  const [flash, setFlash] = useState('')


  let navigate = useNavigate();

  const handleLogin = async () => {

    setIsLoading(true)

    const [response, errors] = await login(email, password)
    
    if (errors.length > 0) {
      setFlash('')
      setError(errors)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setFlash('Successful login')
      setError([])
      navigate(`../main`, {replace: true,});

    }
  }

  return (

    <div className='m-3'>

      {isLoading ? (
         <h1 className='text-center text-primary text-center p-1'>Logging In....</h1>
       ) : (
        <div className='bg-primary vh-50 text-light text-center p-2 d-flex flex-column'>
        <h2 className='text-center p-1'>Log In</h2>
 
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='mw-100 p-1 m-1'
          />
 
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='mw-100 p-1 m-1'
          />
        
        {error.lg}
        <button onClick={handleLogin} className="mw-100 m-1 p-1">Login</button>
        <button className="mw-100 m-1 p-1 border border-primary bg-primary text-primary">Login</button>
      </div>
      )}


      {error.length ? error.map((err) => <p className='text-center text-danger text-center p-1'>{err}</p>) : null}
      {flash && <p>{flash}</p>}

    </div>

  )
}
export default LoginForm