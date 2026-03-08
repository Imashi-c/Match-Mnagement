import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import matchService from '../services/matchService';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMatches: 0,
    upcomingMatches: 0,
    pastMatches: 0
  });
  const [latestMatches, setLatestMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [allResponse, upcomingResponse, pastResponse, latestResponse] = await Promise.all([
        matchService.getAllMatches(),
        matchService.getUpcomingMatches(),
        matchService.getPastMatches(),
        matchService.getLatestMatches()
      ]);

      setStats({
        totalMatches: allResponse.data.data.length,
        upcomingMatches: upcomingResponse.data.data.length,
        pastMatches: pastResponse.data.data.length
      });

      setLatestMatches(latestResponse.data.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2> Match Management Dashboard</h2>
        <p>Overview of all cricket matches</p>
      </div>

      <div className="dashboard">
        <div className="dashboard-card" onClick={() => navigate('/matches')}>
          <h3>Total Matches</h3>
          <div className="count">{stats.totalMatches}</div>
          <p style={{ color: '#718096', marginTop: '0.5rem' }}>All time matches</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/matches/upcoming')}>
          <h3>Upcoming Matches</h3>
          <div className="count">{stats.upcomingMatches}</div>
          <p style={{ color: '#718096', marginTop: '0.5rem' }}>Scheduled matches</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/matches/past')}>
          <h3>Past Matches</h3>
          <div className="count">{stats.pastMatches}</div>
          <p style={{ color: '#718096', marginTop: '0.5rem' }}>Completed matches</p>
        </div>
      </div>

      <div className="page-header" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3> Latest Matches</h3>
            <p>Recently added or updated matches</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/matches/new')}>
             Add New Match
          </button>
        </div>
      </div>

      {latestMatches.length === 0 ? (
        <div className="alert alert-info">
          No matches available. Start by adding your first match!
        </div>
      ) : (
        <div className="match-grid">
          {latestMatches.slice(0, 6).map((match) => (
            <div key={match.matchId} className="match-card">
              <h3>vs {match.opponent}</h3>
              <p className="date"> {match.matchDate}</p>
              
              {match.venue && <div className="venue"> {match.venue}</div>}
              
              {match.matchType && (
                <span className="badge" style={{ background: '#667eea', color: 'white' }}>
                  {match.matchType}
                </span>
              )}

              <div className="match-card-actions" style={{ marginTop: '1rem' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/matches/${match.matchId}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/matches')}>
          View All Matches →
        </button>
      </div>
    </div>
  );
}

export default Dashboard;