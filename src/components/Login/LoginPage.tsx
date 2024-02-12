import useAbstractMutator from '../../providers/AbstractMutator';
import UnprotectedPage from '../UnprotectedPage';
import CustomLayout from '../layout/CustomLayout';
import LoginForm from './LoginForm';
import UserApi from '../../api/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookies } from '../../utils';
import { Box } from '@chakra-ui/react';

const LoginPage = () => {
  const navigate = useNavigate();

  const { data: loginData, mutate: login } = useAbstractMutator(UserApi.login);

  useEffect(() => {
    if (loginData?.token) {
      setCookies('access_token', loginData?.token);
      navigate('/');
    }
  }, [loginData]);

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
