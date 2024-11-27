import { BrowserRouter as Router } from 'react-router-dom';
// import Footer from './components/Footer'
import Header from './components/Header'
import AppRouter from './AppRouter'
import { motion } from 'framer-motion'
import 'react-tooltip/dist/react-tooltip.css'
export default function App() {
  return (
    <Router>
      <div className="min-h-screen min-w-screen flex flex-col bg-white">
        <Header />
        <main className='flex-grow overflow-y-auto'>
          <motion.div
            initial={{ x: 100, opacity: 0 }} // Slide in from right
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60, delay: 0.5 }}
          >
            <AppRouter />
          </motion.div>
        </main>

        {/* <motion.div
          initial={{ y: 50, opacity: 0 }} // Slide in from bottom
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80, delay: 0.5 }}
        >
          <Footer />
        </motion.div> */}
      </div>
    </Router>
  )
}
