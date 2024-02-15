import UnprotectedPage from '../UnprotectedPage';
import CustomLayout from '../layout/CustomLayout';
import LoginForm from './LoginForm';
import { Box } from '@chakra-ui/react';
import { useUser } from '../../providers/UserProvider';
import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useUser();


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
