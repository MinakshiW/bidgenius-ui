// ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();  // Fetch product ID from the URL
  const [product, setProduct] = useState(null);  // State to store product details
  const [loading, setLoading] = useState(true);  // State to handle loading state

  // Function to fetch product details from the backend
  const getProductDetails = () => {
    axios.get(`http://127.0.0.1:8000/product/${id}/`)  // Replace with your backend endpoint
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  };

  // Use effect hook to fetch data on component mount
  useEffect(() => {
    getProductDetails();
  }, [id]);

  // If data is still loading, show loading message
  if (loading) {
    return <div>Loading product details...</div>;
  }

  // If the product is not found, show a message
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div id="intro" className="bg-image bgimageuser vh-100 mask">
    <div className="content" style={{width:'40%',background:'rgb(224,224,224)'}}>
      <div className="row">
      <h1>Product Detail</h1>
        {/* Product Images Carousel */}
        <div className="col-md-6">
          <div id={`carouselProductImages`} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
            {product.product_imagess && product.product_imagess.length > 0 ?( 
              product.product_imagess.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={image.product_image} className="d-block w-100" alt={`Product ${index + 1}`} height={300} width={500} />
                </div>
              ))
            ):(
              <div className="carousel-item active">
                        {/* Fallback to a Bootstrap icon */}
                        <div className="d-flex justify-content-center align-items-center" style={{ height: 250 }}>
                        <i className="bi bi-image" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                      </div>
                     </div>
                      )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselProductImages" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselProductImages" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="col-md-6">
          
          <p><strong>Name: </strong>{product.product_name}</p>
          <p><strong>Description: </strong>{product.product_description}</p>
          <p><strong>First Name: </strong>{product.owner.first_name}</p>
          <p><strong>Last Name: </strong>{product.owner.last_name}</p>
          <p><strong>City: </strong>{product.owner.city}</p>
          <p><strong>Price: </strong>Rs. {product.product_base_price}</p>
          <p><strong>Manufacture Year: </strong> {product.product_manufacture_year}</p>
          <button className="btn btn-outline-success">Buy Now</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
