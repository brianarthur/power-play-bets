import React from 'react';
import { useLoaderData } from "react-router-dom";
import Team from '../components/Team';
import Navbar from '../components/Navbar';
import { Teams } from '../lib/dataTypes';
import { getTeamStats } from '../lib/getBetsData';

interface LoaderDataType {
    [key: string]: Teams,
}

function assertLoaderData(loaderData: any) {
    return loaderData as LoaderDataType;
}

export function loader() {
    return getTeamStats();
}

const Root = () => {
    const loaderData: any = useLoaderData();
    const games = assertLoaderData(loaderData);

    return (
        <>
            <Navbar />

            <div className='container mt-5 fixed-top-navbar-padding'>
                {Object.entries(games).map(([gameId, game], index) => 
                    <Team key={`team-${index}`} gameId={gameId} game={game} />
                )}
            </div>
        </>
    )
}


export default Root;