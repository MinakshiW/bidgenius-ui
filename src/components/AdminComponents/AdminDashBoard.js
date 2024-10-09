import React from 'react'
import AdminNavBar from './AdminNavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Layout/Footer'

const AdminDashBoard = () => {
  return (
    <>
      <AdminNavBar />
      <Outlet />
      <Footer/>
    </>
  )
}

export default AdminDashBoard