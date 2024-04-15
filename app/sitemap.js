import { topics } from "./_components/home/topics/data"

export default async function sitemap() {
    const topicURL = topics.map((topic, _) => {
        return {
            url: `https://aggiungeresito/topics/${topic}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        }
    })

    return [
        {
            url: 'https://acme.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://acme.com/login',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://acme.com/signup',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://acme.com/reviews',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://acme.com/account',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...topicURL
    ]
}