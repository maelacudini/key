import Link from 'next/link'

export default function NotFound() {
    return (
        <section className='notfound'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link className='b-full' href="/">Return Home</Link>
        </section>
    )
}