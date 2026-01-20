/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Отключаем оптимизацию для статических изображений из public/
    // Это решает проблему с "received null" на Render
    unoptimized: true,
  },
  // Явная конфигурация для поддержки путей
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
}

module.exports = nextConfig