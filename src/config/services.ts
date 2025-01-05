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
    description: '',
    url: 'https://netflix.com',
    bgColor: 'bg-black',
    textColor: 'text-red-600',
  },
  {
    name: 'Disney+',
    icon: '/icons/disney.svg',
    description: '',
    url: 'https://disneyplus.com',
    bgColor: 'bg-[#040814]',
    textColor: 'text-white',
  },
  {
    name: 'YouTube',
    icon: '/icons/youtube.svg',
    description: '',
    url: 'https://youtube.com',
    bgColor: 'bg-[#040814]',
    textColor: 'text-black',
  },
];