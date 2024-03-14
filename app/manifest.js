export default function manifest() {
    return {
        name: 'Book Reviews | Key',
        short_name: 'Key',
        description: 'Book Reviews | Key',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}

//https://developer.mozilla.org/en-US/docs/Web/Manifest