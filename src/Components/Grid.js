import React, { useState, useEffect } from 'react';
import '../App.css';  // Custom styles
import { fetchImages } from '../Services/Request';  // API service

const GridComponent = () => {
    const [data, setData] = useState([]);   // Store fetched data
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state

    const fetchData = async () => {
        setLoading(true);  // Start loading
        setError(null);  // Reset error state
        try {
            const { data } = await fetchImages();  // Fetch all images (adjust API as needed)
            if (data.length === 0) {
                setData([]);  // Set empty data if none is returned
            } else {
                setData(data);  // Set fetched data
            }
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);  // Stop loading when done
        }
    };

    if (error) {
        return <div className="flex justify-center items-center min-h-center">
            <br></br>
            <h3 className='center'>Error : {error}</h3>
        </div>;
    }

    if (!loading) {
        <div className="flex justify-center items-center min-h-center">
            <br></br>
            <h3 className='center'> No data available. </h3>

        </div>
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-center center items-center mb-4">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={fetchData}
                    disabled={loading}  // Disable button while loading
                >
                    {loading ? 'Loading...' : 'Load Kitty Media'}
                </button>
            </div>
            {!loading && !error && data.length > 0 && (
                <div>
                    <h2 className='center'>Grid</h2>
                    <ul style={{ display: 'flex', justifyContent:'center', flexWrap: 'wrap', listStyleType: 'none' }}>
                        {Array.isArray(data) &&
                            data.map((image, index) => (
                                <li className='card' key={index} style={{ margin: '70px' }}>
                                    <img className='image-border card-image' src={image.url} alt={'Image'} style={{ width: '210px', height: '200px' }} />
                                </li>
                            ))}

                    </ul>
                </div>
            )}
        </div>
    );
};

export default GridComponent;
