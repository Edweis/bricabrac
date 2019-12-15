import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pprint import pprint
from fromTrello import get_from_board

# Use a service account
cred = credentials.Certificate('./serviceAccount.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
bricks = db.collection('bricks').get()
# for brick in bricks:
    # pprint(brick.to_dict())

data = get_from_board()

pprint('PUSHING #'+str(len(data))+' to send')

brick_ref = db.collection('bricks')
for datum in data:
    print(datum['parentConcept'])
    comments = datum['comments']
    del datum['comments']
    brick_ref.document(datum['id']).set(datum)
    for comment in comments:
        brick_ref.document(datum['id']).collection('comments').document(comment['id']).set(comment)
