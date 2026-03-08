import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MatchList from './components/MatchList';
import MatchForm from './components/MatchForm';
import MatchDetails from './components/MatchDetails';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1> Match Management System</h1>
          </div>
          <ul className="navbar-menu">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/matches">All Matches</Link></li>
            <li><Link to="/matches/upcoming">Upcoming</Link></li>
            <li><Link to="/matches/past">Past</Link></li>
            <li><Link to="/matches/new">Add Match</Link></li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/matches" element={<MatchList type="all" />} />
            <Route path="/matches/upcoming" element={<MatchList type="upcoming" />} />
            <Route path="/matches/past" element={<MatchList type="past" />} />
            <Route path="/matches/new" element={<MatchForm />} />
            <Route path="/matches/edit/:id" element={<MatchForm />} />
            <Route path="/matches/:id" element={<MatchDetails />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>&copy; 2024 Match Management Service. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;