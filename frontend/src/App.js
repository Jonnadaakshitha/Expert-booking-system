import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import ExpertList from './pages/ExpertList';
import ExpertDetail from './pages/ExpertDetail';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <SocketProvider>
      <Router>
        <div style={{ fontFamily: 'sans-serif' }}>
          <nav style={{ padding: '15px', background: '#333', color: 'white' }}>
            <a href="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Home</a>
            <a href="/my-bookings" style={{ color: 'white', textDecoration: 'none' }}>My Bookings</a>
          </nav>
          <Routes>
            <Route path="/" element={<ExpertList />} />
            <Route path="/expert/:id" element={<ExpertDetail />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;