import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import Login from '../components/Login'
import { AdminDashBoard, AdminHomePage, AdminProfile } from '../components/AdminComponents'
import { UserDashBoard, UserHomePage, UserProfile } from '../components/UserComponents'
import NavBar from '../components/Layout/NavBar'
import Footer from '../components/Layout/Footer'

const BidGeniusAppRoutes = () => {
    return (
        <> 
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/admin' element={<AdminDashBoard />}>
                    <Route path='' element={<AdminHomePage />}></Route>
                    <Route path='profile' element={<AdminProfile />}></Route>
                </Route>
                <Route path='/user' element={<UserDashBoard />}>
                    <Route path='' element={<UserHomePage />}></Route>
                    <Route path='profile' element={<UserProfile />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default BidGeniusAppRoutes