import { type ReactNode } from 'react';

export interface Service {
  name: string;
  icon: ReactNode;
  description: string;
  url: string;
  bgColor: string;
  textColor?: string;
}

export const services: Service[] = [
  {
    name: 'Netflix',
    icon: '/icons/netflix.svg',
    description: 'Stream your favorite movies and TV shows on the world\'s leading streaming platform.',
    url: 'https://netflix.com',
    bgColor: 'bg-black',
    textColor: 'text-red-600',
  },
  {
    name: 'Disney+',
    icon: '/icons/disney.svg',
    description: 'Experience the magic of Disney, Marvel, Star Wars, and more in one place.',
    url: 'https://disneyplus.com',
    bgColor: 'bg-[#040814]',
    textColor: 'text-white',
  },
  {
    name: 'YouTube',
    icon: '/icons/youtube.svg',
    description: 'Watch millions of videos from creators worldwide.',
    url: 'https://youtube.com',
    bgColor: 'bg-[#040814]',
    textColor: 'text-black',
  },
];