'use client'
import { createContext, useContext, useEffect, useState } from 'react';

const LoadingFeedbackContext = createContext();

export const LoadingFeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFeedback(null);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [feedback]);

    return (
        <LoadingFeedbackContext.Provider value={{ isLoading, setIsLoading, feedback, setFeedback }}>
            {children}
        </LoadingFeedbackContext.Provider>
    );
};

export const useLoadingFeedback = () => useContext(LoadingFeedbackContext);
