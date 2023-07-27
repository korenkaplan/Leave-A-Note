// src/services/sendNotification.ts
import * as admin from 'firebase-admin';
import { FIREBASE_ENV } from "../config/environment";

admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": FIREBASE_ENV.project_id,
    "privateKey": FIREBASE_ENV.private_key,
    "clientEmail": FIREBASE_ENV.client_email,
  }),
  databaseURL: 'https://fcm.googleapis.com/fcm/send',
});

export async function sendNotificationToUser(fcmToken: string, title: string, body: string, data: object = {}) {
  const message = {
    token: fcmToken,
    notification: {
      title: title,
      body: body,
    },
    data: {
      ...data, // This will merge the passed data into the existing data object
    },
  };
  await admin.messaging().send(message);
}
