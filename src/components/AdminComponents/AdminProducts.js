import React, { useEffect, useState } from 'react'
import { getTokens } from '../../store/tokens'
import { AI } from '../../APIServices/BidGeniusAPIServices'
import './adminProducts.css'
import { NavLink } from 'react-router-dom'
import defaultImage from '../../images/default-product-image.jpg'

const AdminProducts = () => {

    const { access, refresh } = getTokens()
    const [products, setProducts] = useState([])
    const [images, setImages] = useState([])

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const getProductInformation = (verified) => {
        // console.log(access)
        AI.get(`adminproducts/`, {
            headers: {
                'Authorization': `Bearer ${access}`,
            }
        }).then(
            (response) => {
                if (response.status === 200) {
                    // console.log(response.data)
                    setProducts(response.data)
                    console.log('ghvhg-----------------------')
                    console.log(verified)
                    
                }
            }
        ).catch(
            (error) => {
                console.error(error)
            }
        )
    }

    const getProductFilteredInformation = (verified) => {
        AI.get(`adminproducts/filter_products/?q=${verified}`, {
            headers: {
                'Authorization': `Bearer ${access}`,
            }
        }).then(response => {
            if (response.status === 200) {
                console.log('filter called')
                setProducts(response.data);
                setCurrentPage(1); // Reset page to 1 when fetching filtered products
            }
        }).catch(error => {
            console.error(error);
        });
    };

    const getProductImages = () => {
        // console.log(access)
        AI.get(`adminproductsimages/`, {
            headers: {
                'Authorization': `Bearer ${access}`,
            }
        }).then(
            (response) => {
                if (response.status === 200) {
                    // console.log(response.data)
                    setImages(response.data)
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


    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


    const totalPages = Math.ceil(products.length / itemsPerPage);




    return (

        <div id="intro" className="bg-image bgimageadmin mask" >
            <div className='container pt-5'>
                <h1 className='pt-5 text-light fw-bold text-center'>All Products</h1>
                <div className='text-center pt-3'>
                    <button type='button' className="btn btn-outline-success me-1" 
                        onClick={() => getProductFilteredInformation(1)}>
                            Verified
                    </button>
                    <button type='button' className="btn btn-outline-danger me-auto" 
                        onClick={() => getProductFilteredInformation(0)}>
                            Not Verified
                    </button>
                </div>

                <div className='grid-container pt-5'>
                    {
                        currentProducts.map((product, index) => {

                            const currentproductImages = images.filter(image => image.product === product.product_id)
                            // console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
                            // console.log(currentproductImages)

                            return (

                                <div key={index} className='grid-item text-dark card bg-danger-subtle'>

                                    <div id={`carouselExampleIndicators${product.product_id}`} className="carousel slide w-100 ms-auto" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {currentproductImages.length > 0 ? (
                                                currentproductImages.map((currentImage, ind) => (
                                                    <div className={`carousel-item ${ind === 0 ? 'active' : ''}`} key={ind}>
                                                        <img src={currentImage.product_image} className="d-block w-100 p-3" alt="Product" height={250} />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="carousel-item active">
                                                    <img src={defaultImage} className="d-block w-100 p-3" alt="Default" height={250} />
                                                </div>
                                            )}
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

                                    <div className='card-body'>
                                        <h5 className='card-title'> {product.product_name}</h5>
                                        <p className='card-text'>Rs. {product.product_base_price}</p>
                                        <NavLink to={`/admin/products/${product.product_id}/`} className="btn btn-success btnlogout">View Details</NavLink>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>


                <div className="pagination-controls">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}>
                        Previous
                    </button>
                    <span>{currentPage} of {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}>
                        Next
                    </button>
                </div>



            </div>
        </div>

    )
}

export default AdminProducts