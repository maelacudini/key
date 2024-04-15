'use client'
import { getAllReviews, getFilteredReviews } from '@/app/_utils/functions';
import { createContext, useContext, useEffect, useState } from 'react';

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [feedback, setFeedback] = useState(null)
    const [input, setInput] = useState({
        limit: 10,
        createdAt: 1,
        keywords: ''
    })

    useEffect(() => {
        async function fetchReviews() {
            setLoading(true)
            const res = await getFilteredReviews(1, 10, '', 1);
            setData(res);
        }
        fetchReviews();
        setLoading(false)
        setTimeout(() => {
            setFeedback(null);
        }, 3000);
    }, [feedback]);

    return (
        <GeneralContext.Provider value={{ feedback, setFeedback, input, setInput, data, setData, loading, setLoading }}>
            {children}
        </GeneralContext.Provider>
    );
};

export const useGeneralContext = () => useContext(GeneralContext);
