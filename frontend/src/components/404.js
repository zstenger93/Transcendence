import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundVideo from '../images/404.mp4';

const NotFound = () => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        if (counter > -1) {
            const timer = setTimeout(() => {
                setCounter(counter - 1);
            }, 1200);
            return () => clearTimeout(timer);
        } else {
            navigate('/');
        }
    }, [counter, navigate]);

    return (
        <div className="h-screen w-full">
            <video autoPlay loop muted
                className="absolute z-0 w-full h-full object-cover">
                <source src={NotFoundVideo} type="video/mp4" />
            </video>
            <div className="text-center pt-32 relative z-10">
                <h1 className="text-6xl text-gray font-semibold font-nosifer">
                    404 !@#$
                </h1>
                <p className="text-xl text-gray mt-4 font-nosifer">
                    Your portal gun must be busted ...
                </p>
            </div>
            <div
                className="absolute bottom-20 mb-10 w-full 
                text-gray text-center font-nosifer text-2xl">
                Your curious ass will be redirected in<br />
                {counter}
            </div>
        </div>
    );
};

export default NotFound;