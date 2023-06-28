/* eslint-disable prettier/prettier */
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { User, Accident, NoteToSend, SignUpFormValues, ReportToSend, UserDataToUpdate, Token, PartialUserDataForAccident, IHttpResponse } from '../utils/interfaces/interfaces';
interface MainContextType {
  currentUser: User | undefined;
  showError: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  carNumInput: string;
  setCarNumInput: React.Dispatch<React.SetStateAction<string>>;
  damagedUserId: string;
  setDamagedUserId: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  submitNote: (note: NoteToSend) => Promise<boolean>;
  submitReport: (report: ReportToSend) => Promise<boolean>;
  searchCarNumber: (carNumber: string) => Promise<boolean>;
  loginAttempt: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  signupAttempt: (newUser: SignUpFormValues) => Promise<[boolean,string,string?]>;
  handleLogOut: () => Promise<void>;
  uploadPhotoToStorage: (uri: string) => Promise<string>;
  updateUserInformation: (data: UserDataToUpdate) => Promise<[boolean, string]>;
  updateUserPassword: (oldPassword: string, newPassword: string) => Promise<[boolean, string]>; // update the user password: return 0 if updated successfully, 1 if wrong old password, 2 id problem at database.
  deleteAccident: (messageId: string) => Promise<[boolean, string]>;
  getUserById: (id: string, token: string) => Promise<User | null>; // get a user by Id and set CurrantUser state.
  deleteFromUnreadMessages: (messageId: string) => Promise<boolean>;
  autoLoginNewUser:(newToken: string) => Promise<void>;
}

export const MainContext = createContext<MainContextType>({} as MainContextType);

