/* eslint-disable prettier/prettier */
import React, { createContext, useState, ReactNode} from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {storage} from '../config/FirebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import {User, Accident, NoteToSend, SignUpFormValues, ReportToSend , UserDataToUpdate} from '../utils/interfaces/interfaces';
interface MainContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  carNumInput: string;
  setCarNumInput: React.Dispatch<React.SetStateAction<string>>;
  damagedUserId: string;
  setDamagedUserId: React.Dispatch<React.SetStateAction<string>>;
  submitNote: (note: NoteToSend) => Promise<void>;
  submitReport: (report: ReportToSend) => Promise<void>;
  searchCarNumber: (carNumber: string) => Promise<boolean>;
  loginAttempt: (email: string, password: string, rememberMe: boolean) => Promise<boolean | void>;
  signupAttempt: (newUser: SignUpFormValues) => Promise<number>;
  handleLogOut: () => Promise<void>;
  getAllNotes: () => Promise<Accident[]>;
  getAllReports: () => Promise<Accident[]>;
  uploadPhotoToStorage: (uri:string) => Promise<string>;
  updateUserInformation:(data: UserDataToUpdate) => Promise<boolean>;
  updateUserPassword:(oldPassword: string, newPassword:string) => Promise<number>; // update the user password: return 0 if updated successfully, 1 if wrong old password, 2 id problem at database.
  deleteANoteById:(noteId:string) => Promise<boolean>; 
  deleteAReportById:(id:string) => Promise<boolean>;
  getUserById:(id: string) => Promise<void>; // get a user by Id and set CurrantUser state.
  deleteFromUnreadMessages: (id:string)=> Promise<boolean>;
}

export const MainContext = createContext<MainContextType>({} as MainContextType);

