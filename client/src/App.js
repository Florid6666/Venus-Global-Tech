import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HomeV2 from './pages/homev2/HomeV2';
import About from './pages/About';
import AgenticAI from './pages/AgenticAI';
import ESG from './pages/ESG';
import DigitalReach from './pages/DigitalReach';
import SoftwareDataAI from './pages/SoftwareDataAI';
import CloudService from './pages/CloudService';
import IATFAuditing from './pages/IATFAuditing';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Admin from './pages/Admin';
import Investment from './pages/Investment';
import './App.css';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayLocation(location);
      setTransitionStage('fadeIn');
    }
  };

  return (
    <div
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={handleAnimationEnd}
      key={displayLocation.pathname}
    >
      <Routes location={displayLocation}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Home />} />
        <Route path="/v2" element={<HomeV2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/agentic-ai" element={<AgenticAI />} />
        <Route path="/esg" element={<ESG />} />
        <Route path="/digital-reach" element={<DigitalReach />} />
        <Route path="/software-data-ai" element={<SoftwareDataAI />} />
        <Route path="/cloud-service" element={<CloudService />} />
        <Route path="/iatf-auditing" element={<IATFAuditing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/investment" element={<Investment />} />
      </Routes>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin' || location.pathname.startsWith('/admin');

  console.log('Current path:', location.pathname, 'isAdmin:', isAdmin);

  return (
    <div className="App">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <AnimatedRoutes />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
