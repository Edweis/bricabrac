import requests
from pprint import pprint
from credentials import API_key, API_token
from datetime import datetime
creds = f'key={API_key}&token={API_token}'
test_url = f'https://api.trello.com/1/members/me/boards?{creds}'
response = requests.get(url=test_url)
assert response.status_code == 200

#board list
url = f'https://api.trello.com/1/members/me/boards?fields=name,url&{creds}'
response = requests.get(url=url)
# pprint(response.json())


#Bric-à-Brac
bab_board_id = '5b106070bdf0eabb78c63475'
url = f'https://api.trello.com/1/boards/{bab_board_id}?{creds}'
response = requests.get(url=url)
# pprint(response.json())
assert response.status_code == 200

#get comment
card_id_test='5b1972b6406c0ee8b78ab552'
def get_comments(card_id):
    url = f'https://api.trello.com/1/cards/{card_id}/actions?{creds}'
    response = requests.get(url=url)
    assert response.status_code == 200, response.__dict__

    data = response.json()
    res = []
    # pprint('ACTIONS')
    # pprint(data)
    for datum in data:
        username = datum['memberCreator']['username']
        res.append({
        'id': datum['id'],
        'text': datum['data'].get('text', None),
        'author': 'RjlWeCdZLRMPheBDvyoSMz9vlbD3' if username == 'francoisrulliere' else username,
        'datetime': datetime.fromtimestamp(int(datum['id'][0:8],16))
        })
    return res

assert len(get_comments(card_id_test)) == 2

#cards
def get_from_board():
    url = f'https://api.trello.com/1/boards/{bab_board_id}/cards?{creds}'
    response = requests.get(url=url)
    data = response.json()
    res = []
    print('GATHER DATA')
    for datum in data:
        # pprint(datum)
        comments = get_comments(datum['id'])
        res.append({
            'id': datum['id'],
            'parentConcept': datum['name'],
            'content': datum['desc'],
            'comments': comments,
            'author': 'RjlWeCdZLRMPheBDvyoSMz9vlbD3',
            'status': 'accepted',
            'childrenConcepts':[],
            'submitTime': datetime.fromtimestamp(int(datum['id'][0:8],16))
        })
        print('OK '+datum['name'])
    return res
