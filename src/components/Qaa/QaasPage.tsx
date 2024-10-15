import useAbstractProvider from '../../providers/AbstractProvider';
import QaaList from './QaaList'; // Updated import
import useAbstractMutator from '../../providers/AbstractMutator';
import { useEffect, useState } from 'react';
import CustomLayout from '../layout/CustomLayout';
import CreateQaaForm from './CreateQaaForm';
import { Box } from '@chakra-ui/react';
import ProtectedPage from '../ProtectedPage';
import QaasProvider from '../../providers/QaasProvider';
import { useFloatingLoader } from '../../providers/FloatingLoaderProvider';

const QaaPage = () => {
  const [showRemoved, setShowRemoved] = useState<string>('false');
  const [type, setType] = useState<string>();
  const [offset, setOffset] = useState(0);
  const [qaas, setQaas] = useState<any>([]);
  const limit = 10;
  console.log('offset: ', offset);

  const {
    qaasData,
    qaasRefetch,
    getLatestQaasLoading,
    createQaaData,
    createQaa,
    removeQaaData,
    removeQaa,
    editQaaData,
    editQaa,
  } = QaasProvider();
  const { setLoading } = useFloatingLoader();

  useEffect(() => {
    if(type && showRemoved) {
      qaasRefetch({ type, showRemoved, limit, offset });
      setQaas([]);
      setOffset(0);
    }
  }, [type, showRemoved]);

  useEffect(() => {
    if (qaasData) {
      setQaas((prevQaas: any) => [...prevQaas, ...qaasData]);
    }
    else {
      setQaas([])
    }
  }, [qaasData]);

  useEffect(() => {
    if (createQaaData || removeQaaData || editQaaData) {
      qaasRefetch({ type, showRemoved, limit, offset });
      setOffset((prevOffset) => prevOffset + limit);
    }
  }, [createQaaData, removeQaaData, editQaaData]);

  useEffect(() => {
    setLoading(getLatestQaasLoading);
  }, [getLatestQaasLoading]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      getLatestQaasLoading
    ) {
      return;
    }
    qaasRefetch({ type, showRemoved, limit, offset });
    setOffset((prevOffset) => prevOffset + limit);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getLatestQaasLoading]);

  return (
    <ProtectedPage>
      <CustomLayout>
        <Box paddingTop="20px">
          <CreateQaaForm createQaa={createQaa} />{' '}
          <QaaList
            qaas={qaas}
            removeQaa={removeQaa}
            type={type}
            setType={setType}
            showRemoved={showRemoved}
            setShowRemoved={setShowRemoved}
            editQaa={editQaa}
          ></QaaList>
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default QaaPage; // Updated component name
