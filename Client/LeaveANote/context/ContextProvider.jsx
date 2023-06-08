import React, {createContext, useState} from 'react';

export const MainContext = createContext();

export default function MainContextProvider({ children }){
    const [authenticated, setAuthenticated] = useState(true); // is user authenticated
    const [rememberMe, setRememberMe] = useState(true); // rememberMe state
    const [test, setTest] = useState("from context"); // rememberMe state
    const loggedUser = {
      fullname: 'test name',
      email: 'testemail@gmail.com',
      phoneNumber: '0533406789',
      carNum: '8333368'
    };
    const value = {
      loggedUser, authenticated, setAuthenticated,rememberMe, setRememberMe, test, setTest
      };
      return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}


