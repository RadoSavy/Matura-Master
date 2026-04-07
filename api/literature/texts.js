const admin = require('firebase-admin');

let db = null;
let initialized = false;

function initializeFirebase() {
  if (initialized) {
    return db;
  }

  try {
    if (!admin.apps.length) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
      
      const serviceAccount = {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: privateKey,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });

      console.log('Firebase initialized successfully');
    }
    
    db = admin.firestore();
    initialized = true;
    return db;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
}

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const firestore = initializeFirebase();

    const snapshot = await firestore.collection('literature_texts').get();
    const texts = [];

    snapshot.forEach((doc) => {
      texts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(texts);
  } catch (error) {
    console.error('Error fetching literature texts:', error);
    res.status(500).json({ error: error.message, details: error.toString() });
  }
}

module.exports = handler;
