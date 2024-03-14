'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='error'>
            <h3>Something went wrong!</h3>
            <button
                className='b-full'
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}