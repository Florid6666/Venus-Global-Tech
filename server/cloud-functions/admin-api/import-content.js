/**
 * Script to import content.json to Firestore
 * Run this after setting up Firebase
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importContent() {
  try {
    // Read content.json
    const contentPath = path.join(__dirname, '../../data/content.json');
    const contentData = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    
    // Write to Firestore
    await db.collection('cms').doc('content').set(contentData);
    
    console.log('✅ Content imported successfully to Firestore!');
    console.log('Collection: cms');
    console.log('Document: content');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing content:', error);
    process.exit(1);
  }
}

importContent();

