'use client'

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body>
                <main className="error">
                    <h3>Something went wrong!</h3>
                    <button className="b-full" onClick={() => reset()}>Try again</button>
                </main>
            </body>
        </html>
    )
}