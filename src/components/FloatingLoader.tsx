import { CircularProgress } from '@chakra-ui/react';
import { useFloatingLoader } from '../providers/FloatingLoaderProvider';

const FloatingLoader = () => {
  const { loading } = useFloatingLoader();
  if (!loading) return null;
  
  return (
    <CircularProgress
      isIndeterminate
      color="green"
      aria-label="Add"
      position="fixed"
      bottom="4"
      right="4"
      borderRadius="50%"
      boxShadow="lg"
    />
  );
};

export default FloatingLoader;
