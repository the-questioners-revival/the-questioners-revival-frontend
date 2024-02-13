import React, { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

function UnProtectedPage(props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div />;
  }
  return props.children;
}

export default UnProtectedPage;
