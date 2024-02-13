import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

function ProtectedPage(props: any) {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [user]);

  return props.children;
}

export default ProtectedPage;
