import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

function ProtectedPage(props: any) {
  const navigate = useNavigate();
  const { user, getUserStatus } = useUser();

  useEffect(() => {
    console.log("getUserLoading, user: ", getUserStatus, user)
    if(getUserStatus === null ) {
      return
    }
      console.log("what")
    if (getUserStatus !== 200) {
      navigate('/login');
    }
  }, [user, getUserStatus]);

  return props.children;
}

export default ProtectedPage;
