package com.sps.match.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchRequest {

    @NotBlank(message = "Opponent name is required")
    private String opponent;

    @NotNull(message = "Match date is required")
    private LocalDate matchDate;

    private String venue;
    private String result;
    private String matchType;
    private String teamName;
}