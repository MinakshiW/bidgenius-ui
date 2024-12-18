import React from 'react'
import './HomePage.css'
import NavBar from './Layout/NavBar'
import Footer from './Layout/Footer'

const HomePage = () => {
    return (
        <div>
            <NavBar />
            <div id="intro" className="bg-image bgimage111 vh-100 mask" >
                {/* <div className="mask bgcolor222"></div> */}


                <div className='w-50 p-5 m-3 ms-auto'>
                    <div className='col-md-12 text-center p-5 mt-5'>
                        <h1 className='text-center mt-5 p-3 fw-bold text-danger-emphasis'>Bid on Your Next Treasure!</h1>
                        <h4 className='mt-3 text-secondary p-2'>Join our community of bidders and discover unique items every day.</h4>
                        <button className='btn222 mt-4 me-3'>Start Bidding</button>
                        <button className='btn222 mt-4'>Create Auction</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage