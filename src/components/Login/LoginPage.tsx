import useAbstractMutator from '../../providers/AbstractMutator';
import UnprotectedPage from '../UnprotectedPage';
import CustomLayout from '../layout/CustomLayout';
import LoginForm from './LoginForm';
import UserApi from '../../api/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookies } from '../../utils';

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
        <LoginForm login={login} />
      </CustomLayout>
    </UnprotectedPage>
  );
};

export default LoginPage;
