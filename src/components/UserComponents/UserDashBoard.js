import React from 'react'
import UserNavBar from './UserNavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Layout/Footer'




const UserDashBoard = () => {
  return (
    <>
      <UserNavBar />   
      <Outlet />      
      <Footer/>
    </>
  )
}

export default UserDashBoard