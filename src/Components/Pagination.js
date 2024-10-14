import React, { useState, useEffect, useMemo } from 'react';
import { fetchImages } from '../Services/Request';

const Pagination = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);  // Loading state

    const [error, setError] = useState(null);

    const memoizedFetchImages = useMemo(() => fetchImages, []);

    const imagesPerPage = 12;

    // Fetch images whenever currentPage changes
    useEffect(() => {
        const getImages = async () => {
            setImages([]);
            try {
                const { data } = await memoizedFetchImages(imagesPerPage, currentPage);
                // Accumulate images
                setImages([...data]); // Keep adding images to the array
            }
            catch (err) {
                setError('Failed to fetch data. Please try again.');
            } finally {
                setLoading(false);  // Stop loading when done
            }
        }

        getImages();
    }, [currentPage, memoizedFetchImages]);


    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    if (error) {
        return<div className="flex justify-center items-center min-h-center">
        <br></br>
        <h3 className='center'>Error : {error   }</h3>
    </div>;
    }

    // Show loading state until images are fetched
    if (!images.length) {
        return <div className="flex justify-center items-center min-h-center">
            <br></br>
            <h3 className='center'>Loading...</h3>
        </div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className='center'>Pagination</h2>
            <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'center',  listStyleType: 'none' }}>
                {Array.isArray(images) &&
                    images.map((image, index) => (
                        <li className='card' key={index} style={{ margin: '70px' }}>
                            <img className='image-border card-image' src={image.url} alt={'Image'} style={{ width: '210px', height: '200px' }} />
                        </li>
                    ))}

            </ul>
            <div className='flex justify-center items-center center'>
                {currentPage > 1 && (
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="btn btn-danger btn-lg"
                    >
                        Previous
                    </button>
                )}
                &nbsp; &nbsp;
                <button
                    onClick={handleNextPage}
                    className="btn btn-success btn-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
