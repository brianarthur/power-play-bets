import requests
import json
import time

with open('api_key.json') as fp:
    data = json.load(fp)
    API_KEY = data["API_KEY"]

api_headers = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "betsapi2.p.rapidapi.com"
}


def api_get_upcoming_games():
    url = "https://betsapi2.p.rapidapi.com/v1/bet365/upcoming"

    sport_id = "17"         # sport_id for hockey for bet365
    league_id = "10037477"  # league id for NHL for bet365
    day = "20221104"        # use todays date (little bit buggy - might need to verify todays games)
    query_params = { "sport_id": sport_id, "league_id": league_id, "day": day }

    response = requests.request("GET", url, headers=api_headers, params=query_params)
    return response.json()


def api_get_game_odds(game_id: str):
    url = "https://betsapi2.p.rapidapi.com/v3/bet365/prematch"
    query_params = { "FI": game_id }

    response = requests.request("GET", url, headers=api_headers, params=query_params)
    return response.json()


def get_upcoming_games(use_api = False):
    if use_api:
        return api_get_upcoming_games()
    
    with open('upcoming_games.json') as fp:
        return json.load(fp)


def get_game_odds(game_id: str, use_api = False):
    if use_api:
        return api_get_game_odds(game_id)
    
    with open('game_odds.json') as fp:
        return json.load(fp)


# Only have limited api calls so i've been using game_odds/upcoming_games files instead
if __name__ == '__main__':
    # Get all upcoming NHL games (today)
    upcoming_games = get_upcoming_games()
    # parse game id from results
    now = time.time()
    for game in upcoming_games["results"]:
        # if now < int(game['time']):       might need this if filtering for todays games doesn't work
            print(game['id'])
    

    # Results for a specific game
    result = get_game_odds("127684536")
    # search for player power play props - found in others or players
    game_odds = result["results"][0]

    # player props - pp_points this has been empty from what i've seen
    pp_points = game_odds['player']['sp']['player_powerplay_points']

    # search through others market instead
    pp_points = [odds['sp']['player_powerplay_points'] for odds in game_odds['others'] if 'player_powerplay_points' in odds['sp'].keys()]
    pp_points = pp_points[0]
    
    for odds in pp_points['odds']:
        print(f"{odds['name2']} - {odds['name']}, {odds['header']} {odds['handicap']} @ x{odds['odds']}")