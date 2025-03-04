import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn';
import PageTitle from './components/PageTitle';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';

function App() {
    return (
        <Router>
            <PageTitle />
            <NavBar />
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/auth" element={<LogIn />} /> {/* Joint LogIn/SignUp tab */}
            </Routes>
        </Router>
    );
}

export default App;