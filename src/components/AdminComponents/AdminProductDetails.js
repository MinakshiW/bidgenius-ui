import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { AI } from '../../APIServices/BidGeniusAPIServices'
import { getTokens } from '../../store/tokens'

const AdminProductDetails = () => {

    const { productID } = useParams()
    const { access, refresh } = getTokens()
    const [product, setProduct] = useState([])
    const [images, setImages] = useState([])

    const getProductInformation = () => {
        console.log(access)
        AI.get(`adminproducts/${productID}/`, {
            headers: {
                'Authorization': `Bearer ${access}`,
            }
        }).then(
            (response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    setProduct(response.data)
                }
            }
        ).catch(
            (error) => {
                console.error(error)
            }
        )
    }


    const getProductImages = () => {
        console.log(access)
        AI.get(`adminproducts/${productID}/get_images/`, {
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

    const statusVerify = () => {
        console.log(access)
        const data = { 'product_verify': true }
        AI.patch(`adminproducts/${productID}/`, data, {
            headers: {
                'Authorization': `Bearer ${access}`,
            }
        }).then(
            (response) => {
                if (response.status === 200) {
                    console.log(response.data)
                }
            }
        ).catch(
            (error) => {
                console.error(error)
            }
        )
    }

    useEffect(() => {
        getProductInformation()
        getProductImages()
    }, [])





    return (
        <div id="intro" className="bg-image bgimageadmin mask vh-100" >
            <div className="content w-75 py-4 pt-4 mb-5">
                <h1 className='text-danger-emphasis pb-3'>Product Details</h1>
                <div className="row d-flex justify-content-center align-items-center h-100 ">
                    <div className="col col-lg-12 mb-4 mb-lg-0 ">
                        <div className="card mb-3  bg-secondary-subtle" style={{ borderRadius: ".5rem" }}>
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <div id={`carouselExampleIndicators${product.product_id}`} className="carousel slide w-100 ms-auto" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {
                                                images.map((image, ind) => (
                                                    <div className={`carousel-item ${ind === 0 ? 'active' : ''}`} key={ind}>
                                                        <img src={`http://localhost:8000/${image.product_image}`} className="d-block w-100 p-3" alt="Product" height={350} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${product.product_id}`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${product.product_id}`} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div> 
                                    <h3 className='text-info-emphasis pt-3'>{product.product_name}</h3>


                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6>Description...</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-12 mb-4">
                                                <p className="text-muted d-inline">{product.product_description}</p>
                                            </div>

                                        </div>
                                        <h6>Other details..</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-4 mb-3">
                                                <h6>Manufacturing year</h6>
                                                <p className="text-muted">{product.product_manufacture_year ? product.product_manufacture_year : '---'}</p>
                                            </div>
                                            <div className="col-4 mb-3">
                                                <h6>Base Price</h6>
                                                <p className="text-muted">Rs. {product.product_base_price ? product.product_base_price : '---'}</p>
                                            </div>
                                            <div className="col-4 mb-3 ">
                                                <h6>Owner</h6>
                                                <p className="text-muted">{product.owner ? product.owner.username : '---'}</p>
                                            </div>
                                        </div>
                                        <div className="row pt-1">
                                            <div className="col-12 mb-3">
                                                <h6>Status</h6>
                                                <p className="text-muted">{product.product_verify ? "Verified" : 'Not Verified'}</p>
                                                {
                                                    product.product_verify
                                                        ?
                                                        null
                                                        :
                                                        <div>
                                                            <button type='button' className='btn btn-warning' onClick={()=>{statusVerify()}}
                                                                onClickCapture={getProductInformation}>
                                                                Verify Now
                                                            </button>
                                                        </div>
                                                }
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

export default AdminProductDetails