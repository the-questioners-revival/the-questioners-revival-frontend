import UnprotectedPage from '../UnprotectedPage';
import CustomLayout from '../layout/CustomLayout';
import LoginForm from './LoginForm';
import { Box } from '@chakra-ui/react';
import { useUser } from '../../providers/UserProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const { user, login } = useUser();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <UnprotectedPage>
      <CustomLayout>
        <Box paddingTop="20px">
          <LoginForm login={login} />
        </Box>
      </CustomLayout>
    </UnprotectedPage>
  );
};

export default LoginPage;
