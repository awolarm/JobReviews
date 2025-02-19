import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'; 
import SignupPage from './pages/SignupPage';

const App = () => {
    return (
        <Box minH={"100wh"}>
            <Routes>
                <Route path="/" element={<HomePage/>}/> 
                <Route path="/login" element={<LoginPage/>}/> 
                <Route path="/signup" element={<SignupPage/>}/> 
            </Routes>
        </Box>
    );
}

export default App; 