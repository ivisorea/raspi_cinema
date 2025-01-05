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
      className={`block ${bgColor} rounded-xl p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl`}
    >
      <div className={`flex items-center justify-between ${textColor}`}>
        <div className="text-3xl">{icon}</div>
      </div>
      <h2 className={`mt-4 text-xl font-bold ${textColor}`}>{name}</h2>
      <p className={`mt-2 text-sm ${textColor} opacity-90`}>{description}</p>
    </a>
  );
};

export default ServiceCard;