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
    qaasRefetch({ type, showRemoved });
  }, [type, showRemoved]);

  useEffect(() => {
    if (createQaaData || removeQaaData || editQaaData) {
      qaasRefetch({ type, showRemoved });
    }
  }, [createQaaData, removeQaaData, editQaaData]);

  useEffect(() => {
    setLoading(getLatestQaasLoading);
  }, [getLatestQaasLoading]);

  return (
    <ProtectedPage>
      <CustomLayout>
        <Box paddingTop="20px">
          <CreateQaaForm createQaa={createQaa} />{' '}
          <QaaList
            qaas={qaasData}
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