function MainContextProvider({ children }: { children: ReactNode; }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [carNumInput, setCarNumInput] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [damagedUserId, setDamagedUserId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [token, setToken] = useState<string>('');
  const api: AxiosInstance = axios.create({
    baseURL: 'https://leave-a-note-nodejs-server.onrender.com/api', // Set your base URL
    // You can also configure other Axios options here
  });


  /**
 * Attempts to log in the user.
 * @param email The user's email.
 * @param password The user's password.
 * @param rememberMeValue Whether to remember the user's login.
 * @returns A promise that resolves to a boolean indicating whether the login was successful.
 */
  const loginAttempt = async (email: string, password: string, rememberMeValue: boolean): Promise<boolean> => {
    const loginData = {
      email,
      password,
    };
    try {
      const response = await api.post(`/users/login`, loginData);
      const responseData: IHttpResponse<{ token: string }> = response.data;
      if (!responseData.success || responseData.data === undefined) { return false; }
      const token = responseData.data.token
      setToken(token)
      updateRememberMe(rememberMeValue, token)
      const decoded: Token = jwt_decode(token);
      const connectedUser: User | null = await getUserById(decoded.id, token)
      if (!connectedUser) {
        console.error('Problem with Token')
        return false;
      }
      setCurrentUser(connectedUser);
      return true;
    } catch (error) {
      return false;
    }
  };
/**
 * Attempts to sign up a new user.
 * @param newUser The new user's sign up form values.
 * @returns A promise that resolves to a tuple containing a boolean indicating whether the sign up was successful,
 *          a string with a success/error message, and an optional error message if the sign up failed.
 */
  const signupAttempt = async (newUser: SignUpFormValues): Promise<[boolean,string,string?]> => {
    try {
      const requestBody= {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        carNumber:newUser.carNumber,
        phoneNumber:newUser.phoneNumber
      }
      const response = await api.post('/users/register',requestBody);
      const responseData: IHttpResponse<string>= response.data;
      return responseData.success? [true,responseData.message,responseData.data]: [false,responseData.error!];
  
    } catch (error: any) {
      return [false, error.response.data.error]
      
    }



  };
  /**
 * Automatically logs in a new user using the provided token.
 * @param newToken The token of the new user from the server.
 */
  const autoLoginNewUser = async (newToken:string)=>{
    await AsyncStorage.setItem('connectedUser',newToken)
    const decoded:Token = jwt_decode(newToken);
    setToken(newToken)
    const currantUser = await getUserById(decoded.id,newToken);
    
    if(currantUser != null)
    {
      setCurrentUser(currantUser);
      setAuthenticated(true);
    }
  }
/**
 * Retrieves a user by their ID.
 * @param id The ID of the user.
 * @param token The currant user's authentication token.
 * @returns A promise that resolves to a User object or null if the user is not found.
 */ 
  const getUserById = async (id: string, token: string): Promise<User | null> => {
    const requestBody = {
      query: {
        _id: id,
      },
      projection: {
        password: 0,
      },
    };
    try {
      const response: AxiosResponse = await api.post("/users/getUser", requestBody, { headers: { Authorization: 'Bearer ' + token, } });
      const responseData: IHttpResponse<User> = response.data;
      if (responseData.tokenError) { handleTokenError() }


      if (responseData.data === undefined) { return null; }
      return responseData.data;
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  };
 /**
 * Searches for a user's car number.
 * @param carNumber The car number to search for.
 * @returns A promise that resolves to a boolean indicating whether the car number was found.
 */ 
  const searchCarNumber = async (carNumber: string): Promise<boolean> => {
    const requestBody = {
      query: {
        carNumber
      },
      projection: {
        _id: 1,
      },
    };
    try {
      const response: AxiosResponse = await api.post("/users/getUser", requestBody, { headers: { Authorization: `Bearer ${token}`, } });
      const responseData: IHttpResponse<User> = response.data;
      if (responseData.tokenError) { handleTokenError() }

      return responseData.success;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };
/**
 * Submits a new note.
 * @param note The note to submit.
 * @returns A promise that resolves to a boolean indicating whether the note submission was successful.
 */
  const submitNote = async (note: NoteToSend): Promise<boolean> => {
    if (!currentUser) { return false; }
    const requestBody = {
      damaged_user_car_num: note.damagedCarNumber,
      hitting_user_car: currentUser.carNumber,
      hitting_user_phone: currentUser.phoneNumber,
      hitting_user_name: currentUser.name,
      imageSource: note.imageSource,
    };

    try {

      const response = await api.post("/notes/createNote", requestBody, { headers: { Authorization: `Bearer ${token}`, } });

      const responseData: IHttpResponse<void> = response.data;
      if (responseData.tokenError) { handleTokenError() }

      return responseData.success;
    } catch (error: any) {
      console.error(error.response.data); // Log the error response data for further analysis
      return false;
    }
  };
/**
 * Submits a new report.
 * @param report The report to submit.
 * @returns A promise that resolves to a boolean indicating whether the report submission was successful.
 */
  const submitReport = async (report: ReportToSend): Promise<boolean> => {
    try {
      if (!currentUser) { return false; }
      const requestBody = {
        imageUrl: report.imageUrl,
        damagedCarNumber: report.damagedCarNumber,
        hittingCarNumber: report.hittingCarNumber,
        isAnonymous: report.isAnonymous,
        reporter: {
          name: currentUser.name,
          phoneNumber: currentUser.phoneNumber
        }
      }
      const response = await api.post('/reports/createReport', requestBody, { headers: { Authorization: `Bearer ${token}`, } });

      const responseData: IHttpResponse<void> = response.data;
      if (responseData.tokenError) { handleTokenError() }

      return responseData.success;
    } catch (error: any) {
      console.error(error.response.data); // Log the error response data for further analysis
      return false;
    }
  };
 /**
 * Handles the token error by showing a dialog and logging out the user.
 * @returns A promise that resolves to void.
 */
  async function handleTokenError(): Promise<void> {
    // show the dialog 
    handleLogOut();
  }
  /**
 * Uploads an image to Firebase storage.
 * @param uri The URI of the image to upload.
 * @returns A promise that resolves to the download URL of the uploaded photo.
 */
  const uploadPhotoToStorage = async (uri: string): Promise<string> => {
    const timestamp: string = Date.now().toString();
    const photoRef = ref(storage, `photos/${carNumInput}/${timestamp}`);

    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      // Upload the blob to Firebase Storage
      const snapshot = await uploadBytes(photoRef, blob);

      // Get the download URL of the uploaded photo
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      return error.message;
    }
  };
/**
 * Handles the user logout by removing the token from async storage and setting authenticated to false.
 * @returns A promise that resolves to void.
 */
  const handleLogOut = async (): Promise<void> => {
    await AsyncStorage.removeItem('connectedUser');
    setAuthenticated(false);
  };
/**
 * Updates the remember me value and stores the token in async storage if checked.
 * @param rememberMeValue Whether to remember the user's login.
 * @param token The user's authentication token.
 * @returns A promise that resolves to void.
 */
  const updateRememberMe = async (rememberMeValue: boolean, token: string): Promise<void> => {
    if (rememberMeValue)
      storeObject('connectedUser', token)
    else
      AsyncStorage.removeItem('connectedUser');
  };
 /**
 * Stores an object in async storage with the specified key and value.
 * @param key The key of the object.
 * @param value The value of the object.
 * @returns A promise that resolves to void.
 */
  const storeObject = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error storing object:', error);
    }
  };
/**
 * Updates the user's information in the database.
 * @param data The user data to update.
 * @returns A promise that resolves to a tuple containing a boolean indicating whether the update was successful
 *          and a string with a success/error message.
 */
  const updateUserInformation = async (data: UserDataToUpdate): Promise<[boolean, string]> => {
    try {
      if (!currentUser) return [false, 'Problem with connection try to login again'];
      const requestBody = {
        userId: currentUser._id,
        update: {
          email: data.email,
          phoneNumber: data.phoneNumber,
          carNumber: data.carNumber,
          name: data.name,
        }
      }
      const response = await api.post('/users/informationUpdate', requestBody, { headers: { Authorization: `Bearer ${token}` } })
      const responseData: IHttpResponse<void> = response.data;
      if (responseData.tokenError) { handleTokenError() }

      //as [boolean,string] : I add this just because i know that if ! successful then error won't be undefined 100%
      return responseData.success ? [true, responseData.message] : [false, responseData.error!];

    } catch (error: any) {
      console.error(error.response.data); // Log the error response data for further analysis
      return [false, error.response.data.error];
    };
  }
 /**
 * Updates the user's password.
 * @param oldPassword The user's old password.
 * @param newPassword The user's new password.
 * @returns A promise that resolves to a tuple containing a boolean indicating whether the update was successful
 *          and a string with a success/error message.
 */
  const updateUserPassword = async (oldPassword: string, newPassword: string): Promise<[boolean, string]> => {
    try {
      if (!currentUser) return [false, 'Problem with connection try to login again'];
      const requestBody = {
        userId: currentUser._id,
        oldPassword,
        newPassword
      }
      const response = await api.post('/users/passwordUpdate', requestBody, { headers: { Authorization: `Bearer ${token}` } });
      const responseData: IHttpResponse<void> = response.data;
      if (responseData.tokenError) { handleTokenError() }
      return responseData.success ? [responseData.success, responseData.message] : [responseData.success, responseData.error!];
    }
    catch (error: any) {
      return [false, error.response.data.error];
    };
  }

  /**
 * Deletes an accident from the user's accidents history list.
 * @param messageId The ID of the accident message to delete.
 * @returns A promise that resolves to a tuple containing a boolean indicating whether the deletion was successful
 *          and a string with a success/error message.
 */
  const deleteAccident = async (messageId: string): Promise<[boolean, string]> => {
    try {
      if (!currentUser) return [false, 'Problem with connection try to login again'];

      const requestBody = { userId: currentUser._id, messageId };
      const response = await api.post('/users/deleteMessage', requestBody, { headers: { Authorization: `Bearer ${token}` } });
      const responseData: IHttpResponse<void> = response.data;
      if (responseData.tokenError) { handleTokenError() }
      return [responseData.success, responseData.message];

    } catch (error: any) {
      return [false, error.response.data.error]
    }
  };
/**
 * Deletes an accident from the user's inbox list.
 * @param messageId The ID of the accident message to delete.
 * @returns A promise that resolves to a boolean indicating whether the deletion was successful.
 */
  const deleteFromUnreadMessages = async (messageId: string): Promise<boolean> => {
try {
  if (!currentUser) return false;
  const requestBody = { userId: currentUser._id, messageId };
  const response = await api.post('/users/deleteMessageInbox', requestBody, { headers: { Authorization: `Bearer ${token}` } });
  const responseData: IHttpResponse<void> = response.data;
  if (responseData.tokenError) { handleTokenError() }
  return responseData.success;
} catch (error: any) {
  console.log(error.response.data.error);
  return false
}
  };

  const value: MainContextType = {
    authenticated,
    setAuthenticated,
    rememberMe,
    setRememberMe,
    carNumInput,
    setCarNumInput,
    submitNote,
    submitReport,
    searchCarNumber,
    damagedUserId,
    setDamagedUserId,
    currentUser,
    setCurrentUser,
    loginAttempt,
    signupAttempt,
    handleLogOut,
    uploadPhotoToStorage,
    updateUserInformation,
    updateUserPassword,
    deleteAccident,
    getUserById,
    deleteFromUnreadMessages,
    token,
    setToken,
    showError,
    autoLoginNewUser
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}
export default MainContextProvider;
