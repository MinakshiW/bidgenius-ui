import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './NavBar.css'
import HomePage from '../HomePage'

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0">
                <div className="container">
                    <NavLink className="navbar-brand fs-3" to="#!"><span className='span11'>BID</span><span className='span12'>GENIUS</span></NavLink>
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link hover111 font1111" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link hover111 font1111" to="#!">Auctions</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link hover111 font1111" to="#!">About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link hover111 font1111" to="#!">Contact</NavLink>
                            </li>
                        </ul>

                        <div className="col-md-4">
                            <form className="d-flex input-group w-auto my-auto mb-3 mb-md-0 me-5 ms-0">
                                <input autoComplete="off" type="search" className="form-control rounded-5 inputhover111" placeholder="Search" />
                            </form>
                        </div>

                        <ul className="navbar-nav d-flex flex-row">
                            <li className="nav-item me-3 me-lg-0 pt-1">
                                <NavLink className="nav-link me-2 btn333 text-light" to="#!">
                                    Sign Up
                                </NavLink>
                            </li>
                            <li className="nav-item me-3 me-lg-0">
                                <NavLink className="nav-link font1111 hover111" to="#!">
                                    Login
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar