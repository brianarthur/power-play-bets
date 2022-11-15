import React from 'react';
import { useLoaderData } from "react-router-dom";
import Player from '../components/Player';
import TeamStats from '../components/TeamStats';
import Navbar from '../components/Navbar';
import getTeamLogo from '../lib/getTeamLogo';
import { Teams, TeamPlayers } from '../lib/dataTypes';
import { getTeamStats, getGameData } from '../lib/getBetsData';

interface LoaderDataType {
    game: Teams,
    awayTeam: TeamPlayers;
    homeTeam: TeamPlayers;
}

function assertLoaderData(loaderData: any) {
    return {
        game: loaderData.game,
        awayTeam: loaderData.awayTeam,
        homeTeam: loaderData.homeTeam,
    } as LoaderDataType
}

export async function loader({ params }: any) {
    const teamRes = await getTeamStats();
    const games = await teamRes.json();
    const game = games[params.gameId];

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

    return { game, awayTeam, homeTeam };
}

const Games = () => {
    const loaderData: any = useLoaderData();
    const { game, awayTeam, homeTeam } = assertLoaderData(loaderData);

    const awayName = game.away.name;
    const homeName = game.home.name;

    const awayTeamItems = Object.entries(awayTeam);
    const homeTeamItems = Object.entries(homeTeam);

    return (
        <>
            <Navbar />

            <div className='container mt-5 fixed-top-navbar-padding'>
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
                <div className='columns'>
                    <div className='column'>
                        <div className='is-flex is-justify-content-flex-start mb-5'>
                            <div className='title has-text-info'>{awayName} Team PP Player Stats</div>
                        </div>
                        {awayTeamItems.length === 0 && 
                            <div className='is-flex is-justify-content-flex-start'>No Power Play Stats Available</div>
                        }
                        {awayTeamItems.length > 0 && awayTeamItems.map(([player, stats], index) => {
                            return <Player key={`away-player-${index}`} name={player} playerStats={stats} />
                        })}
                    </div>
                    <div className='column'>
                        <div className='is-flex is-justify-content-flex-end mb-5'>
                            <div className='title has-text-info'>{homeName} Team PP Player Stats</div>
                        </div>
                        {homeTeamItems.length === 0 && 
                            <div className='is-flex is-justify-content-flex-end'>No Power Play Stats Available</div>
                        }
                        {homeTeamItems.length > 0 && homeTeamItems.map(([player, stats], index) => {
                            return <Player key={`home-player-${index}`} name={player} playerStats={stats} />
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Games;