import { useEffect, useState, useCallback, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import QaaList from './QaaList';
import CustomLayout from '../layout/CustomLayout';
import CreateQaaForm from './CreateQaaForm';
import ProtectedPage from '../ProtectedPage';
import QaasProvider from '../../providers/QaasProvider';
import { useFloatingLoader } from '../../providers/FloatingLoaderProvider';

const QaaPage = () => {
  const [showRemoved, setShowRemoved] = useState('false');
  const [type, setType] = useState<string>();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState<any>('');

  const [qaas, setQaas] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for scroll timeout

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
  const { setLoading: setGlobalLoading } = useFloatingLoader();

  // Function to refetch Qaa data with current parameters
  const fetchQaas = useCallback(
    (reset: boolean = false) => {
      console.log('offset: ', offset);
      if (!loading) {
        setLoading(true);
        qaasRefetch({ type, showRemoved, limit, offset: reset ? 0 : offset });
        setOffset(reset ? parseInt(limit, 10) : parseInt(limit, 10) + offset);
      }
    },
    [type, showRemoved, limit, offset, qaasRefetch, loading],
  );

  useEffect(() => {
    fetchQaas(true);
    setQaas([]);
  }, [type, showRemoved, limit]);

  useEffect(() => {
    if (qaasData) {
      setQaas((prevQaas: any) => [...prevQaas, ...qaasData]);
      setLoading(false);
    }
  }, [qaasData]);

  useEffect(() => {
    if (createQaaData || removeQaaData || editQaaData) {
      fetchQaas(true);
      setQaas([]);
    }
  }, [createQaaData, removeQaaData, editQaaData]);

  useEffect(() => {
    setGlobalLoading(getLatestQaasLoading);
  }, [getLatestQaasLoading, setGlobalLoading]);

  const handleScroll = useCallback(() => {
    if (limit === '') return;
    if (qaas.length === 0 || loading) return;

    const isBottomOfPage =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 50;

    if (isBottomOfPage) {
      setOffset((prevOffset) => prevOffset + parseInt(limit, 10));
      fetchQaas();
    }
  }, [qaas.length, fetchQaas, limit, loading]);

  useEffect(() => {
    const debouncedScrollHandler = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(handleScroll, 200);
    };

    window.addEventListener('scroll', debouncedScrollHandler);
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  }, [handleScroll]);

  return (
    <ProtectedPage>
      <CustomLayout>
        <Box paddingTop="20px">
          <CreateQaaForm createQaa={createQaa} />
          <QaaList
            qaas={qaas}
            removeQaa={removeQaa}
            type={type}
            setType={setType}
            showRemoved={showRemoved}
            setShowRemoved={setShowRemoved}
            editQaa={editQaa}
            limit={limit}
            setLimit={setLimit}
          />
        </Box>
      </CustomLayout>
    </ProtectedPage>
  );
};

export default QaaPage;
