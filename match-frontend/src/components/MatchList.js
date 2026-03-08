import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import matchService from '../services/matchService';

function MatchList({ type = 'all' }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    opponent: '',
    matchType: '',
    teamName: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, [type]);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (type) {
        case 'upcoming':
          response = await matchService.getUpcomingMatches();
          break;
        case 'past':
          response = await matchService.getPastMatches();
          break;
        default:
          response = await matchService.getAllMatches();
      }
      setMatches(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await matchService.deleteMatch(id);
        fetchMatches();
      } catch (err) {
        alert('Failed to delete match');
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      let response;
      if (filters.opponent) {
        response = await matchService.searchByOpponent(filters.opponent);
      } else if (filters.matchType) {
        response = await matchService.getMatchesByType(filters.matchType);
      } else if (filters.teamName) {
        response = await matchService.getMatchesByTeam(filters.teamName);
      } else {
        response = await matchService.getAllMatches();
      }
      setMatches(response.data.data);
    } catch (err) {
      setError('Failed to apply filters');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({ opponent: '', matchType: '', teamName: '' });
    fetchMatches();
  };

  const getResultClass = (result) => {
    if (!result) return '';
    const lowerResult = result.toLowerCase();
    if (lowerResult.includes('won')) return 'won';
    if (lowerResult.includes('lost')) return 'lost';
    return 'draw';
  };

  const getMatchTypeBadge = (matchType) => {
    if (!matchType) return null;
    const type = matchType.toLowerCase();
    return `badge-${type}`;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h2>
          {type === 'upcoming' && ' Upcoming Matches'}
          {type === 'past' && ' Past Matches'}
          {type === 'all' && ' All Matches'}
        </h2>
        <p>Total matches: {matches.length}</p>
      </div>

      <div className="filters">
        <h3 style={{ marginBottom: '1rem' }}>Filters</h3>
        <div className="filter-group">
          <input
            type="text"
            name="opponent"
            placeholder="Search by opponent"
            value={filters.opponent}
            onChange={handleFilterChange}
          />
          <select name="matchType" value={filters.matchType} onChange={handleFilterChange}>
            <option value="">All Match Types</option>
            <option value="T20">T20</option>
            <option value="ODI">ODI</option>
            <option value="Test">Test</option>
            <option value="Practice">Practice</option>
          </select>
          <input
            type="text"
            name="teamName"
            placeholder="Team name"
            value={filters.teamName}
            onChange={handleFilterChange}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={applyFilters}>
              Apply Filters
            </button>
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="alert alert-info">No matches found</div>
      ) : (
        <div className="match-grid">
          {matches.map((match) => (
            <div key={match.matchId} className="match-card">
              <div className="match-card-header">
                <div>
                  <h3>vs {match.opponent}</h3>
                  <p className="date"> {match.matchDate}</p>
                </div>
                {match.matchType && (
                  <span className={`badge ${getMatchTypeBadge(match.matchType)}`}>
                    {match.matchType}
                  </span>
                )}
              </div>

              {match.venue && (
                <div className="venue"> {match.venue}</div>
              )}

              {match.teamName && (
                <p style={{ color: '#4a5568', marginTop: '0.5rem' }}>
                   {match.teamName}
                </p>
              )}

              {match.result && (
                <div className={`result ${getResultClass(match.result)}`}>
                  {match.result}
                </div>
              )}

              <div className="match-card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/matches/${match.matchId}`)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate(`/matches/edit/${match.matchId}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(match.matchId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MatchList;