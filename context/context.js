'use client'
import { getAllReviews } from '@/app/_utils/functions';
import { createContext, useContext, useEffect, useState } from 'react';

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
    const [data, setData] = useState([])
    const [feedback, setFeedback] = useState(null)
    const [input, setInput] = useState({
        // page: 1,
        limit: 10,
        createdAt: 1,
        keywords: ''
    })

    useEffect(() => {
        async function fetchReviews() {
            const res = await getAllReviews(1, 10);
            setData(res);
        }
        fetchReviews();
    }, []);

    return (
        <GeneralContext.Provider value={{ feedback, setFeedback, input, setInput, data, setData }}>
            {children}
        </GeneralContext.Provider>
    );
};

export const useGeneralContext = () => useContext(GeneralContext);
