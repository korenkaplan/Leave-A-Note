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
  signupAttempt: (newUser: SignUpFormValues) => Promise<number>;
  handleLogOut: () => Promise<void>;
  uploadPhotoToStorage: (uri: string) => Promise<string>;
  updateUserInformation: (data: UserDataToUpdate) => Promise<[boolean, string]>;
  updateUserPassword: (oldPassword: string, newPassword: string) => Promise<[boolean, string]>; // update the user password: return 0 if updated successfully, 1 if wrong old password, 2 id problem at database.
  deleteAccident: (messageId: string) => Promise<[boolean, string]>;
  getUserById: (id: string, token: string) => Promise<User | null>; // get a user by Id and set CurrantUser state.
  deleteFromUnreadMessages: (messageId: string) => Promise<boolean>;
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


  //try to login  ------------------------------------------------------------------------------------ done
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
  //sing up attempt //TODO Sign up function handle the errors of exisiting (email password car number) with custom slide
  const signupAttempt = async (newUser: SignUpFormValues): Promise<number> => {
    //return: 0 -> success,1 -> phone number already in use, 2 -> email already in use, 3 -> car number already in use.
    try {
      const response: AxiosResponse<number> = await api.post('/users/signup', newUser);
      // Assuming the response data is a number indicating the result
      // Access the data from the response
      const result: number = response.data;
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error occurred during signup:', error);
      throw new Error('An error occurred during signup.');
    }
  };
  //get user by the id ------------------------------------------------------------------------------------ done
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
  //search a user's car number ------------------------------------------------------------------------------------ done
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
  // submit new note ------------------------------------------------------------------------------------ done
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
  //submit a new report  ------------------------------------------------------------------------------------ done
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
  //TODO show dialog and after the click:  return to login page and remove the token from the Async storage
  async function handleTokenError(): Promise<void> {
    // show the dialog 
    handleLogOut();
  }
  //upload the image to firebase storage ------------------------------------------------------------------------------------ done
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
  //user logout: Remove from async storage  set Authenticated to false return to login page  ------------------------------------------------------------------------------------ done
  const handleLogOut = async (): Promise<void> => {
    await AsyncStorage.removeItem('connectedUser');
    setAuthenticated(false);
  };
  // If checked set the token to AsyncStorage for auto login next app launch ------------------------------------------------------------------------------------ done
  const updateRememberMe = async (rememberMeValue: boolean, token: string): Promise<void> => {
    if (rememberMeValue)
      storeObject('connectedUser', token)
    else
      AsyncStorage.removeItem('connectedUser');
  };
  //The function receives a key and value and stores it in Async storage ------------------------------------------------------------------------------------ done
  const storeObject = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error storing object:', error);
    }
  };
  //update user information  ------------------------------------------------------------------------------------ done
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
      return responseData.success ? [true, responseData.message] : [false, responseData.error] as [boolean, string];

    } catch (error: any) {
      console.error(error.response.data); // Log the error response data for further analysis
      return [false, error.response.data.error];
    };
  }
  // update the user password:  ------------------------------------------------------------------------------------ done
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
      return responseData.success ? [responseData.success, responseData.message] : [responseData.success, responseData.error] as [boolean, string];
    }
    catch (error: any) {
      return [false, error.response.data.error];
    };
  }

  // delete accident from the users accidents history list ------------------------------------------------------------------------------------ done
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
  // delete accident from the users inbox list ------------------------------------------------------------------------------------ done
  const deleteFromUnreadMessages = async (messageId: string): Promise<boolean> => {
    if (!currentUser) return false;
    const requestBody = { userId: currentUser._id, messageId };
    const response = await api.post('/users/deleteMessageInbox', requestBody, { headers: { Authorization: `Bearer ${token}` } });
    const responseData: IHttpResponse<void> = response.data;
    if (responseData.tokenError) { handleTokenError() }
    return responseData.success;
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
    showError
  };


  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export default MainContextProvider;
