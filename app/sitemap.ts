import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://estudionk-challenge.vercel.app',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://estudionk-challenge.vercel.app/es',
          en: 'https://estudionk-challenge.vercel.app/en',
        },
      },
    },
    {
      url: 'https://estudionk-challenge.vercel.app/services',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://estudionk-challenge.vercel.app/es/services',
          en: 'https://estudionk-challenge.vercel.app/en/services',
        },
      },
    },
    {
      url: 'https://estudionk-challenge.vercel.app/work',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://estudionk-challenge.vercel.app/es/work',
          en: 'https://estudionk-challenge.vercel.app/en/work',
        },
      },
    },
    {
      url: 'https://estudionk-challenge.vercel.app/culture',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://estudionk-challenge.vercel.app/es/culture',
          en: 'https://estudionk-challenge.vercel.app/en/culture',
        },
      },
    },
    {
      url: 'https://estudionk-challenge.vercel.app/news',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://estudionk-challenge.vercel.app/es/news',
          en: 'https://estudionk-challenge.vercel.app/en/news',
        },
      },
    },
    {
      url: 'https://estudionk-challenge.vercel.app/careers',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://estudionk-challenge.vercel.app/es/careers',
          en: 'https://estudionk-challenge.vercel.app/en/careers',
        },
      },
    },
    {
      url: 'https://estudionk-challenge.vercel.app/contact-us',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://estudionk-challenge.vercel.app/es/contact-us',
          en: 'https://estudionk-challenge.vercel.app/en/contact-us',
        },
      },
    },
    {
      url: 'https://estudionk-challenge.vercel.app/subscribe',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://estudionk-challenge.vercel.app/es/subscribe',
          en: 'https://estudionk-challenge.vercel.app/en/subscribe',
        },
      },
    },
  ];
}
