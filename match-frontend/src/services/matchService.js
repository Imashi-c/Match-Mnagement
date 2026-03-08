import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/matches';

const matchService = {
  // Basic CRUD operations
  getAllMatches: () => axios.get(API_BASE_URL),
  
  getMatchById: (id) => axios.get(`${API_BASE_URL}/${id}`),
  
  createMatch: (matchData) => axios.post(API_BASE_URL, matchData),
  
  updateMatch: (id, matchData) => axios.put(`${API_BASE_URL}/${id}`, matchData),
  
  deleteMatch: (id) => axios.delete(`${API_BASE_URL}/${id}`),
  
  // Advanced search operations
  searchByOpponent: (opponent) => 
    axios.get(`${API_BASE_URL}/search/opponent`, { params: { opponent } }),
  
  getMatchesByDateRange: (startDate, endDate) => 
    axios.get(`${API_BASE_URL}/search/date-range`, { 
      params: { startDate, endDate } 
    }),
  
  getMatchesByType: (matchType) => 
    axios.get(`${API_BASE_URL}/search/type`, { params: { matchType } }),
  
  getMatchesByTeam: (teamName) => 
    axios.get(`${API_BASE_URL}/search/team`, { params: { teamName } }),
  
  // Special queries
  getUpcomingMatches: () => axios.get(`${API_BASE_URL}/upcoming`),
  
  getPastMatches: () => axios.get(`${API_BASE_URL}/past`),
  
  getLatestMatches: () => axios.get(`${API_BASE_URL}/latest`),
};

export default matchService;