import UnprotectedPage from '../UnprotectedPage';
import CustomLayout from '../layout/CustomLayout';
import LoginForm from './LoginForm';
import { Box } from '@chakra-ui/react';
import { useUser } from '../../providers/UserProvider';
import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, loginLoading } = useUser();

  return (
    <UnprotectedPage>
      <CustomLayout>
        <Box paddingTop="20px">
          <LoginForm login={login} loginLoading={loginLoading} />
        </Box>
      </CustomLayout>
    </UnprotectedPage>
  );
};

export default LoginPage;
