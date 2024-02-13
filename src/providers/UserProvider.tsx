import React, { createContext, useState, useContext, useEffect } from 'react';
import useAbstractMutator from './AbstractMutator';
import UserApi from '../api/user';
import { removeCookies, setCookies } from '../utils';
import useAbstractProvider from './AbstractProvider';

const UserContext = createContext<any>(null);

export const UserProvider = (props: any) => {
  const { data: loginData, mutate: login } = useAbstractMutator(UserApi.login);
  const {
    data: getCurrentlyLoggedInUserData,
    refetch: getCurrentlyLoggedInUser,
  } = useAbstractProvider(UserApi.getCurrentlyLoggedInUser, null);
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    removeCookies('access_token');
  };

  useEffect(() => {
    if (loginData?.token) {
      setCookies('access_token', loginData?.token);
      getCurrentlyLoggedInUser();
    }
  }, [loginData]);

  useEffect(() => {
    if (getCurrentlyLoggedInUserData) {
      setUser(getCurrentlyLoggedInUserData);
    }
  }, [getCurrentlyLoggedInUserData]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
