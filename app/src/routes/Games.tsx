import React, { useState } from 'react';
import { useLoaderData, ScrollRestoration } from "react-router-dom";
import Player from '../components/Player';
import TeamStats from '../components/TeamStats';
import Navbar from '../components/Navbar';
import getTeamLogo from '../lib/getTeamLogo';
import { Teams, TeamPlayers } from '../lib/dataTypes';
import { getTeamStats, getGameData } from '../lib/getBetsData';

interface LoaderDataType {
    updated: string;
    game: Teams;
    awayTeam: TeamPlayers;
    homeTeam: TeamPlayers;
}

function assertLoaderData(loaderData: any) {
    return {
        updated: loaderData.updated,
        game: loaderData.game,
        awayTeam: loaderData.awayTeam,
        homeTeam: loaderData.homeTeam,
    } as LoaderDataType
}

export async function loader({ params }: any) {
    const teamRes = await getTeamStats();
    const team_data = await teamRes.json();
    const updated = team_data.updated;
    const game = team_data.data[params.gameId];

    if (!game) {
        throw new Response("", {
            status: 404,
            statusText: "Game Not Found",
        });
    }

    const statsRes = await getGameData();
    const stats = await statsRes.json();
    const awayTeam = stats[game.away.name];
    const homeTeam = stats[game.home.name];

    return { updated, game, awayTeam, homeTeam };
}

const Games = () => {
    const loaderData: any = useLoaderData();
    const { updated, game, awayTeam, homeTeam } = assertLoaderData(loaderData);
    const [useLast5, setUseLast5] = useState(false);

    const awayName = game.away.name;
    const homeName = game.home.name;

    const awayTeamItems = Object.entries(awayTeam);
    const homeTeamItems = Object.entries(homeTeam);

    return (
        <>
            <Navbar />

            <div className='container mt-5 fixed-top-navbar-padding'>
                <div className='is-flex is-justify-content-space-between mb-3'>
                    <div className='title is-5'>Last updated: {updated}</div>
                    <div className='title is-6'>Game time: {game.time}</div>
                </div>

                <div className='columns'>
                    <div className='column is-flex is-justify-content-flex-start'>
                        <div className='mr-3'>
                            <img src={getTeamLogo(awayName)} alt='' height='42px' width='63px' />
                        </div>
                        <div className='title mt-2 mb-0'>{awayName}</div>
                    </div>
                    <div className='column is-flex is-justify-content-center'>
                        <div className='title mt-2 mb-0'>@</div>
                    </div>
                    <div className='column is-flex is-justify-content-flex-end'>
                        <div className='title mt-2 mb-0'>{homeName}</div>
                        <div className='ml-3'>
                            <img src={getTeamLogo(homeName)} alt='' height='42px' width='63px' />
                        </div>
                    </div>
                </div>

                <div className='columns'>
                    <div className='column'>
                        <TeamStats team={game.away} />
                    </div>
                    <div className='column'>
                        <TeamStats team={game.home} />
                    </div>
                </div>

                <hr className='has-background-info' />

                <div className='is-flex is-justify-content-space-between mb-3'>
                    <div className='title'>Player Power Play Stats - {useLast5 ? 'Last 5 Games': 'Full Season'}</div>

                    <div className='is-flex is-align-items-center'>
                        <div className='mr-3'>Last 5 Games</div>
                        <label className="switch-slider-container">
                            <input type="checkbox" checked={useLast5} onChange={() => setUseLast5(!useLast5)}/>
                            <span className="switch-slider"></span>
                        </label>
                    </div>
                </div>

                <div className='columns'>
                    <div className='column'>
                        <div className='is-flex is-justify-content-flex-start mb-3'>
                            <div className='title is-5 has-text-info'>{awayName} PP Stats</div>
                        </div>
                        {awayTeamItems.length === 0 && 
                            <div className='is-flex is-justify-content-flex-start'>No Power Play Stats Available</div>
                        }
                        {awayTeamItems.length > 0 && awayTeamItems.map(([player, stats], index) => {
                            return <Player key={`away-player-${index}`} name={player} playerStats={stats} last5={useLast5} />
                        })}
                    </div>
                    <div className='column'>
                        <div className='is-flex is-justify-content-flex-end mb-3'>
                            <div className='title is-5 has-text-info'>{homeName} PP Stats</div>
                        </div>
                        {homeTeamItems.length === 0 && 
                            <div className='is-flex is-justify-content-flex-end'>No Power Play Stats Available</div>
                        }
                        {homeTeamItems.length > 0 && homeTeamItems.map(([player, stats], index) => {
                            return <Player key={`home-player-${index}`} name={player} playerStats={stats} last5={useLast5} />
                        })}
                    </div>
                </div>
            </div>

            <ScrollRestoration />
        </>
    );
}

export default Games;