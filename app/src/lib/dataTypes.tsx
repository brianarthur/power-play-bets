export interface TeamBetStats {
    [key: string]: TeamPlayers;
}

export interface TeamPlayers {
    [key: string]: PlayerStats;
}

export interface PlayerStats {
    "pp_unit": string;
    "odds": string;
    "pp_stats": PPStats | null;
    "pp_stats_last5": PPStats | null;
    "pp_stats_percentiles": PPStats | null;
    "pp_stats_last5_percentiles": PPStats | null;
}

export interface PPStats {
    [key: string]: number;
}

export interface Teams {
    home: Team;
    away: Team;
}

export interface Team {
    name: string;
    stats: PPStats;
    rankings: PPStats;
}

export interface TeamStats {
    name: string;
    stats: PPStats;
    rankings: PPStats;
}