import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import './UserNavbar.css'
import Person from "../../../node_modules/bootstrap-icons/icons/person.svg"
import { getTokens, getUserData } from '../../store/tokens'
import { AI } from '../../APIServices/BidGeniusAPIServices'

const UserNavBar = () => {

  const nav = useNavigate()
  const { access, refresh } = getTokens()
  const { username, is_superuser, logged_in } = getUserData()

  async function logoutUser() {
    console.log('tokenss--')
    console.log(username)
    console.log(is_superuser)
    console.log(logged_in)
    console.log(access)
    if (window.confirm(`Do you want to log out ?`)) {
      try {
        const res = await AI.post('user/logout/', null, {
          headers: {
            'Authorization': `Bearer ${access}`,
          }
        });
        console.log(res)
        nav(`/login`)
        sessionStorage.clear()
      }
      catch (e) {
        console.log(e)
      }
      finally {

      }
    }
  }

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
                <NavLink className="nav-link hover111 font1111 text-dark" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link hover111 font1111 text-dark" to="#!">Auctions</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link hover111 font1111 text-dark" to="#!">Bids</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link hover111 font1111 text-dark" to="#!">Products</NavLink>
              </li>
            </ul>

            <div className="col-md-4">
              <form className="d-flex input-group w-auto my-auto mb-3 mb-md-0 me-5 ms-0">
                <input autoComplete="off" type="search" className="form-control rounded-5 inputhover111" placeholder="Search" />
              </form>
            </div>

            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item me-3 me-lg-0 pt-1">
                <NavLink className="nav-link fs-3" to="#!">
                  <i className="bi bi-suit-heart"></i>
                </NavLink>
              </li>
              {
                username? 
                <li className="nav-item me-3 pt-2 me-lg-0 pt-1">
                {/* <NavLink className="nav-link me-2 p-2 text-light" to="#!">
                  User
                </NavLink> */}

                <NavLink className="nav-link text-light me-2" to="#" >

                  {/* <img src={
                    auth.user.profile_pic ? `http://127.0.0.1:8000${auth.user.profile_pic}` : Person
                  } */}
                  <img src={Person}
                    className="me-1 rounded-circle profile-icon"
                    alt='personicon'
                  />
                  {username}
                </NavLink>
              </li>
              :null
              }
              <li className="nav-item me-3 pt-2 me-lg-0 pt-1">
                <NavLink className="nav-link me-2 btnlogout p-2 text-light" onClick={logoutUser}>
                  Logout
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default UserNavBar