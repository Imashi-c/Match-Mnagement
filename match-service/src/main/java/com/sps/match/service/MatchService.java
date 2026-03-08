package com.sps.match.service;

import com.sps.match.dto.MatchDTO;
import com.sps.match.dto.MatchRequest;
import com.sps.match.entity.Match;
import com.sps.match.exception.ResourceNotFoundException;
import com.sps.match.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchService {

    private final MatchRepository matchRepository;

    // Get all matches
    public List<MatchDTO> getAllMatches() {
        log.info("Fetching all matches");
        return matchRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get match by ID
    public MatchDTO getMatchById(Long id) {
        log.info("Fetching match with ID: {}", id);
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found with ID: " + id));
        return convertToDTO(match);
    }

    // Create new match
    @Transactional
    public MatchDTO createMatch(MatchRequest request) {
        log.info("Creating new match: {}", request);
        Match match = new Match();
        match.setOpponent(request.getOpponent());
        match.setMatchDate(request.getMatchDate());
        match.setVenue(request.getVenue());
        match.setResult(request.getResult());
        match.setMatchType(request.getMatchType());
        match.setTeamName(request.getTeamName());

        Match savedMatch = matchRepository.save(match);
        log.info("Match created successfully with ID: {}", savedMatch.getMatchId());
        return convertToDTO(savedMatch);
    }

    // Update match
    @Transactional
    public MatchDTO updateMatch(Long id, MatchRequest request) {
        log.info("Updating match with ID: {}", id);
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Match not found with ID: " + id));

        match.setOpponent(request.getOpponent());
        match.setMatchDate(request.getMatchDate());
        match.setVenue(request.getVenue());
        match.setResult(request.getResult());
        match.setMatchType(request.getMatchType());
        match.setTeamName(request.getTeamName());

        Match updatedMatch = matchRepository.save(match);
        log.info("Match updated successfully with ID: {}", id);
        return convertToDTO(updatedMatch);
    }

    // Delete match
    @Transactional
    public void deleteMatch(Long id) {
        log.info("Deleting match with ID: {}", id);
        if (!matchRepository.existsById(id)) {
            throw new ResourceNotFoundException("Match not found with ID: " + id);
        }
        matchRepository.deleteById(id);
        log.info("Match deleted successfully with ID: {}", id);
    }

    // Search matches by opponent
    public List<MatchDTO> searchByOpponent(String opponent) {
        log.info("Searching matches by opponent: {}", opponent);
        return matchRepository.findByOpponentContainingIgnoreCase(opponent).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get matches by date range
    public List<MatchDTO> getMatchesByDateRange(LocalDate startDate, LocalDate endDate) {
        log.info("Fetching matches between {} and {}", startDate, endDate);
        return matchRepository.findByMatchDateBetween(startDate, endDate).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get matches by type
    public List<MatchDTO> getMatchesByType(String matchType) {
        log.info("Fetching matches by type: {}", matchType);
        return matchRepository.findByMatchType(matchType).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get matches by team
    public List<MatchDTO> getMatchesByTeam(String teamName) {
        log.info("Fetching matches for team: {}", teamName);
        return matchRepository.findByTeamName(teamName).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get upcoming matches
    public List<MatchDTO> getUpcomingMatches() {
        log.info("Fetching upcoming matches");
        return matchRepository.findByMatchDateGreaterThanEqualOrderByMatchDateAsc(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get past matches
    public List<MatchDTO> getPastMatches() {
        log.info("Fetching past matches");
        return matchRepository.findByMatchDateLessThanOrderByMatchDateDesc(LocalDate.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get latest matches
    public List<MatchDTO> getLatestMatches() {
        log.info("Fetching latest 10 matches");
        return matchRepository.findTop10ByOrderByMatchDateDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Helper method to convert Entity to DTO
    private MatchDTO convertToDTO(Match match) {
        return new MatchDTO(
                match.getMatchId(),
                match.getOpponent(),
                match.getMatchDate(),
                match.getVenue(),
                match.getResult(),
                match.getMatchType(),
                match.getTeamName(),
                match.getCreatedAt(),
                match.getUpdatedAt()
        );
    }
}