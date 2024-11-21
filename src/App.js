import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './utils/scrollToTop.js';
import { GlobalStateProvider } from './hooks/GlobalStateContext.js';
import Navbar from './components/Navbar.js';
import UserDisplayer from './components/Navstrip.js';
import About from './pages/About.js';
import Archives from './pages/Archives.js';
import GlobalLeaderboard from './pages/Global.js';
import LoginForm from './pages/Login.js';
import Register from './pages/Register.js';
import Problems from './components/Problems.js';
import News from './pages/News.js';
import Footer from './components/Footer.js';
import UserGuide from './pages/UserGuide.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
import TermsOfServices from './pages/TermsOfServices.js';


function App() {
    return (
        <Router>
            <GlobalStateProvider>
                <div className="app-container">
                    <div className="main-content">
                        <UserDisplayer />
                        <Navbar />
                        <ScrollToTop />
                        <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<About />} />
                            <Route path="/archives" element={<Archives />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/global" element={<GlobalLeaderboard />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/problems/:problemId" element={<Problems />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/user-guide" element={<UserGuide />} />
                            <Route path="/terms-of-services" element={<TermsOfServices />} />
                        </Routes>
                        </Suspense>
                    </div>
                    <div className="footerClass">
                        <Footer />
                    </div>
                </div>
            </GlobalStateProvider>
        </Router>
    );
};

export default App;
