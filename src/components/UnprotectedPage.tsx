import React, { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useAbstractProvider from '../providers/AbstractProvider';
// import { observer } from 'mobx-react-lite'
import UserApi from '../api/user'

function UnProtectedPage(props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { data: currentUser, status } = useAbstractProvider(
    UserApi.getCurrentlyLoggedInUser,
  )

  useEffect(() => {
    if (currentUser?.email) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return <div />;
  }
  return props.children;
}

export default UnProtectedPage;
