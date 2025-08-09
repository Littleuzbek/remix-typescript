const isServer = typeof window === "undefined";
let adminInitPromise;

export async function getAdminServices() {
  if (!adminInitPromise && isServer) {
    adminInitPromise = (async () => {
      try {
        const adminSDK = await import("firebase-admin");
        const admin = adminSDK.default;

        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert({
              type: process.env.FIREBASE_TYPE,
              project_id: process.env.FIREBASE_PROJECT_ID,
              private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
              private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(
                /\\n/g,
                "\n"
              ),
              client_email: process.env.FIREBASE_CLIENT_EMAIL,
              client_id: process.env.FIREBASE_CLIENT_ID,
              auth_uri: process.env.FIREBASE_AUTH_URI,
              token_uri: process.env.FIREBASE_TOKEN_URI,
              auth_provider_x509_cert_url:
                process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
              client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
              universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          });
        }

        return {
          admin,
          adminDb: admin.firestore(),
          adminAuth: admin.auth(),
          adminStorage: admin.storage(),
        };
      } catch (error) {
        console.error("Firebase Admin SDK initialization failed:", error);
        throw error;
      }
    })();
  }

  return adminInitPromise;
}


// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_DILSHOD_API_KEY,
  authDomain: process.env.FIREBASE_DILSHOD_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_DILSHOD_PROJECT_ID,
  storageBucket: process.env.FIREBASE_DILSHOD_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_DILSHOD_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_DILSHOD_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);