import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import Login from '../components/Login'
import { AdminDashBoard, AdminHomePage, AdminProfile } from '../components/AdminComponents'
import { UserDashBoard, UserHomePage, UserProfile } from '../components/UserComponents'
import AdminRegistration from '../components/AdminComponents/AdminRegistration'
import AdminProducts from '../components/AdminComponents/AdminProducts'
import AdminProductDetails from '../components/AdminComponents/AdminProductDetails'
import AuctionsDetails from '../components/UserComponents/AuctionsDetails'
import { getLoggedInStatus } from '../store/tokens'

const BidGeniusAppRoutes = () => {

    const logged_in = getLoggedInStatus()

    return (
        <>
        <Routes>
        <Route path='/' element={<HomePage />}></Route>
            <Route path='/home' element={<HomePage />}></Route>
            <Route path='/login' element={<Login />}></Route>

            <><Route path='/admin' element={<AdminDashBoard />}>
                <Route path='' element={<AdminHomePage />}></Route>
                <Route path='register' element={<AdminRegistration />}></Route>
                <Route path='profile' element={<AdminProfile />}></Route>
                <Route path='products' element={<AdminProducts />}></Route>
                <Route path='products/:productID' element={<AdminProductDetails />}></Route>
            </Route>
                <Route path='/user' element={<UserDashBoard />}>
                    <Route path='' element={<UserHomePage />}></Route>
                    <Route path='profile' element={<UserProfile />}></Route>
                    <Route path='auctions/:auctionID' element={<AuctionsDetails />}></Route>
                </Route></>

        </Routes>
        </>
    )
}

export default BidGeniusAppRoutes