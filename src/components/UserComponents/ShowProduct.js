import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowProduct.css';

const ShowProduct = () => {

  const [products, setProducts] = useState([]);


  const getProductInformation = () => {
    axios.get('http://127.0.0.1:8000/product/')
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  useEffect(() => {
    getProductInformation();
  }, []);

  return (
    <div>
      <div id="intro" className="bg-image bgimageuser mask">
        <div className="container pt-5 mt-5">
          <h1 className="pt-5 text-light fw-bold text-center">All Products</h1>
          <div className="grid-container pt-5">
            {
              products.map((product, index) => {
                // const currentProductImages = images.filter(image => image.product === product.product_id);
                // console.log(currentProductImages);

                return (
                  <div key={index} className="grid-item text-dark card bg-danger-subtle">
                    {/* Carousel */}
                    <div id={`carouselExampleIndicators${product.product_id}`} className="carousel slide w-100 ms-auto" data-bs-ride="carousel">
                      <div className="carousel-inner">
                        {product.product_imagess && product.product_imagess.length > 0 ?( 
                        product.product_imagess.map((image, ind) => (
                          <div className={`carousel-item ${ind === 0 ? 'active' : ''}`} key={ind}>
                            <img src={image.product_image} className="d-block w-100 p-3" alt="Product" height={250} />
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
               
                      {/* Carousel Controls */}
                      <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${product.product_id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${product.product_id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="card-body">
                      <h5 className="card-title">{product.product_name}</h5>
                      <p className="card-text">Rs. {product.product_base_price}</p>
                      <a href={`/user/prod_details/${product.product_id}`} className="btn btn-success btnlogout">View Details</a>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
