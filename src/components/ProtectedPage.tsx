import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

function ProtectedPage(props: any) {
  const navigate = useNavigate();
  const { user } = useUser();
  const match = useMatch('*');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return props.children;
}

export default ProtectedPage;
