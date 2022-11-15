import React from 'react';
import DisplayStatValue from './DisplayStatValue';
import { TeamStats } from '../lib/dataTypes';

interface TeamStatsProps {
    team: TeamStats
}

const row1 = ['PTS', 'GF/G', 'PP%', 'PPGF', 'PPGF/G'];
const row2 = ['SV%', 'GA/G', 'PK%', 'PPGA', 'PPGA/G'];

const TeamStatsComponent = ({ team }: TeamStatsProps) => {
    return (
        <div className='message is-info'>
            <div className='message-header'>{team.name} Team PP Stats</div>
            <div className='message-body'>
                <div className='columns center-columns'>
                    {row1.map((col, idx) => 
                        <div key={`row1-${idx}`} className='column d-flex'>
                            <DisplayStatValue stat={col} value={team.stats[col]} rank={team.rankings[col]} getRankColorRange={getRankColorRange} />
                        </div>
                    )}
                </div>
                <div className='columns center-columns'>
                    {row2.map((col, idx) => 
                        <div key={`row2-${idx}`} className='column'>
                            <DisplayStatValue stat={col} value={team.stats[col]} rank={team.rankings[col]} getRankColorRange={getRankColorRange} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function getRankColorRange(rank: number) {
    if (rank <= 6) return 'very-high'
    else if (rank <= 12) return 'high';
    else if (rank <= 20) return 'average';
    else if (rank <= 26) return 'low';
    return 'very-low';
}

export default TeamStatsComponent;