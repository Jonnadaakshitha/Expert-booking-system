import React, { useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has happened

  const fetchBookings = async () => {
    if (!email) return alert("Please enter your email to search!");
    
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings?email=${email}`);
      const data = response.data;
      
      const filtered = name 
        ? data.filter(b => b.name.toLowerCase().includes(name.toLowerCase())) 
        : data;
        
      setBookings(filtered);
    } catch (err) {
      console.error(err);
      alert("Error fetching bookings. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2>My Bookings</h2>
      <p style={{ color: '#666' }}>Enter your details to see your scheduled sessions.</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <input 
          type="text"
          placeholder="Filter by Customer Name (Optional)" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="email"
          placeholder="Your Email (Required)" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={fetchBookings} 
          style={{ 
            padding: '10px 25px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? "Searching..." : "Search Bookings"}
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {bookings.length > 0 ? (
          bookings.map(b => (
            <div key={b._id} style={{ 
              border: '1px solid #eee', 
              padding: '20px', 
              marginBottom: '15px', 
              borderRadius: '10px', 
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              backgroundColor: '#fff'
            }}>
              <p style={{ margin: '5px 0' }}><strong>Customer:</strong> {b.name}</p>
              
              {/* FIXED: Uses the populated expert name */}
              <p style={{ margin: '5px 0' }}>
                <strong>Expert:</strong> {b.expertId?.name || "Expert info not found"}
              </p>
              
              <p style={{ margin: '5px 0' }}><strong>Session:</strong> {b.slotDate} at {b.slotTime}</p>
              
              <p style={{ margin: '5px 0' }}>
                <strong>Status:</strong> 
                <span style={{ 
                  marginLeft: '10px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.85em',
                  backgroundColor: b.status === 'Confirmed' ? '#d4edda' : '#fff3cd',
                  color: b.status === 'Confirmed' ? '#155724' : '#856404',
                  fontWeight: 'bold'
                }}>
                  {b.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          hasSearched && !loading && (
            <p style={{ color: '#999', textAlign: 'center', marginTop: '40px' }}>
              No bookings found for this search. Try a different email or name.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default MyBookings;