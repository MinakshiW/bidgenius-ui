import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Layout/NavBar';
import { useParams, useNavigate } from 'react-router-dom';

const ManualBidding = () => {
  const { auction_id } = useParams(); // Get auction ID from URL
  const [bidAmount, setBidAmount] = useState('');
  const [lastBid, setLastBid] = useState(null); // Store the latest bid amount
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the latest bid for this auction
    axios.get(`http://127.0.0.1:8000/lastbid/${auction_id}/`)
      .then((response) => {
        if (response.data.latest_bid) {
          setLastBid(response.data.latest_bid);
        } else {
          setLastBid(0); // No bids yet
        }
      })
      .catch((error) => {
        console.error('Error fetching last bid:', error);
      });
  }, [auction_id]);

  const handleBidSubmit = () => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      setError('Please enter a valid bid amount.');
      return;
    }

    // Check if the bid is higher than the last bid
    if (bidAmount <= lastBid) {
      setError('Your bid must be higher than the last bid.');
      return;
    }

    setError('');
    setSuccessMessage('');

    const bidData = {
      auction: auction_id,
      bid_amount: bidAmount,
      bidder: localStorage.getItem('user_id'), // Adjust based on your auth mechanism
    };

    axios.post('http://127.0.0.1:8000/manualbid/', bidData)
      .then((response) => {
        setSuccessMessage('Bid placed successfully!');
        setLastBid(bidAmount); // Update the last bid amount after successful bid
        setTimeout(() => {
          navigate('/auctions'); // Redirect to auctions page after placing the bid
        }, 2000);
      })
      .catch((error) => {
        console.error('Error placing bid:', error);
        setError('Failed to place bid. Please try again.');
      });
  };

  return (
    <div id="intro" className="bg-image bgimage111 vh-100 mask">
      <NavBar />
      <div className="container mt-5 p-5">
        <h2 className="text-center">Place Your Manual Bid</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              {lastBid !== null && (
                <div className="mb-3">
                  <h4>Last Bid: Rs. {lastBid}</h4>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="bidAmount">Bid Amount:</label>
                <input
                  type="number"
                  id="bidAmount"
                  className="form-control"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid amount"
                />
              </div>
              {error && <p className="text-danger mt-2">{error}</p>}
              {successMessage && <p className="text-success mt-2">{successMessage}</p>}
              <button onClick={handleBidSubmit} className="btn btn-success btnlogout mt-3">Submit Bid</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualBidding;
