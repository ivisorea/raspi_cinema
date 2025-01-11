import React from 'react';

interface ServiceCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  url: string;
  bgColor: string;
  textColor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  icon,
  description,
  url,
  bgColor,
  textColor = 'text-white'
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block ${bgColor} rounded-lg p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg max-w-[200px] w-full flex flex-col items-center text-center`}
    >
      <div className={`flex items-center justify-center ${textColor}`}>
        <div className="text-2xl">{icon}</div>
      </div>
      <h2 className={`mt-2 text-lg font-bold ${textColor}`}>{name}</h2>
      <p className={`mt-1 text-xs ${textColor} opacity-90`}>{description}</p>
    </a>
  );
};

export default ServiceCard;