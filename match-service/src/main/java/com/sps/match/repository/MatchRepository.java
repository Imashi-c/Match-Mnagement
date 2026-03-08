package com.sps.match.repository;

import com.sps.match.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    // Find matches by opponent name (case-insensitive)
    List<Match> findByOpponentContainingIgnoreCase(String opponent);

    // Find matches between date range
    List<Match> findByMatchDateBetween(LocalDate startDate, LocalDate endDate);

    // Find matches by match type
    List<Match> findByMatchType(String matchType);

    // Find matches by team name
    List<Match> findByTeamName(String teamName);

    // Find matches by venue
    List<Match> findByVenueContainingIgnoreCase(String venue);

    // Find upcoming matches
    List<Match> findByMatchDateGreaterThanEqualOrderByMatchDateAsc(LocalDate date);

    // Find past matches
    List<Match> findByMatchDateLessThanOrderByMatchDateDesc(LocalDate date);

    // Custom query to find matches by result containing specific text
    @Query("SELECT m FROM Match m WHERE m.result LIKE %:result%")
    List<Match> findByResultContaining(@Param("result") String result);

    // Count matches by team
    long countByTeamName(String teamName);

    // Find latest matches (limit 10)
    List<Match> findTop10ByOrderByMatchDateDesc();
}