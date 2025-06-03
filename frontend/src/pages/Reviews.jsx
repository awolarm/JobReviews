import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { Heading, Icon, Flex } from '@chakra-ui/react'
import { FaBuilding } from "react-icons/fa";

const Reviews = () => {
    const { companyName } = useParams();
    const decodedCompanyName = decodeURIComponent(companyName);

    const [reviews, setReviews] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchReviews = async () => {
            try{
                const response = await fetch(`/api/auth/reviews/${encodeURIComponent(decodedCompanyName)}`);
                const data = await response.json(); 
                
                console.log("Response data: ", data);

                if(data.success) {
                    setReviews(data.reviews);
                }else{
                    setError(data.message);
                }
            }catch(err){
                setError('Failed to fetch reviews');
                console.log('Fetch error', err);
            }finally{
                setLoading(false)
            }
        };

        fetchReviews(); 
    },[decodedCompanyName]);

    if (loading) return <div>Loading reviews...</div>;
    if (error) return <div>Error: {error}</div>; 

    return(
        <div>
            <Flex align="center" gap={3} mb={4}>
                <Icon as={FaBuilding} boxSize='20' color="orange.500" />
                <Heading as='h2' size='4xl'>
                    Company Reviews
                </Heading>
            </Flex>
            <Heading as='h2' size="lg">Read what employees are saying about working at these companies</Heading>

            <h1>{companyName} Reviews</h1>
            <p>Total Reviews: {reviews.length}</p>
            {reviews.length === 0 ? (
                <p>No reviews found for this company.</p>
            ) : (
                <div>
                    {reviews.map((review) => (

                        <div key={review.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '15px' }}>
                            <h3>{review.title}</h3>
                            <p>{review.description}</p>
                            <p>Company: {review.company}</p>
                            <p>Location: {review.location}</p>
                            <p>Role: {review.role} </p>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default Reviews; 