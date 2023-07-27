import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'
import {Accident} from '../interfaces/interfaces'
import config from '../../config/index'

  /**
 * Checks if there is permission to get notifications.
 * if there is returns the most updated device token else returns null
 * @returns DeviceToken | null
 */
export const requestUserPermission = async ():Promise<string> => {
    const authStatus = await messaging().requestPermission();

    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        return updateTokenInAsyncStorage();
    }
    return ''
}
//get FcmToken to send notification 
  /**
 * Get the most updated Device token and set it to Async Storage and return the token.
 * if there is an error, return null
 * @returns DeviceToken : string | null
 */
export const updateTokenInAsyncStorage = async (): Promise<string> => {
    try {
            let updatedToken = await messaging().getToken();
            await AsyncStorage.setItem('fcmToken',updatedToken);
            return updatedToken;
        } catch (error: any) {
            console.log('Error in function updateTokenInAsyncStorage:' + error.message);
            return '';
        }
    }
//send notification
export const sendNotification = async (notificationTitle:string,notificationBody:string, deviceToken:string) => {

let serverKey = config.SERVER_KEY 
const message = {
    registration_ids: [deviceToken],
    notification: {title: notificationTitle,body: notificationBody,},
}

    try {
        const req = await fetch(`https://fcm.googleapis.com/fcm/send`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serverKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        if (req.ok) {
            console.log('Notification sent successfully');
          } else {
            const textResponse = await req.text();
            console.log('Error sending message:', textResponse);
          }
    } catch (error) {
        console.log('Error sending message:', error);
    }
};
