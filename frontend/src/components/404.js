import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundVideo from '../images/404.mp4';
import { useTranslation } from 'react-i18next';

const NotFound = ({ currentLanguage }) => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(10);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('myAppLanguage');
        if (storedLanguage && i18n.language !== storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }

        if (counter > 0) {
            const timer = setTimeout(() => {
                setCounter(counter - 1);
            }, 1150);
            return () => clearTimeout(timer);
        } else {
            navigate('/');
        }
    }, [counter, navigate, i18n, currentLanguage]);

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
                    {t('Your portal gun must be busted ...')}
                </p>
            </div>
            <div
                className="absolute bottom-20 mb-10 w-full 
                text-gray text-center font-nosifer text-2xl">
                {t('Your curious ass will be redirected in')}<br />
                {counter}
            </div>
        </div>
    );
};

export default NotFound;