/* eslint-disable prettier/prettier */
import React, { createContext, useState, ReactNode } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { User, Accident, NoteToSend, SignUpFormValues, ReportToSend, UserDataToUpdate, Token, PartialUserDataForAccident, IHttpResponse } from '../utils/interfaces/interfaces';
interface MainContextType {
  currentUser: User | undefined;
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
  submitReport: (report: ReportToSend) => Promise<void>;
  searchCarNumber: (carNumber: string) => Promise<boolean>;
  loginAttempt: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  signupAttempt: (newUser: SignUpFormValues) => Promise<number>;
  handleLogOut: () => Promise<void>;
  getAllNotes: () => Promise<Accident[]>;
  getAllReports: () => Promise<Accident[]>;
  uploadPhotoToStorage: (uri: string) => Promise<string>;
  updateUserInformation: (data: UserDataToUpdate) => Promise<boolean>;
  updateUserPassword: (oldPassword: string, newPassword: string) => Promise<number>; // update the user password: return 0 if updated successfully, 1 if wrong old password, 2 id problem at database.
  deleteANoteById: (noteId: string) => Promise<boolean>;
  deleteAReportById: (id: string) => Promise<boolean>;
  getUserById: (id: string, token: Token) => Promise<User | null>; // get a user by Id and set CurrantUser state.
  deleteFromUnreadMessages: (id: string) => Promise<boolean>;
}

export const MainContext = createContext<MainContextType>({} as MainContextType);

