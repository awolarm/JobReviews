import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';

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
                            <small>Posted: {new Date(review.createdAt).toLocaleDateString()}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default Reviews; 