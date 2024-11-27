// GlobalContext.js
import React, { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import BlockingLoader from '../components/BlockingLoader';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const value = {
    loading,
    setLoading,
    loadingMessage,
    setLoadingMessage,
    progress,
    setProgress,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
      {createPortal(
        <BlockingLoader loading={loading} message={loadingMessage} progress={progress} />,
        document.getElementById('loader-root')
      )
      }
    </GlobalContext.Provider>
  );
};
