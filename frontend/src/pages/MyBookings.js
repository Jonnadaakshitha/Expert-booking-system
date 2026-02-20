import React, { useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // State for the name search box
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!email) return alert("Please enter your email to search!");
    
    setLoading(true);
    try {
      // Requirement: GET /bookings?email=
      const response = await axios.get(`http://localhost:5000/api/bookings?email=${email}`);
      
      // If a name is provided in the search box, we filter the results locally
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
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>My Bookings</h2>
      <p style={{ color: '#666' }}>Enter your details to see your scheduled sessions.</p>
      
      {/* Search Section */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <input 
          type="text"
          placeholder="Your Name (Optional)" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          style={{ padding: '10px', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="email"
          placeholder="Your Email (Required)" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={fetchBookings} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#333', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Bookings List Section */}
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
              
              {/* This will show the name only if .populate('expertId') is used in backend */}
              <p style={{ margin: '5px 0' }}>
                <strong>Expert:</strong> {b.expertId?.name || "Expert profile unavailable"}
                </p>
              
              <p style={{ margin: '5px 0' }}><strong>Session:</strong> {b.slotDate} at {b.slotTime}</p>
              
              <p style={{ margin: '5px 0' }}>
                <strong>Status:</strong> 
                <span style={{ 
  marginLeft: '10px',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.9em',
  // UI logic: If it's Pending OR Confirmed, show Green/Confirmed
  backgroundColor: (b.status === 'Confirmed' || b.status === 'Pending') ? '#e6fffa' : '#fff5f5',
  color: (b.status === 'Confirmed' || b.status === 'Pending') ? '#2c7a7b' : '#c53030',
  fontWeight: 'bold'
}}>
  Confirmed
</span>
              </p>
            </div>
          ))
        ) : (
          !loading && <p style={{ color: '#999' }}></p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;