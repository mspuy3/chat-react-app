import React, { useState } from 'react'
import { register } from '../../api/slack-api'

const RegisterForm = () => {

   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState([])
   const [flash, setFlash] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [passwordConfirmation, setPasswordConfirmation] = useState('')
 
   const handleRegister = async (e) => {
     e.preventDefault()
     setIsLoading(true)
     const [response, errors] = await register(
       email,
       password,
       passwordConfirmation
     )
      
      console.log('response: ', response)
      console.log('errors: ', errors)

     if (errors.length > 0) {
      setFlash('') 
      setError(errors)
      setPassword("")
      setPasswordConfirmation("")
     } else {
      setError([])
      setFlash('Successful register')
     }
     setIsLoading(false)
   }

   return (
   <div className='m-3'>
      {isLoading ? (
         <h1 className='text-center text-secondary text-center p-1'>Registering....</h1>
       ) : (
        <div className='bg-secondary vh-50 text-light text-center p-2 d-flex flex-column'>
        <h2 className='text-center p-1'>Register</h2>

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


             <input
               type='password'
               value={passwordConfirmation}
               onChange={(e) => setPasswordConfirmation(e.target.value)}
               placeholder='Re-enter Password'
               className='mw-100 p-1 m-1'
             />

           <button onClick={handleRegister} className="mw-100 m-1 p-1">Register</button>
         </div>
       )}
 
       {error.length ? error.map((err) => <p className='text-center text-danger text-center'>{err}</p>) : null}
       {flash && <p className='text-center text-success text-center'>{flash}</p>}

        {/* {error.length ? error.map((err) => alert(error)) : null}
       {flash && alert({flash})} */}
   
   </div>
   )

}

export default RegisterForm