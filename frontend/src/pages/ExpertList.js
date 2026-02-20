import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6; // Set to 6 so it creates even rows of 3 or 2

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/experts`, {
          params: { search, category, page, limit:6 }
        });
        setExperts(res.data);
      } catch (err) {
        console.error("Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, [search, category, page]);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Available Experts</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        <input 
          placeholder="Search by name..." 
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <select 
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          style={{ padding: '10px', borderRadius: '5px' }}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Fitness">Fitness</option>
          <option value="Designing">Design</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {/* Responsive Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {experts.map(expert => (
          <div key={expert._id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <h3>{expert.name}</h3>
            <p><strong>{expert.category}</strong></p>
            <p>{expert.experience} years experience</p>
            <p>⭐ {expert.rating}</p>
            <Link to={`/expert/${expert._id}`}>
              <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ padding: '10px 20px' }}>Prev</button>
        <span style={{ margin: '0 20px' }}>Page {page}</span>
        <button disabled={experts.length < limit} onClick={() => setPage(p => p + 1)} style={{ padding: '10px 20px' }}>Next</button>
      </div>
    </div>
  );
};

export default ExpertList;