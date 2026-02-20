import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('https://expert-booking-system-wyjl.onrender.com');

const ExpertDetail = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

 useEffect(() => {
  const fetchExpertData = async () => {
    try {
      // 1. Get Expert Details
      const response = await axios.get('https://expert-booking-system-wyjl.onrender.com/api/experts');      setExpert(res.data);
      
      // Inside ExpertDetail.js useEffect
      const bookingRes = await axios.get(`http://localhost:5000/api/bookings/expert/${id}`);
      
      // Map the array of booking objects to just an array of time strings
      const alreadyBooked = bookingRes.data.map(b => b.slotTime);
      setBookedSlots(alreadyBooked);
      
    } catch (err) {
      console.error("Error loading data", err);
    } finally {
      setLoading(false);
    }
  };

  fetchExpertData();

  socket.on('slot_booked', (data) => {
    if (data.expertId === id) {
      setBookedSlots(prev => [...prev, data.slotTime]);
    }
  });

  return () => socket.off('slot_booked');
}, [id]);

  const handleBooking = async (slot) => {
  if (!name || !email || !phone) {
    alert("Please fill in all details first!");
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/bookings', {
      expertId: id,
      name,
      email,
      phone,
      slotDate: "2026-02-20",
      slotTime: slot
    });

    alert(response.data.message);
    
    // CRITICAL: This line turns the button grey immediately
    setBookedSlots(prev => [...prev, slot]); 

  } catch (err) {
    alert(err.response?.data?.error || "Booking failed");
  }
};

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Expert Profile...</div>;
  if (!expert) return <div style={{ textAlign: 'center', padding: '50px' }}>Expert not found.</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial' }}>
      <button onClick={() => window.history.back()} style={{ marginBottom: '20px', cursor: 'pointer', padding: '5px 15px' }}>← Back to List</button>
      
      <div style={{ display: 'flex', gap: '30px', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <div style={{ fontSize: '60px' }}>👨‍💼</div>
        <div>
          <h1>{expert.name}</h1>
          <p style={{ color: '#666', fontSize: '18px' }}>{expert.category} • {expert.experience} Years Exp.</p>
          <p>Rating: ⭐ {expert.rating}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '12px', border: '1px solid #eee' }}>
          <h3 style={{ marginTop: 0 }}>Confirm Your Details</h3>
          <label style={labelStyle}>Full Name</label>
          <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} placeholder="Your Name" />
          <label style={labelStyle}>Email Address</label>
          <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="email@example.com" />
          <label style={labelStyle}>Phone Number</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} placeholder="Phone Number" />
        </div>

        <div>
          <h3 style={{ marginTop: 0 }}>Available Slots</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Date: Feb 20, 2026</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {expert.availableSlots.map(slot => {
              const isBooked = bookedSlots.includes(slot);
              return (
                <button 
                  key={slot} 
                  disabled={isBooked}
                  onClick={() => handleBooking(slot)}
                  style={{ 
                    padding: '15px', 
                    fontSize: '15px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: isBooked ? 'not-allowed' : 'pointer',
                    backgroundColor: isBooked ? '#ccc' : '#28a745', 
                    color: 'white',
                    transition: 'background-color 0.2s'
                  }}
                >
                  {slot} {isBooked ? "(Booked)" : ""}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: '#555' };
const inputStyle = { display: 'block', width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' };

export default ExpertDetail;