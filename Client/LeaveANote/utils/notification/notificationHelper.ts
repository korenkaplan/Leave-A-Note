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

export const sendNotification = async (accident:Accident, deviceToken:string) => {
let serverKey = config.FIREBASE_SERVER_KEY;



};