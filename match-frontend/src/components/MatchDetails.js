import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import matchService from '../services/matchService';

function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatchDetails();
  }, [id]);

  const fetchMatchDetails = async () => {
    try {
      const response = await matchService.getMatchById(id);
      setMatch(response.data.data);
    } catch (err) {
      setError('Failed to fetch match details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await matchService.deleteMatch(id);
        navigate('/matches');
      } catch (err) {
        alert('Failed to delete match');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading match details...</p>
      </div>
    );
  }

  if (error || !match) {
    return <div className="alert alert-error">{error || 'Match not found'}</div>;
  }

  const getResultClass = (result) => {
    if (!result) return '';
    const lowerResult = result.toLowerCase();
    if (lowerResult.includes('won')) return 'won';
    if (lowerResult.includes('lost')) return 'lost';
    return 'draw';
  };

  return (
    <div>
      <div className="page-header">
        <h2> Match Details</h2>
        <p>Complete information about the match</p>
      </div>

      <div className="form-container">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h2 style={{ color: '#667eea', fontSize: '2rem', marginBottom: '1rem' }}>
                vs {match.opponent}
              </h2>
              {match.matchType && (
                <span
                  className="badge"
                  style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem'
                  }}
                >
                  {match.matchType}
                </span>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '1.2rem', color: '#4a5568' }}>
                 {new Date(match.matchDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          background: '#f7fafc', 
          padding: '1.5rem', 
          borderRadius: '12px',
          marginBottom: '1.5rem'
        }}>
          {match.venue && (
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#4a5568' }}>📍 Venue:</strong>
              <p style={{ fontSize: '1.1rem', color: '#2d3748', marginTop: '0.5rem' }}>
                {match.venue}
              </p>
            </div>
          )}

          {match.teamName && (
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#4a5568' }}>🏆 Team:</strong>
              <p style={{ fontSize: '1.1rem', color: '#2d3748', marginTop: '0.5rem' }}>
                {match.teamName}
              </p>
            </div>
          )}

          {match.result && (
            <div>
              <strong style={{ color: '#4a5568' }}>Result:</strong>
              <div
                className={`result ${getResultClass(match.result)}`}
                style={{
                  fontSize: '1.2rem',
                  marginTop: '0.5rem',
                  display: 'inline-block'
                }}
              >
                {match.result}
              </div>
            </div>
          )}
        </div>

        <div style={{ 
          background: '#edf2f7', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          color: '#718096'
        }}>
          <p>Created: {new Date(match.createdAt).toLocaleString()}</p>
          <p>Last Updated: {new Date(match.updatedAt).toLocaleString()}</p>
        </div>

        <div className="form-actions">
          <button
            className="btn btn-warning"
            onClick={() => navigate(`/matches/edit/${match.matchId}`)}
          >
            ✏ Edit Match
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            🗑 Delete Match
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/matches')}
          >
            ← Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchDetails;