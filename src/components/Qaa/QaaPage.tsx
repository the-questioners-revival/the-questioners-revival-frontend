import useAbstractProvider from '../../providers/AbstractProvider';
import QaaList from './QaaList'; // Updated import
import useAbstractMutator from '../../providers/AbstractMutator';
import { useEffect, useState } from 'react';
import CustomLayout from '../layout/Layout';
import CreateQaaForm from './CreateQaaForm';
import QaaApi from '../../api/qaa';
import { Box } from '@chakra-ui/react';

const QaaPage = () => {
  const [showRemoved, setShowRemoved] = useState<string>('false');
  const [type, setType] = useState<string>();
  // Updated component name
  const { data, refetch }: { data: any; refetch: Function } =
    useAbstractProvider(QaaApi.getLatestQaas); // Updated provider function

  const {
    data: createQaaData,
    mutate: createQaa,
  }: { data: any; mutate: Function } = useAbstractMutator(QaaApi.createQaa); // Updated provider function

  const {
    data: removeQaaData,
    mutate: removeQaa,
  }: { data: any; mutate: Function } = useAbstractMutator(QaaApi.removeQaa); // Updated provider function

  useEffect(() => {
    refetch({ type, showRemoved });
  }, [type, showRemoved]);

  useEffect(() => {
    if (createQaaData || removeQaaData) {
      refetch();
    }
  }, [createQaaData, removeQaaData]);

  return (
    <CustomLayout>
      <Box paddingTop="20px">
        <CreateQaaForm createQaa={createQaa} /> {/* Updated component name */}
        <QaaList // Updated component name
          qaas={data} // Updated variable name
          removeQaa={removeQaa} // Updated function name
          type={type}
          setType={setType}
          showRemoved={showRemoved}
          setShowRemoved={setShowRemoved}
        ></QaaList>
      </Box>
    </CustomLayout>
  );
};

export default QaaPage; // Updated component name
