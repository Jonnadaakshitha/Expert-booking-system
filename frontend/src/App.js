import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ExpertList from './pages/ExpertList';
import ExpertDetail from './pages/ExpertDetail';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <div>
      <nav style={{ padding: '20px', background: '#282c34', display: 'flex', gap: '20px' }}>
        {/* These Links now work because they are "inside" the BrowserRouter in index.js */}
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Experts</Link>
        <Link to="/my-bookings" style={{ color: 'white', textDecoration: 'none' }}>My Bookings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ExpertList />} />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </div>
  );
}

export default App;