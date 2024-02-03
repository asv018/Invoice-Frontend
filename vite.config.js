module.exports = {
    // Vite configuration options
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@next/bundle-analyzer',
        '@next/env',
        'next/app',
        'next/error',
        'next/link',
        'next/p/image',
        'next/p/script',
        'next/p/style',
      ],
    },
  }
  