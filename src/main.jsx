import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GlobalProvider } from './context/GlobalContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RootComponent() {
  const [toastPosition, setToastPosition] = useState('bottom-right');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setToastPosition('top-center'); // For mobile
      } else {
        setToastPosition('bottom-right'); // For larger screens
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // <StrictMode>
      <GlobalProvider>
        <ToastContainer
          position={toastPosition}
          autoClose={3000}
          pauseOnHover={false}
        />
        <App />
      </GlobalProvider>
    // </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<RootComponent />);
