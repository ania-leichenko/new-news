const path = require('path');
const withOffline = require('next-offline')

const alias = {
  'api': path.join(__dirname, 'src/api'),
  'components': path.join(__dirname, 'src/components'),
  'config': path.join(__dirname, 'src/config'),
  'pages': path.join(__dirname, 'src/pages'),
  'services': path.join(__dirname, 'src/services'),
  'utils': path.join(__dirname, 'src/utils'),
};

const webpack = (config, options) => {
  Object.assign(config.resolve.alias, alias);
  return config;
};

const DAY = 24 * 60 * 60;

const workboxOpts = {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * DAY,
        }
      }
    },
    {
      urlPattern: /^https:\/\/use\.fontawesome\.com\/releases\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'font-awesome',
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 365 * DAY,
        }
      }
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * DAY,
        }
      }
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxAgeSeconds: 30 * DAY,
        }
      }
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-js-assets',
        expiration: {
          maxAgeSeconds: 7 * DAY,
        }
      }
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxAgeSeconds: 7 * DAY,
        }
      }
    },
    {
      urlPattern: /\.(?:json|xml|csv)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-data-assets',
        expiration: {
          maxAgeSeconds: 2 * DAY,
        }
      }
    },
    {
      urlPattern: /api/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-data',
        cacheableResponse: {
          statuses: [0, 200, 204],
          headers: {
            'CachedAPI': true
          },
        }
      }
    },
    {
      urlPattern: /.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'others',
        expiration: {
          maxAgeSeconds: 24 * DAY,
        }
      }
    }
  ]
}

const nextConfig = {
  poweredByHeader: false,
  dontAutoRegisterSw: true,
  webpack,
  workboxOpts,
};

module.exports = withOffline(nextConfig);
