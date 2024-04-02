import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import { ClipLoader } from 'react-spinners';

function Scanqr() {
    let { qrId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a request to the API endpoint
                const response = await axios.post('https://angelsqr-3.onrender.com/qrcodes/scanQr', { qrId });
                // Handle the response data accordingly
                if (response.data) {
                    // If there is data in the response, redirect based on the response
                    if (response.data) {
                        navigate(response.data)
                    } else {
                        // Handle other cases here
                    }
                }
            } catch (error) {
                // Handle errors
                setError(error.message);
            } finally {
                // Update loading state
                setIsLoading(false);
            }
        };

        fetchData();
    }, [qrId]); // Include qrId in dependency array to fetch data when it changes

    if (isLoading) {
        return <div><ClipLoader color='#36D7B7' loading={isLoading} size={35} /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            {isLoading && <h1 className='w-screen h-screen flex justify-center items-center'><ClipLoader color='#36D7B7' loading={isLoading} size={35} /></h1>}
            {error !== null && <h1 className='w-screen h-screen flex justify-center items-center'>{error}</h1>}
        </div>
    );
}

export default Scanqr;

