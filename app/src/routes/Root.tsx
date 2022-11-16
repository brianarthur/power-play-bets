import React from 'react';
import { useLoaderData, ScrollRestoration } from "react-router-dom";
import Team from '../components/Team';
import Navbar from '../components/Navbar';
import { Teams } from '../lib/dataTypes';
import { getTeamStats } from '../lib/getBetsData';

interface LoaderDataType {
    updated: string;
    data: { 
        [key: string]: Teams;
    };
}

function assertLoaderData(loaderData: any) {
    return loaderData as LoaderDataType;
}

export async function loader() {
    const res = await getTeamStats();
    const data = await res.json();
    return data;
}

const Root = () => {
    const loaderData: any = useLoaderData();
    const { updated, data: games} = assertLoaderData(loaderData);

    return (
        <>
            <Navbar />

            <div className='container mt-5 fixed-top-navbar-padding'>
                <div className='title is-5'>Last updated: {updated}</div>
                
                {Object.entries(games).map(([gameId, game], index) => 
                    <Team key={`team-${index}`} gameId={gameId} game={game} />
                )}
            </div>

            <ScrollRestoration />
        </>
    )
}


export default Root;