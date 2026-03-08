import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import matchService from '../services/matchService';

function MatchForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    opponent: '',
    matchDate: '',
    venue: '',
    result: '',
    matchType: '',
    teamName: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchMatchData();
    }
  }, [id]);

  const fetchMatchData = async () => {
    try {
      const response = await matchService.getMatchById(id);
      const match = response.data.data;
      setFormData({
        opponent: match.opponent || '',
        matchDate: match.matchDate || '',
        venue: match.venue || '',
        result: match.result || '',
        matchType: match.matchType || '',
        teamName: match.teamName || ''
      });
    } catch (err) {
      setError('Failed to fetch match data');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (isEditMode) {
        await matchService.updateMatch(id, formData);
        setSuccess(true);
        setTimeout(() => navigate('/matches'), 2000);
      } else {
        await matchService.createMatch(formData);
        setSuccess(true);
        setTimeout(() => navigate('/matches'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>{isEditMode ? '✏ Edit Match' : '➕ Add New Match'}</h2>
        <p>Fill in the match details below</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Match {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
        </div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Opponent Team *</label>
            <input
              type="text"
              name="opponent"
              value={formData.opponent}
              onChange={handleChange}
              required
              placeholder="Enter opponent team name"
            />
          </div>

          <div className="form-group">
            <label>Match Date *</label>
            <input
              type="date"
              name="matchDate"
              value={formData.matchDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Enter match venue"
            />
          </div>

          <div className="form-group">
            <label>Match Type</label>
            <select
              name="matchType"
              value={formData.matchType}
              onChange={handleChange}
            >
              <option value="">Select match type</option>
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="Test">Test</option>
              <option value="Practice">Practice Match</option>
            </select>
          </div>

          <div className="form-group">
            <label>Team Name</label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="e.g., Senior Team, U19 Team"
            />
          </div>

          <div className="form-group">
            <label>Result</label>
            <input
              type="text"
              name="result"
              value={formData.result}
              onChange={handleChange}
              placeholder="e.g., Won by 50 runs, Lost by 3 wickets"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Match' : 'Create Match'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/matches')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MatchForm;