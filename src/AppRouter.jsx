import { Routes, Route } from 'react-router-dom'; // Use Routes in React Router v6
import Home from './components/Home';
import FrailtyTest from './pages/FrailtyTest';
import About from './pages/About';
import CompareTests from './pages/CompareTests';
import Privacy from './pages/Privacy';
import Error404 from './pages/Error404';
import UnderstandingFrailtyVision from './pages/UnderstandingFrailtyVision';
import MLScoring from './pages/MLScoring';
import Dashboard from './components/Dashboard/Dashboard';
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/frailty-test" element={<FrailtyTest />} />
      <Route path="/track-progress" element={<CompareTests />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/understanding-frailty-vision" element={<UnderstandingFrailtyVision />} />
      <Route path="/ml-scoring" element={<MLScoring />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* This is the 404 route */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
