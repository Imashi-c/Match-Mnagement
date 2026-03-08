package com.sps.match.controller;

import com.sps.match.dto.ApiResponse;
import com.sps.match.dto.MatchDTO;
import com.sps.match.dto.MatchRequest;
import com.sps.match.service.MatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequiredArgsConstructor
@Slf4j
public class MatchController {

    private final MatchService matchService;

    // Get all matches
    @GetMapping
    public ResponseEntity<ApiResponse<List<MatchDTO>>> getAllMatches() {
        log.info("GET /api/matches - Fetching all matches");
        List<MatchDTO> matches = matchService.getAllMatches();
        return ResponseEntity.ok(ApiResponse.success("Matches retrieved successfully", matches));
    }

    // Get match by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MatchDTO>> getMatchById(@PathVariable Long id) {
        log.info("GET /api/matches/{} - Fetching match by ID", id);
        MatchDTO match = matchService.getMatchById(id);
        return ResponseEntity.ok(ApiResponse.success("Match retrieved successfully", match));
    }

    // Create new match
    @PostMapping
    public ResponseEntity<ApiResponse<MatchDTO>> createMatch(@Valid @RequestBody MatchRequest request) {
        log.info("POST /api/matches - Creating new match");
        MatchDTO createdMatch = matchService.createMatch(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Match created successfully", createdMatch));
    }

    // Update match
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MatchDTO>> updateMatch(
            @PathVariable Long id,
            @Valid @RequestBody MatchRequest request) {
        log.info("PUT /api/matches/{} - Updating match", id);
        MatchDTO updatedMatch = matchService.updateMatch(id, request);
        return ResponseEntity.ok(ApiResponse.success("Match updated successfully", updatedMatch));
    }

    // Delete match
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMatch(@PathVariable Long id) {
        log.info("DELETE /api/matches/{} - Deleting match", id);
        matchService.deleteMatch(id);
        return ResponseEntity.ok(ApiResponse.success("Match deleted successfully", null));
    }

    // Search matches by opponent
    @GetMapping("/search/opponent")
    public ResponseEntity<ApiResponse<List<MatchDTO>>> searchByOpponent(
            @RequestParam String opponent) {
        log.info("GET /api/matches/search/opponent?opponent={}", opponent);
        List<MatchDTO> matches = matchService.searchByOpponent(opponent);
        return ResponseEntity.ok(ApiResponse.success("Matches found", matches));
    }

    // Get matches by date range
    @GetMapping("/search/date-range")
    public ResponseEntity<ApiResponse<List<MatchDTO>>> getMatchesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        log.info("GET /api/matches/search/date-range?startDate={}&endDate={}", startDate, endDate);
        List<MatchDTO> matches = matchService.getMatchesByDateRange(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success("Matches found", matches));
    }

    // Get matches by type
    @GetMapping("/search/type")
    public ResponseEntity<ApiResponse<List<MatchDTO>>> getMatchesByType(
            @RequestParam String matchType) {
        log.info("GET /api/matches/search/type?matchType={}", matchType);
        List<MatchDTO> matches = matchService.getMatchesByType(matchType);
        return ResponseEntity.ok(ApiResponse.success("Matches found", matches));
    }

    // Get matches by team
    @GetMapping("/search/team")
    public ResponseEntity<ApiResponse<List<MatchDTO>>> getMatchesByTeam(
            @RequestParam String teamName) {
        log.info("GET /api/matches/search/team?teamName={}", teamName);
        List<MatchDTO> matches = matchService.getMatchesByTeam(teamName);
        return ResponseEntity.ok(ApiResponse.success("Matches found", matches));
    }

    // Get upcoming matches
    @GetMapping("/upcoming")
    public ResponseEntity<ApiResponse<List<MatchDTO>>> getUpcomingMatches() {
        log.info("GET /api/matches/upcoming - Fetching upcoming matches");
        List<MatchDTO> matches = matchService.getUpcomingMatches();
        return ResponseEntity.ok(ApiResponse.success("Upcoming matches retrieved", matches));
    }

    // Get past matches
    @GetMapping("/past")
    public ResponseEntity<ApiResponse<List<MatchDTO>>> getPastMatches() {
        log.info("GET /api/matches/past - Fetching past matches");
        List<MatchDTO> matches = matchService.getPastMatches();
        return ResponseEntity.ok(ApiResponse.success("Past matches retrieved", matches));
    }

    // Get latest matches
    @GetMapping("/latest")
    public ResponseEntity<ApiResponse<List<MatchDTO>>> getLatestMatches() {
        log.info("GET /api/matches/latest - Fetching latest matches");
        List<MatchDTO> matches = matchService.getLatestMatches();
        return ResponseEntity.ok(ApiResponse.success("Latest matches retrieved", matches));
    }
}