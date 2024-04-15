import { topics } from "./_components/home/topics/data"

export default async function sitemap() {
    const topicURL = topics.map((topic, _) => {
        return {
            url: `https://addwebsite.com/topics/${topic}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        }
    })

    return [
        {
            url: 'https://addwebsite.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://addwebsite.com/login',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://addwebsite.com/signup',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://addwebsite.com/reviews',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://addwebsite.com/account',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...topicURL
    ]
}