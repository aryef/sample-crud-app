/** @type {import('next').NextConfig} */
/** disable default SSR rendering https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
 * https://medium.com/@mbleigh/when-should-i-server-side-render-c2a383ff2d0f
 * https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
 * */
require('dotenv').config();

const path = require('path');

const nextConfig = {
    reactStrictMode: false,
    images: {
        // limit of 25 deviceSizes values
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // limit of 25 imageSizes values
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // limit of 50 domains values
        domains: [],
        // path prefix for Image Optimization API, useful with `loader`
        path: '/_next/image',
        // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
        loader: 'default',
        // disable static imports for image files
        disableStaticImages: false,
        // minimumCacheTTL is in seconds, must be integer 0 or more
        minimumCacheTTL: 60,
        // ordered list of acceptable optimized image formats (mime types)
        formats: ['image/webp'],
        // enable dangerous use of SVG images
        dangerouslyAllowSVG: false,
        // set the Content-Security-Policy header
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
    async rewrites() {
        return [
            // Do not rewrite API routes
            {
                source: '/api/:any*',
                destination: '/api/:any*',
            },
            // Do not rewrite SSR pages
            {
                source: '/ui/use_case/sign_in/google_authentication_response/:any*',
                destination:
                    '/ui/use_case/sign_in/google_authentication_response/:any*',
            },
            // Rewrite everything to `pages/index`
            {
                source: '/:any*',
                destination: '/',
            },
        ];
    },
    env: {
        APPLICATION_NAME: process.env.APPLICATION_NAME,
        SERVER_LOCAL_IP: process.env.SERVER_LOCAL_IP,
        LOG_LEVEL: parseInt(process.env.LOG_LEVEL),
        SERVER_FQDN: process.env.SERVER_FQDN,
        NEXT_PUBLIC_SOCKET_SERVER_URL:
            process.env.NEXT_PUBLIC_SOCKET_SERVER_URL,
        NEXT_PUBLIC_PRINT_MAX_LINES: parseInt(
            process.env.NEXT_PUBLIC_PRINT_MAX_LINES,
        ),
        NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
        NEXT_PUBLIC_WEBSITE_URL_SSL:
            process.env.NEXT_PUBLIC_WEBSITE_URL_SSL,
        NEXT_PUBLIC_NET_PROTOCOL:
            process.env.NEXT_PUBLIC_NET_PROTOCOL,
    },
    sassOptions: {
        includePaths: [
            path.join(__dirname, '/layers/client/ui/styles/sass'),
        ],
    },
    swcMinify: false,
};

module.exports = nextConfig;
