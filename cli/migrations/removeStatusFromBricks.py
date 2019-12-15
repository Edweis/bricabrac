import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pprint import pprint

# Use a service account
cred = credentials.Certificate('./serviceAccount.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
bricks = list(db.collection('bricks').get())

brick_ref = db.collection('bricks')
acc_ref = db.collection('acceptations')
user_id = 'RjlWeCdZLRMPheBDvyoSMz9vlbD3' #Moi !
for brick in bricks[1:]:
    brick_id = brick.id
    update_brick = brick.to_dict()
    status = update_brick.pop('status', 'none')

    acceptationId = user_id+'-'+brick_id
    acceptation = {
        'userId': user_id,
        'brickId': brick_id,
        'status': status
    }

    pprint(update_brick)
    pprint(acceptation)
    brick_ref.document(brick_id).set(update_brick)
    acc_ref.document(acceptationId).set(acceptation)
