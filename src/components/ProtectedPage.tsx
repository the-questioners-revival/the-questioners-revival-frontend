// import Router, { useRouter } from "next/router";
import UserApi from '../api/user';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAbstractProvider from '../providers/AbstractProvider';

function ProtectedPage(props: any) {
  const navigate = useNavigate();
  const { data: currentlyLoggedInUser, status } = useAbstractProvider(
    UserApi.getCurrentlyLoggedInUser,
  );

  useEffect(() => {
    if (currentlyLoggedInUser) {
      navigate('/');
    }
 
  }, [currentlyLoggedInUser]);

  useEffect(() => {
    if (status === 401) {
      navigate('/login');
    }
  }, [status]);

  // if (!store.currentUser.email) {
  //   return <CircularProgress />
  // }
  return props.children;
}

export default ProtectedPage;
