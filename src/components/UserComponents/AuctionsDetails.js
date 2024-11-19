import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTokens } from '../../store/tokens'
import { AI } from '../../APIServices/BidGeniusAPIServices'
import defaultImage from '../../images/default-product-image.jpg'

const AuctionsDetails = () => {

    const { auctionID } = useParams()
    const { access, refresh } = getTokens()
    const [auction, setAuction] = useState([])
    const [images, setImages] = useState([])
    // const [product_id, setProductID] = useState([])

    const BASE_URL = 'http://127.0.0.1:8000'

    const getAuctionDetails = () => {
        // console.log(access)
        AI.get(`auctionDetails/${auctionID}/`, {
            headers: {
                'Authorization': `Bearer ${access}`,
            }
        }).then(
            (response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    setAuction(response.data)

                    const productId = response.data.product.product_id
                    console.log(productId)

                    AI.get(`adminproducts/${productId}/get_images/`, {
                        headers: {
                            'Authorization': `Bearer ${access}`,
                        }
                    }).then(
                        (response) => {
                            if (response.status === 200) {
                                console.log(response.data)
                                setImages(response.data)
                            }
                        }
                    ).catch(
                        (error) => {
                            console.error(error)
                        }
                    )
                }
            }
        ).catch(
            (error) => {
                console.error(error)
            }
        )
    }

    useEffect(() => {
        getAuctionDetails()
    }, [auctionID])



    return (
        <div id="intro" className="bg-image bgimageuser vh-100 mask" >
            <table className='content'>
                <thead>
                    <tr>
                        <th>Auction ID</th>
                        <th>Product ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{auction.auction_id || 'N/A'}</th>
                        <th>{auction.product?.product_name || 'N/A'}</th>
                    </tr>
                </tbody>
            </table>
            <div className="content w-75 py-4 pt-4 mb-5">
                <h1 className='text-danger-emphasis pb-3'>Auction Details</h1>
                <div className="row d-flex justify-content-center align-items-center h-100 ">
                    <div className="col col-lg-12 mb-4 mb-lg-0 ">
                        <div className="card mb-3  bg-secondary-subtle" style={{ borderRadius: ".5rem" }}>
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <div id={`carouselExampleIndicators${auction.auction_id}`} className="carousel slide w-100 ms-auto" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {images.length > 0 ? (
                                                images.map((currentImage, ind) => (
                                                    <div className={`carousel-item ${ind === 0 ? 'active' : ''}`} key={ind}>
                                                        
                                                        <img src={`${BASE_URL}${currentImage.product_image}`} className="d-block w-100 p-3" alt="Product" height={250} />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="carousel-item active">
                                                    <img src={defaultImage} className="d-block w-100 p-3" alt="Default" height={250} />
                                                </div>
                                            )}
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${auction.auction_id}`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${auction.auction_id}`} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                    <h3 className='text-info-emphasis pt-3'>{auction.product?.product_name || 'N/A'}</h3>


                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6>Auction Description...</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">

                                            <div className="col-4 mb-3">
                                                <h6>Auction Start Time</h6>
                                                <p className="text-muted">{auction.auction_start_time || '---'}</p>
                                            </div>
                                            <div className="col-4 mb-3">
                                                <h6>Auction End Time</h6>
                                                <p className="text-muted">{auction.auction_end_time || '---'} </p>
                                            </div>
                                            <div className="col-4 mb-3">
                                                <h6>Increment Amount</h6>
                                                <p className="text-muted">{auction.increment_amount || '---'}</p>
                                            </div>

                                        </div>
                                        <h6>Product details..</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-4 mb-3">
                                                <h6>Product Description</h6>
                                                <p className="text-muted">{auction.product?.product_description || '---'}</p>
                                            </div>
                                            <div className="col-4 mb-3">
                                                <h6>Manufacturing year</h6>
                                                <p className="text-muted">{auction.product?.product_manufacture_year || '---'}</p>
                                            </div>
                                            <div className="col-4 mb-3">
                                                <h6>Base Price</h6>
                                                <p className="text-muted">Rs. {auction.product?.product_base_price || '---'} </p>
                                            </div>
                                            <div className="col-4 mb-3 ">
                                                <h6>Owner</h6>
                                                <p className="text-muted">{auction.product?.owner.username || '---'}</p>
                                            </div>
                                            <div className="col-4 mb-3">
                                            <h6>Status</h6>
                                            <p className="text-muted">{auction.product?.product_verify ? "Verified" : 'Not Verified'}</p>

                                        </div>
                                        </div>
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AuctionsDetails