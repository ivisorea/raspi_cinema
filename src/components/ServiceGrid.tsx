import React from 'react';
import { type Service } from '../config/services';
import ServiceCard from './ServiceCard';
import { ReactSVG } from 'react-svg';

interface ServiceGridProps {
  services: Service[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.name}
          name={service.name}
          icon={<ReactSVG src={service.icon as string} />}
          description={service.description}
          url={service.url}
          bgColor={service.bgColor}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;