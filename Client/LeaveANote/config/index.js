// Importing environment variables from the '@env' module.
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  SERVER_KEY,
} from '@env';

// Exporting an object that contains the imported environment variables.
// This allows other parts of your application to access these variables easily.
export default {
  // Your Firebase API key. Used for authenticating requests to Firebase services.
  API_KEY,
  
  // Your Firebase authentication domain. Specifies the domain for authentication.
  AUTH_DOMAIN,
  
  // Your Firebase project ID. Identifies your Firebase project.
  PROJECT_ID,
  
  // Your Firebase storage bucket. Used for storing files and assets.
  STORAGE_BUCKET,
  
  // Your Firebase messaging sender ID. Used for sending push notifications.
  MESSAGING_SENDER_ID,
  
  // Your Firebase app ID. Identifies the Firebase app.
  APP_ID,
  
  // Your Firebase measurement ID. Used for measuring user interactions.
  MEASUREMENT_ID,
  
  // A server key, which might be related to Firebase Cloud Messaging (FCM).
  // Used for sending push notifications from a server.
  SERVER_KEY,
};
