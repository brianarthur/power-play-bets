export const getGameData = () => {
    return fetch('/games.json');
}

export const getTeamStats = () => {
    return fetch('/teams.json')
}