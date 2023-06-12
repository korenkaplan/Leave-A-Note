import React, {createContext, useState} from 'react';

export const MainContext = createContext();

export default function MainContextProvider({children}) {
  const [authenticated, setAuthenticated] = useState(true); // is user authenticated
  const [rememberMe, setRememberMe] = useState(true); // rememberMe state
  const [test, setTest] = useState('from context'); // rememberMe state
  const [carNumInput, setCarNumInput] = useState('');
  const [imageUrl, setImageUrl] = useState('function');
  const loggedUser = {
    fullname: 'test name',
    email: 'testemail@gmail.com',
    phoneNumber: '0533406789',
    carNum: '8333368',
  };
  const searchCarNumber = carNumber => {
    //Todo: check car number in the database
  };
  const submitNote = imageUrl => {
    //TODO implement submit note to database
    console.log('submit note from context');
  };
  const submitReport = report => {
    //TODO implement submit note to database
    console.log('submit report from context');
  };
  const value = {
    loggedUser,
    authenticated,
    setAuthenticated,
    rememberMe,
    setRememberMe,
    test,
    setTest,
    carNumInput,
    setCarNumInput,
    submitNote,
    submitReport,
    searchCarNumber,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}