function MainContextProvider({ children }: { children: ReactNode; }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [carNumInput, setCarNumInput] = useState<string>('');
  const [damagedUserId, setDamagedUserId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [token, setToken] = useState<string>('');

  const api: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com', // Set your base URL
    // You can also configure other Axios options here
  });
  //try to login  ------------------------------------------------------------------------------------ done
  const loginAttempt = async (email: string, password: string, rememberMeValue: boolean): Promise<boolean> => {
    const loginData = {
      email,
      password,
    };
    try {
      const response = await api.post(`https://leave-a-note-nodejs-server.onrender.com/api/users/login`, loginData);
      const responseData: IHttpResponse<{ token: string }> = response.data;
      if (!responseData.success || responseData.data === undefined) { return false; }
      setToken(responseData.data.token)
      updateRememberMe(rememberMeValue, token)
      const decoded: Token = jwt_decode(token);
      const connectedUser: User | null = await getUserById(decoded.id)
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
  //sing up attempt
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
  const getUserById = async (id: string): Promise<User | null> => {
    const requestBody = {
      query: {
        _id: id,
      },
      projection: {
        password: 0,
      },
    };
    try {
      const response: AxiosResponse = await api.post("https://leave-a-note-nodejs-server.onrender.com/api/users/getUser", requestBody,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
      const responseData: IHttpResponse<User> = response.data;
      if (responseData.tokenError)
        handleTokenError()

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
      const response: AxiosResponse = await api.post(
        "https://leave-a-note-nodejs-server.onrender.com/api/users/getUser",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData: IHttpResponse<User> = response.data;
      console.log(responseData)
      return responseData.success;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };
  // submit new note
  const submitNote = async (note: NoteToSend): Promise<boolean> => {
    if (!currentUser) {
      return false;
    }
    console.log(currentUser);

    const requestBody = {
      damaged_user_car_num: note.damagedCarNumber,
      hitting_user_car: currentUser.carNumber,
      hitting_user_phone: currentUser.phoneNumber,
      hitting_user_name: currentUser.name,
      imageSource: note.imageSource,
    };

    try {
      console.log(requestBody);

      const response = await api.post(
        "https://leave-a-note-nodejs-server.onrender.com/api/notes/createNote",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData: IHttpResponse<void> = response.data;
      console.log(responseData.message);
      return responseData.success;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log("Error 400: Bad Request");
        console.log(error.response.data); // Log the error response data for further analysis
      } else {
        console.log("An error occurred:", error.message);
      }
      return false;
    }
  };

  //submit a new report
  const submitReport = async (report: ReportToSend): Promise<void> => {
    // TODO: implement submit note to database
    // const response = await api.post(`/reports/addReport/${damagedUserId}`,note);
    console.log(report);
    console.log('submit report from context');
  };
  async function handleTokenError<T>(): Promise<void> {
    await AsyncStorage.removeItem('connectedUser');
    setAuthenticated(false);
  }
  //upload the image to firebase storage 
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
  //user logout: Remove from async storage  set Authenticated to false return to login page 
  const handleLogOut = async (): Promise<void> => {
    await AsyncStorage.removeItem('connectedUser');
    setAuthenticated(false);
  };

  const updateRememberMe = async (rememberMeValue: boolean, token: string): Promise<void> => {
    if (rememberMeValue)
      storeObject('connectedUser', token)
    else
      AsyncStorage.removeItem('connectedUser');
  };
  const storeObject = async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error storing object:', error);
    }
  };

  //Get all notes from database
  const getAllNotes = async (): Promise<Accident[]> => {
    try {
      const response = await api.get(`/users/all/notes/${currentUser?._id}`);
      const notes: Accident[] = response.data;
      return notes;

    } catch (error) {
      console.error('Error occurred during signup:', error);
      throw new Error('An error occurred during signup.');
    }
  };
  //Get all reports from database
  const getAllReports = async (): Promise<Accident[]> => {
    try {
      const response = await api.get(`/users/all/reports/${currentUser._id}`);
      const reports: Accident[] = response.data;
      return reports;
    } catch (error) {
      console.error('Error occurred during signup:', error);
      throw new Error('An error occurred during signup.');
    }
  };
  //update user information
  const updateUserInformation = async (data: UserDataToUpdate): Promise<boolean> => {
    try {
      const response = await api.post<UserDataToUpdate>(`/users/update/${currentUser?._id}`, data);
      const updatedData = response.data;
      if (updatedData !== null) {
        setCurrentUser((prevUser: User) => ({
          ...prevUser,
          fullname: updatedData.fullname,
          email: updatedData.email,
          carNum: updatedData.carNum,
          phoneNumber: updatedData.phoneNumber,
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error occurred during signup:', error);
      throw new Error('An error occurred during signup.');
    }
  };
  // update the user password: return 0 if updated successfully, 1 if wrong old password, 2 id problem at database
  const updateUserPassword = async (oldPassword: string, newPassword: string): Promise<number> => {
    const data = {
      oldPassword,
      newPassword,
    }

    try {
      const response = await api.post<number>('/users/updatePassowrd', data);
      const result = response.data;
      return result;
    } catch (error) {
      console.error('Error occurred during signup:', error);
      throw new Error('An error occurred during signup.');
    }
  };
  const deleteANoteById = async (noteId: string): Promise<boolean> => {
    try {
      // return true; //for testing purposes
      const response = await api.delete(`/notes/delete/${noteId}`);
      const result: boolean = response.data;
      return result;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };
  const deleteAReportById = async (reportId: string): Promise<boolean> => {
    try {
      // return true; //for testing purposes
      const response = await api.delete(`/reports/delete/${reportId}`);
      const result: boolean = response.data;
      return result;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };
  const deleteFromUnreadMessages = async (id: string): Promise<boolean> => {
    try {
      const response = await api.delete<boolean>(`/users/unread/${id}`);
      const result = response.data;
      return result;
    } catch (error: any) {
      console.log(error.message);
      return false;
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
    getAllNotes,
    getAllReports,
    uploadPhotoToStorage,
    updateUserInformation,
    updateUserPassword,
    deleteANoteById,
    deleteAReportById,
    getUserById,
    deleteFromUnreadMessages,
    token,
    setToken
  };


  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export default MainContextProvider;
