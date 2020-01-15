import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pprint import pprint

# Use a service account
cred = credentials.Certificate('./credentials/firestoreCredentialsDev.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
users = list(db.collection('users').where("email", "==", "francois@rulliere.fr")
.get())
my_id = 'RjlWeCdZLRMPheBDvyoSMz9vlbD3' #Moi !
ids_to_replace = [user.id for user in users]


bricks = list(db.collection('bricks').get())
for brick_obj in bricks:
    brick = brick_obj.to_dict()
    brick_id = brick_obj.id
    if brick['author'] in ids_to_replace and brick['author'] != my_id:
        print('will replace ' + str(brick_id))
        brick['author'] = my_id
        db.collection('bricks').document(brick_id).set(brick)


print('----------------')
acceptations = db.collection('acceptations').get()
for accep_obj in acceptations:
    accep = accep_obj.to_dict()
    accep_id = accep_obj.id
    if accep['userId'] in ids_to_replace and accep['userId'] != my_id:
        print('will replace ' + str(accep_id))
        accep['userId'] = my_id

        db.collection('acceptations').document(accep_id).set(accep)



for user in users:
    if user.id != my_id:
        db.collection('users').document(user.id).delete()
