package com.sps.match.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchDTO {

    private Long matchId;
    private String opponent;
    private LocalDate matchDate;
    private String venue;
    private String result;
    private String matchType;
    private String teamName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}