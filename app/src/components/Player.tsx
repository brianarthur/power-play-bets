import React from 'react';
import DisplayStatValue from './DisplayStatValue';
import { PlayerStats } from '../lib/dataTypes';

interface PlayerProps {
    name: string;
    playerStats: PlayerStats;
    last5: boolean;
}

const row1 = ['GP', 'TOI/GP', 'Goals', 'Assists', 'Shots', 'SH%'];
const row2 = ['CF', 'SF', 'GF', 'xGF', 'GF/xGF', 'HDCF'];

const Player = ({ name, playerStats, last5 }: PlayerProps) => {
    let stats = playerStats['pp_stats'];
    let percentiles = playerStats['pp_stats_percentiles'];

    if (last5) {
        stats = playerStats['pp_stats_last5'];
        percentiles = playerStats['pp_stats_last5_percentiles'];
    }

    const isStatsEmpty = !stats || !percentiles;

    return (
        <div className='message'>
            <div className='message-header'>
                {name}
            </div>
            <div className='message-body pt-3'>
                <div className='is-flex is-justify-content-space-between mb-3'>
                    <div className='title is-4 mb-0'>{playerStats.pp_unit}</div>
                    <div className='title is-6 mb-0'>{playerStats.odds}</div>
                </div>
                { isStatsEmpty && 
                    <div> No PP Stats available</div>
                }
                { !isStatsEmpty && 
                    <>
                        <div className='columns center-columns'>
                            {row1.map((col, idx) => 
                                <div key={`row1-${idx}`} className='column d-flex'>
                                    <DisplayStatValue stat={col} value={stats?.[col] || 0} rank={percentiles?.[col] || 0} getRankColorRange={getRankColorRange} />
                                </div>
                            )}
                        </div>
                        <div className='columns center-columns'>
                            {row2.map((col, idx) => 
                                <div key={`row2-${idx}`} className='column'>
                                    <DisplayStatValue stat={col} value={stats?.[col] || 0} rank={percentiles?.[col] || 0} getRankColorRange={getRankColorRange} />
                                </div>
                            )}
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

const getRankColorRange = (rank: number) => {
    if (rank >= 80) return 'very-high'
    else if (rank >= 60) return 'high';
    else if (rank >= 40) return 'average';
    else if (rank >= 20) return 'low';
    return 'very-low';
} 

export default Player;