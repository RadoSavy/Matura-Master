import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin using environment variables
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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

const db = admin.firestore();

// Categories data
const categories = [
  {
    name: 'Bulgarian Language ',
    description: 'Study materials for Bulgarian language exam preparation',
    subject: 'Bulgarian',
    level: 'Matura',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    name: 'Literature',
    description: 'Study materials for literature exam preparation',
    subject: 'Bulgarian',
    level: 'Matura',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
];

// Function to seed categories
async function seedCategories() {
  try {
    console.log('🌱 Starting to seed categories...');

    const batch = db.batch();
    const categoryRefs = [];

    categories.forEach((category) => {
      const docRef = db.collection('categories').doc();
      batch.set(docRef, category);
      categoryRefs.push(docRef.id);
    });

    await batch.commit();

    console.log(`✅ Successfully seeded ${categories.length} categories`);
    console.log('Category IDs:', categoryRefs);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
}

// Run the seeder
seedCategories();