function MainContextProvider({ children }: { children: ReactNode; }) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [carNumInput, setCarNumInput] = useState<string>('');
  const [damagedUserId, setDamagedUserId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>({
    _id:'1',
    name: 'test name',
    email: 'testemail@gmail.com',
    phoneNumber: '0533406789',
    carNum: '8333368',
    unreadMessages: [
      // {
      //   id: '1',
      //   hittingDriver: {
      //     name: 'Koren Kaplan',
      //     carNumber: '8333368',
      //     phoneNumber: '0533406789',
      //   },
      //   date: '02/12/2023',
      //   type: 'note',
      //   imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-3.jpg',
      // },
      // {
      //   id: '2',
      //   hittingDriver: {
      //     name: 'Ofri Malka',
      //     carNumber: '69354401',
      //     phoneNumber: '0528942612',
      //   },
      //   reporter: {
      //     name: 'Koren Kaplan',
      //     phoneNumber: '0533406789',
      //   },
      //   date: '04/12/2023',
      //   type: 'report',
      //   isAnonymous: true,
      //   isIdentify: true,
      //   imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467046/cld-sample-4.jpg',
      // },
 
    ],
    notes:[
      {
        id: '10',
        hittingDriver: {
          name: 'Koren Kaplan',
          carNumber: '8333368',
          phoneNumber: '0533406789',
        },
        date: '02/12/2023',
        type: 'note',
        imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-3.jpg',
      },
    ],
    reports:[
      {
        id: '2',
        hittingDriver: {
          name: 'Ofri Malka',
          carNumber: '69354401',
          phoneNumber: '0528942612',
        },
        reporter: {
          name: 'Koren Kaplan',
          phoneNumber: '0533406789',
        },
        date: '04/12/2023',
        type: 'report',
        isAnonymous: true,
        isIdentify: true,
        imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467046/cld-sample-4.jpg',
      },
      {
        id: '3',
        hittingDriver: {
          carNumber: '8333368',
        },
        reporter: {
          name: 'Koren Kaplan',
          phoneNumber: '0533406789',
        },
        date: '03/12/2023',
        type: 'report',
        isAnonymous: false,
        isIdentify: false,
        imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-2.jpg',
      },
      // {
      //   id: '4',
      //   hittingDriver: {
      //     name: 'Ofri Malka',
      //     carNumber: '69354401',
      //     phoneNumber: '0528942612',
      //   },
      //   reporter: {
      //     name: 'Koren Kaplan',
      //     phoneNumber: '0533406789',
      //   },
      //   date: '04/12/2023',
      //   type: 'report',
      //   isAnonymous: false,
      //   isIdentify: true,
      //   imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467044/cld-sample.jpg',
      // },
      // {
      //   id: '5',
      //   hittingDriver: {
      //     carNumber: '8333368',
      //   },
      //   reporter: {
      //     name: 'Koren Kaplan',
      //     phoneNumber: '0533406789',
      //   },
      //   date: '03/12/2023',
      //   type: 'report',
      //   isAnonymous: true,
      //   isIdentify: false,
      //   imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467034/samples/landscapes/nature-mountains.jpg',
      // },
    ],
  });
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Set your base URL
  // You can also configure other Axios options here
});
  const getUserById = async (id: string):Promise<void> =>{
    const query = {"_id": id};
    const projection = {"password":0}
    try {
      const response: AxiosResponse = await api.post(`https://leave-a-note-nodejs-server.onrender.com/api/users/getUser`,{query,projection});
      const user: User = response.data;
      console.log(user);
      
      setCurrentUser(user);
      
    } catch (error: any) {
      console.log(error.message);
      console.error(error.message);
    }
   
  };
  const uploadPhotoToStorage = async (uri:string): Promise<string> => {
  const timestamp: string = Date.now().toString();
  const photoRef = ref(storage, `photos/${carNumInput}/${timestamp}`); 

  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload the blob to Firebase Storage
    const snapshot = await uploadBytes(photoRef, blob);

    // Get the download URL of the uploaded photo
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('Photo uploaded successfully. Download URL:', downloadURL);
    return downloadURL;
  } catch (error:any) {
    console.error('Error uploading photo:', error);
    return error.message;
  }
};
  const handleLogOut = async (): Promise<void> => {
    await AsyncStorage.removeItem('connectedUser');
    setAuthenticated(false);
  };
  //search a user's car number
  const searchCarNumber = async (carNumber: string): Promise<boolean> => {
    try {
      // const response = await api.get(`/users/getByCarNumber/${carNumber}`);
      // const user = response.data;

      // if (user) {
      //   setDamagedUserId(user.id); // Assuming the user object has an 'id' property
      //   return true;
      // } else {
      //   return false;
      // }
      console.log(carNumber);
      if(carNumber === '8333368')
      {
        return true;
      }
      else
      return false
    } catch (error) {
      console.error('Error searching car number:', error);
      throw new Error('An error occurred while searching the car number.');
    }
  };
  //submit a new note
  const submitNote = async (note: NoteToSend): Promise<void> => {
    // find the user by the car number provided in the note.
   // const response = await api.post(`/notes/addNote/${damagedUserId}`,note);
    // TODO: implement submit note to database
    console.log(note);
  };
  //submit a new report
  const submitReport = async (report: ReportToSend): Promise<void> => {
    // TODO: implement submit note to database
   // const response = await api.post(`/reports/addReport/${damagedUserId}`,note);
    console.log(report);
    console.log('submit report from context');
  };
  //try to login
  const loginAttempt = async (email: string, password: string, rememberMeValue: boolean): Promise<boolean> => {
    const loginData = {
      email,
      password,
    };
    const response = await api.post(`https://leave-a-note-nodejs-server.onrender.com/api/users/login`,loginData);
    console.log(response.status);
    const token = response.data.token
    if(!token)
    {
      setAuthenticated(false)
      return false;
    }
    setAuthenticated(true);
    updateRememberMe(rememberMeValue,token)
    return true;
  };
  const updateRememberMe = async (rememberMeValue: boolean,token: string): Promise<void> => {
    if(rememberMeValue)
    storeObject('connectedUser',token)
    else 
    AsyncStorage.removeItem('connectedUser');
  };
  const storeObject = async (key: string, value: string): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log('Object stored successfully');
    } catch (error) {
      console.log('Error storing object:', error);
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
  //Get all notes from database
  const getAllNotes = async(): Promise<Accident[]>=>{
    try {
      const response = await api.get(`/users/all/notes/${currentUser._id}`);
      const notes: Accident[] = response.data;
       return notes;

    } catch (error) {
      console.error('Error occurred during signup:', error);
      throw new Error('An error occurred during signup.');
    }
  };
  //Get all reports from database
  const getAllReports = async(): Promise<Accident[]>=>{
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
  const updateUserInformation = async(data: UserDataToUpdate): Promise<boolean>=>{
    try {
      const response = await api.post<UserDataToUpdate>(`/users/update/${currentUser._id}`,data);
      const updatedData = response.data;
      if(updatedData !== null) {
        setCurrentUser((prevUser: User)=>({
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
  const updateUserPassword = async(oldPassword: string, newPassword:string): Promise<number> =>{
    const data = {
      oldPassword,
      newPassword,
    }

    try {
      const response = await api.post<number>('/users/updatePassowrd',data);
      const result= response.data;
      return result;
    } catch (error) {
      console.error('Error occurred during signup:', error);
      throw new Error('An error occurred during signup.');
    }
  };
  const deleteANoteById = async(noteId: string):Promise<boolean> =>{
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
  const deleteAReportById = async(reportId: string):Promise<boolean> =>{
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
  const deleteFromUnreadMessages = async (id: string): Promise<boolean> =>{
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
  };


  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export default MainContextProvider;
