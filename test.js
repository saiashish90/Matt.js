require('dotenv').config();
var admin = require('firebase-admin');
admin.initializeApp({
	credential  : admin.credential.cert(JSON.parse(process.env.GOOGLE)),
	databaseURL : 'https://amongus-44241.firebaseio.com'
});
const db = admin.firestore();
async function as() {
	const snapshot = await db.collection('Mattt').doc('uasd').get();
	console.log(await snapshot.data());
}
as();
