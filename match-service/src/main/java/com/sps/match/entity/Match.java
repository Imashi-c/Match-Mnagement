package com.sps.match.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "match_id")
    private Long matchId;

    @NotBlank(message = "Opponent name is required")
    @Column(nullable = false, length = 100)
    private String opponent;

    @NotNull(message = "Match date is required")
    @Column(name = "match_date", nullable = false)
    private LocalDate matchDate;

    @Column(length = 200)
    private String venue;

    @Column(length = 50)
    private String result;

    @Column(name = "match_type", length = 50)
    private String matchType; // T20, ODI, Test, Practice

    @Column(name = "team_name", length = 100)
    private String teamName; // Senior Team, U19, U15, etc.

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}