import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const navigate = useNavigate(); // Move this to the top level
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        
        // if (!token) {
        //     localStorage.setItem('intendedRoute', '/review');
        //     navigate('/login');
        //     console.log('No token found, redirecting to login');
        //     return;
        // } - idk if this is needed
        
        setIsLoading(false);
    }, [navigate]); // Add navigate as dependency
    
    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    
    return (
        <div>
            <h1>Review Page</h1>
            <p>This is where users can write reviews about companies.</p>
        </div>
    );
}

export default Review;