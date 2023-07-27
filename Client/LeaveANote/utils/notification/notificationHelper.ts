import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'
import {Accident} from '../interfaces/interfaces'
import config from '../../config/index'

//request permission for notification messages
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getFcmToken();
    }
}
//get FcmToken to send notification 
export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    

    if (!fcmToken) {
        try {
            let token = await messaging().getToken();
            // console.log('token from getFcmToken():' + token);

            if (token) {
                await AsyncStorage.setItem('fcmToken', token);
            }

        } catch (error) {
            console.log('can\'t get FcmToken');

        }
    }
};
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


