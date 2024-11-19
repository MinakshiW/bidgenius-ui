import React, { useEffect, useState } from 'react'
import NavBar from '../Layout/NavBar'
import Footer from '../Layout/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuctionDetailsPage = () => {

  const [auction, setAuction] = useState([])
  const [showBidOptions, setShowBidOptions] = useState(null) // To handle which auction ID is selected for bidding options
  const navigate = useNavigate() 

  const getAuctionInfo = () => {
    axios.get('http://127.0.0.1:8000/auctiondetail/')
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          setAuction(res.data)
        }
      }).catch((error) => {
        console.error(error)
      })
  }

  const sendBidderInfo = (auction_id, bidType, owner_id) => {
    axios.post('http://127.0.0.1:8000/bidders/', {
      bidder_type: bidType,
      auction: auction_id,
      bidder: owner_id, // Use the owner_id directly from the auction data
    })
      .then((response) => {
        console.log('Bidder info stored:', response.data);
      })
      .catch((error) => {
        console.error('Error storing bidder info:', error);
      });
  };

  // Handle manual bidding option
  const handleManualBidding = (auction_id, owner_id) => {
    sendBidderInfo(auction_id, 'manual', owner_id);
    navigate(`/manualbid/${auction_id}`); // Redirect to manual bidding page
  };

  // Handle automatic bidding option
  const handleAutomaticBidding = (auction_id, owner_id) => {
    sendBidderInfo(auction_id, 'automatic', owner_id);
    console.log("Automatic bidding started for auction ID:", auction_id);
  };

  useEffect(() => { getAuctionInfo() }, [])

  return (
    <div>
      <NavBar />
      <div id="intro" className="bg-image bgimage111 mask">
        <div className="container h-sm-50 pt-5 mt-5">
          <h1 className="pt-5 text-dark fw-bold text-center">Current Auction</h1>
          <div className="grid-container pt-2">
            {
              auction.map((auction, index) => {
                return (
                  <div key={index} className="grid-item text-dark card bg-danger-subtle">
                    {/* Carousel */}
                    <div id={`carouselExampleIndicators${auction.auction_id}`} className="carousel slide w-100 ms-auto" data-bs-ride="carousel">
                      <div className="carousel-inner">
                        {auction.product.product_imagess && auction.product.product_imagess.length > 0 ? (
                          auction.product.product_imagess.map((image, ind) => (
                            <div className={`carousel-item ${ind === 0 ? 'active' : ''}`} key={ind}>
                              <img src={image.product_image} className="d-block w-100 p-3" alt="Product" height={250} />
                            </div>
                          ))
                        ) : (
                          <div className="carousel-item active">
                            {/* Fallback to a Bootstrap icon */}
                            <div className="d-flex justify-content-center align-items-center" style={{ height: 250 }}>
                              <i className="bi bi-image" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Carousel Controls */}
                      <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${auction.auction_id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${auction.auction_id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="card-body">
                      <p className="card-text"><strong>Product Name : </strong>{auction.product.product_name}</p>
                      <p className="card-text"><strong>Description : </strong>{auction.product.product_description}</p>
                      <p className="card-text"><strong>Year : </strong>{auction.product.product_manufacture_year}</p>
                      <p className="card-text"><strong>Rs. </strong>{auction.product.product_base_price}</p>
                      <p className="card-text"><strong>Auction Date: </strong>{auction.auction_date}</p>
                      <p className="card-text"><strong>Auction Time: </strong>{auction.auction_start_time}</p>

                      {/* Bid Button */}
                      <button onClick={() => setShowBidOptions(auction.auction_id)} className="btn btn-success btnlogout">Bid</button>

                      {/* Bid Options */}
                      {showBidOptions === auction.auction_id && (
                        <div className="mt-3">
                          <button onClick={() => handleAutomaticBidding(auction.auction_id, auction.product.owner.id)} className="btn btn-success btnlogout m-2">Automatic Bidding</button>
                          <button onClick={() => handleManualBidding(auction.auction_id, auction.product.owner.id)} className="btn btn-success btnlogout">Manual Bidding</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionDetailsPage
