const TEAMS = {
    "Ducks": "24",
    "Coyotes": "53",
    "Bruins": "6",
    "Sabres": "7",
    "Flames": "20",
    "Hurricanes": "12",
    "Blackhawks": "16",
    "Avalanche": "21",
    "BlueJackets": "29",
    "Stars": "25",
    "RedWings": "17",
    "Oilers": "22",
    "Panthers": "13",
    "Kings": "26",
    "Wild": "30",
    "Canadiens": "8",
    "Predators": "18",
    "Devils": "1",
    "Islanders": "2",
    "Rangers": "3",
    "Senators": "9",
    "Flyers": "4",
    "Penguins": "5",
    "Sharks": "28",
    "Kraken": "55",
    "Blues": "19",
    "Lightning": "14",
    "MapleLeafs": "10",
    "Canucks": "23",
    "GoldenKnights": "54",
    "Capitals": "15",
    "Jets": "52",
} as { [key: string]: string }

export default function getTeamLogo(teamName: string) {
    const key = TEAMS[teamName];
    return `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${key}.svg`;
}