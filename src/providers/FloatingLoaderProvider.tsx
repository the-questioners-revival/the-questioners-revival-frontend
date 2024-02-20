import { createContext, useState, useContext } from 'react';

const FloatingLoaderContext = createContext<any>(null);

export const FloatingLoaderProvider = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <FloatingLoaderContext.Provider value={{ loading, setLoading }}>
      {props.children}
    </FloatingLoaderContext.Provider>
  );
};

export const useFloatingLoader = () => useContext(FloatingLoaderContext);
