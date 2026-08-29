import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false, // Disables SVGO entirely for Turbopack to ensure IDs stay
            },
          },
        ],
        as: '*.js',
      },
    },
    resolveAlias: {
      'react-compiler-runtime': 'react/compiler-runtime',
      'react-compiler-runtime/*': 'react/compiler-runtime',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
