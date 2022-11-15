import React from 'react';
import classNames from 'classnames';

interface StatValueProps {
    stat: string;
    value: number;
    rank: number;
    getRankColorRange(rank: number): string;
}

const DisplayStatValue = ({stat, value, rank, getRankColorRange}: StatValueProps) => {
    const colorRange = getRankColorRange(rank);
    const classes = classNames('stat-value', 'title', 'is-5', {
        'is-very-high': colorRange === 'very-high',
        'is-high': colorRange === 'high',
        'is-low': colorRange === 'low',
        'is-very-low': colorRange === 'very-low',
    });

    let val = `${value}`;
    if (!Number.isInteger(value)) {
        val = value.toFixed(2);
    }

    return (
        <div className='pp-stat'>
            <div className='title is-6 mb-2'>{stat}</div>
            <div className={classes}>{val}</div>
        </div>
    );
}

export default DisplayStatValue;