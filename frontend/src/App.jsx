import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'; 

const App = () => {
    return (
        <Box minH={"100wh"}>
            <Routes>
                <Route path="/" element={<HomePage/>}/> 
                <Route path="/login" element={<LoginPage/>}/> 
            </Routes>
        </Box>
    );
}

export default App; 