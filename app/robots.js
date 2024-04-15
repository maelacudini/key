export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/account/',
        },
        sitemap: 'https://addwebsite.com/sitemap.xml',
    }
}