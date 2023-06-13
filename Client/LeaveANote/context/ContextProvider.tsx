/* eslint-disable prettier/prettier */
import React, { createContext, useState,FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface User {
  fullname: string;
  email: string;
  phoneNumber: string;
  carNum: string;
  unreadMessages: Array<Message | ReportInbox >; 
}
interface ReportInbox {
  id: string;
  hittingDriver:{
    name: string;
    carNumber: string;
    phoneNumber: string;
  },
  reporter:{
    name: string;
    phoneNumber: string;
  },
  date: string;
  type: string;
  isAnonymous:boolean,
  isIdentify:boolean,
  imageSource: string;
}
interface Report {
  imageUrl: string;
  damagedCarNumber:string;
  hittingCarNumber: string;
  date:string;
  isAnonymous: boolean;
}
interface Note {
  damagedCarNumber: string;
  imageSource: string;
  date: string;
}
interface SignUpFormValues {
  email: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;
  carNumber: string;
  fullName: string;
}
interface Message {
  id: string;
  hittingDriver:{
    name?: string;
    carNumber: string;
    phoneNumber?: string;
  },
  date: string;
  type: string;
  imageSource: string;
}
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
  submitNote: (note: Note) => Promise<void>;
  submitReport: (report: Report) => Promise<void>;
  uploadImageToCloudinary: (imageSource: string) => Promise<string>;
  searchCarNumber: (carNumber: string) => Promise<boolean>;
  loginAttempt: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signupAttempt: (newUser: SignUpFormValues) => Promise<number>;
  handleLogOut: () => Promise<void>;
}
export const MainContext = createContext<MainContextType>({} as MainContextType);

const MainContextProvider: FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [carNumInput, setCarNumInput] = useState<string>('');
  const [damagedUserId, setDamagedUserId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>( {
    fullname: 'test name',
    email: 'testemail@gmail.com',
    phoneNumber: '0533406789',
    carNum: '8333368',
    unreadMessages: [
    {
      id: '1',
      hittingDriver:{
        name:'Koren Kaplan',
        carNumber:'8333368',
        phoneNumber:'0533406789',
      },
      date: '02/12/2023',
      type: 'note',
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-3.jpg'
    },
    {
      id: '2',
      hittingDriver:{
        name:'Ofri Malka',
        carNumber:'69354401',
        phoneNumber:'0528942612',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '04/12/2023',
      type: 'report',
      isAnonymous:true,
      isIdentify:true,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467046/cld-sample-4.jpg'
    },
    {
      id: '3',
      hittingDriver:{
        carNumber:'8333368',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '03/12/2023',
      type: 'report',
      isAnonymous:false,
      isIdentify:false,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-2.jpg'
    },
    {
      id: '4',
      hittingDriver:{
        name:'Ofri Malka',
        carNumber:'69354401',
        phoneNumber:'0528942612',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '04/12/2023',
      type: 'report',
      isAnonymous:false,
      isIdentify:true,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467044/cld-sample.jpg'
    },
    {
      id: '5',
      hittingDriver:{
        carNumber:'8333368',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '03/12/2023',
      type: 'report',
      isAnonymous:true,
      isIdentify:false,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467034/samples/landscapes/nature-mountains.jpg'
    },
  ],
  });

  const handleLogOut = async ():Promise<void> => {
    await AsyncStorage.removeItem('connectedUser');
    setAuthenticated(false);
  }
  //search a user's car number
  const searchCarNumber = async (carNumber: string): Promise<boolean> => {
    // Todo: check car number in the database
    let userIdFromDb: string | undefined = 'user-id'; // send request to database get back the id of the user if found
    if (userIdFromDb) {
      setDamagedUserId(userIdFromDb);
      return true;
    }
    else
    return false;
  };
  //submit a new note 
  const submitNote = async (note: Note): Promise<void> => {
    // find the user by the car number provided in the note.
    // create a new note with the following schema: hittingDriver == logged user
    // date: string;
    // hittingDriver: {
    //   name: string;
    //   carNumber: string;
    //   phoneNumber: string;
    // };
    // type: string;
    // imageSource: string;

    // TODO: implement submit note to database
    console.log(note);
  };
  //submit a new report
  const submitReport = async (report: Report): Promise<void> => {
    // TODO: implement submit note to database
    console.log(report);
    console.log('submit report from context');
  };
  //try to login
  const loginAttempt = async (email: string, password: string,rememberMeValue: boolean): Promise<void> => {
    //set the connect user in the async storage with a token
    console.log(email, password, rememberMeValue);
    
    if(email === 'k@gmail.com' && password === '123456') 
    {
      setAuthenticated(true);
      if(rememberMeValue)
      {
        //set the user token to the async storage
        await storeObject('connectedUser',{email,password});
      }
      return;
    }
    setAuthenticated(false);

  };
  const storeObject = async (key: string, value: object): Promise<void> => {
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
  //check if one of the following is already registered: phone number, email,car number
  //return: 0 -> success,1 -> phone number already in use, 2 -> email already in use, 3 -> car number already in use.
  console.log(newUser);
  return 0;
 };
 //upload the image to cloudinary and get back the url
 const uploadImageToCloudinary = async (imageSource: string): Promise<string> =>{
  console.log(imageSource);
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
    uploadImageToCloudinary,
    handleLogOut,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
