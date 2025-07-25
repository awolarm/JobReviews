import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { Heading, Icon, Flex, Box, SimpleGrid, HStack, Text } from '@chakra-ui/react'
import { FaBuilding } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";

const API_CONFIG = {
    //BASE_URL: 'http://localhost:5000', // Change this to your backend URL if needed
    BASE_URL: 'https://job-reviews-five.vercel.app', // Use this
    REVIEWS_ENDPOINT: '/api/auth/reviews' 
}

const Reviews = () => {
    const { companyName } = useParams();
    const decodedCompanyName = decodeURIComponent(companyName);

    const [reviews, setReviews] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
    const fetchReviews = async () => {
        try {
            // Start the process
            const startResponse = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.REVIEWS_ENDPOINT}/${encodeURIComponent(decodedCompanyName)}`);
            const startData = await startResponse.json();
            
            if (!startData.success) {
                setError(startData.message);
                setLoading(false);
                return;
            }

            // Poll for results
            const pollForResults = async () => {
                try {
                    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.REVIEWS_ENDPOINT}/${encodeURIComponent(decodedCompanyName)}/status`);
                    const data = await response.json();
                    
                    if (data.success && data.ready) {
                        setReviews(data.reviews);
                        setLoading(false);
                    } else {
                        // Not ready yet, poll again in 3 seconds
                        setTimeout(pollForResults, 3000);
                    }
                } catch (err) {
                    setError('Error fetching reviews');
                    setLoading(false);
                }
            };

            pollForResults();
            
        } catch (err) {
            setError('Failed to start processing');
            setLoading(false);
        }
    };

    fetchReviews();
    }, [decodedCompanyName]);

    if (loading) return <div>Loading reviews...</div>;
    if (error) return <div>Error: {error}</div>; 

    return(
        <Box px={12} py={5}>
            <Flex align="center" gap={3} mb={4}>
                <Icon as={FaBuilding} boxSize='20' color="orange.500" />
                <Heading as='h2' size='4xl'>
                    {decodedCompanyName.charAt(0).toUpperCase() + decodedCompanyName.slice(1)} Reviews
                </Heading>
            </Flex>
            <Heading as='h2' size="xl">Read what employees are saying about working at {decodedCompanyName.charAt(0).toUpperCase() + decodedCompanyName.slice(1)}.</Heading>

            
            <Text fontWeight='bold' fontSize='2xl'>Total Reviews: {reviews.length}</Text>

            {reviews.length === 0 ? (
                <p>No reviews found for this company.</p>
            ) : (
                <SimpleGrid columns={3} spacing={20} mt={4}>
                    {reviews.map((review, index) => (
                        <Box key={index} w='100%' h='600px' border='1px solid #ccc' p={4} borderRadius='md'>
                            <HStack>
                                <Icon as={CiCalendar} boxSize='60px' />
                                <Text fontSize='3xl'>{review.date}</Text>
                            </HStack>
                            <Text fontWeight = 'bold' fontSize='4xl'>{review.title}</Text>
                            <HStack>
                                <Icon as={FaLocationDot} boxSize='25px' />
                                <Text fontWeight='bold' fontSize='2xl'>{review.location}</Text>
                                <Text fontWeight='bold' fontSize='2xl'>{review.role}</Text>
                            </HStack>
                            <Text fontSize='3xl'>{review.description}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
}

export default Reviews;