import React, { useEffect, useState } from 'react'
import NavBar from './Layout/NavBar'
import Footer from './Layout/Footer'
import './Login.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AI, AI2 } from '../APIServices/BidGeniusAPIServices'
import { setTokens } from '../store/tokens'
import axios from 'axios'

const Login = () => {

  const { register, handleSubmit, setError, reset } = useForm()
  const [serverError, setServerError] = useState(null);
  const nav = useNavigate()

  async function loginUser(data) {  
    setServerError(null);
    try {
      const response = await axios.post('access/', data);
      if (response.status === 200) {
        const { access, refresh, username, is_superuser } = response.data;

        setTokens(access, refresh, username, is_superuser)



        console.log(access)
        console.log(refresh)
        console.log(username)
        console.log(is_superuser)

        

        if (is_superuser) {
          nav('/admin');
        } else {
          nav('/user');
        }
      }
    } catch (error) {
      if (error.response) {
        const serverErrors = error.response.data;
        if (serverErrors.detail) {
          setServerError(serverErrors.detail); // Set the error message from the server
        }
      } else {
        console.error(error);
      }
    }
  }


  return (
    <div>

      <NavBar />
      <div id="intro" className="bg-image bgimage111 vh-100 mask" >

        <div className="content1">
          <header className='text-center'>Login</header>

          {serverError && <div className="alert alert-danger">{serverError}</div>}

          <form onSubmit={handleSubmit(loginUser)}>

            <div className=" mb-3">
              <label htmlFor='username1' className='text-dark mb-2'>Username *</label>
              <input id='username1' type="text" required placeholder="username here"
                className='form-control'
                {...register('username', { required: 'Username is required' })}
              />
            </div>

            <div className="">
              <label htmlFor='password1' className='text-dark mb-2'>Password *</label>
              <input id='password1' type="password" required placeholder="Password here"
                className='form-control'
                {...register('password', { required: 'Password is required' })}
              />
            </div>

            <div className="mb-3 mt-4 text-center">
              <input type="submit" value="Login" className='p-2 col-6 mt-3' />
            </div>

          </form>
        </div >


      </div>
      <Footer />


    </div>
  )
}

export default Login