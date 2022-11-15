import React from "react";
import { Link } from "react-router-dom";
import { Teams } from '../lib/dataTypes';
import getTeamLogo from '../lib/getTeamLogo';

interface TeamProps {
    gameId: string;
    game: Teams;
}

const Team = ({ gameId, game }: TeamProps) => {
    const home = game.home.name;
    const away = game.away.name;
    const gameUrl = `/games/${gameId}`;

    return (
        <div className='message is-info'>
            <div className='message-body'>
                <div className='columns'>
                    <div className='column'>
                        <div className='is-flex'>
                            <div className="mr-3">
                                <img src={getTeamLogo(away)} alt='' height='60px' width='90px' />
                            </div>
                            <div className='title'>{away}</div>
                        </div>
                    </div>
                    <div className='column'>
                        <div className='is-flex is-flex-direction-column is-align-items-center'>
                            <div className='title'>@</div>
                            <Link to={gameUrl} role='button' className='button is-info'>View</Link>
                        </div>
                    </div>
                    <div className='column'>
                        <div className='is-flex is-flex-direction-row-reverse'>
                            <div className="ml-3">
                                <img src={getTeamLogo(home)} alt='' height='60px' width='90px' />
                            </div>
                            <div className='title'>{home}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Team;