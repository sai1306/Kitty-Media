import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchImages } from '../Services/Request';

const InfiniteScroll = () => {
    const [data, setData] = useState([]);   // Store fetched data
    const [page, setPage] = useState(1);    // Track current page
    const [loading, setLoading] = useState(false);  // Loading state
    const [hasMore, setHasMore] = useState(true);   // Flag to check if more data is available
    const [error, setError] = useState(null);

    // Fetch data when the component mounts or page changes
    useEffect(() => {
        fetchMoreData();
    });

    // Function to fetch data from the API
    const fetchMoreData = async () => {
        if (!hasMore) return;  // If no more data, stop fetching

        setLoading(true);
        try {
            const { data, total } = await fetchImages(6, page);

            setData((prevData) => [...prevData, ...data]);
            if (total < 6) {
                setHasMore(false);
            }
        }
        catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);  // Stop loading when done
        }
    }
    // Scroll event handler
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    if (error) {
        return <div className="flex justify-center items-center min-h-center">
            <br></br>
            <h3 className='center'>Error : {error}</h3>
        </div>;
    }

    // Show loading state until images are fetched
    if (!data.length) {
        return <div className="flex justify-center items-center min-h-center">
            <br></br>
            <h3 className='center'>Loading...</h3>
        </div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div>
                <h2 className='center'>Infinite Scroll</h2>
                <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyleType: 'none' }}>
                    {Array.isArray(data) &&
                        data.map((image, index) => (
                            <li className='card' key={index} style={{ margin: '70px' }}>
                                <img className='image-border card-image' src={image.url} alt={'Image'} style={{ width: '210px', height: '200px' }} />
                            </li>
                        ))}

                </ul>
            </div>
            {loading &&
                <div className="flex justify-center items-center min-h-center">
                    <h3 className='center'>Loading...</h3>
                </div>
            }
            {!hasMore && <div className="text-center mt-4">No more data to load.</div>}
        </div>
    );
};
export default InfiniteScroll;
