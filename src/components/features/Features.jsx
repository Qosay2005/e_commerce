import React from 'react';

import Icon_1 from '../../assets/features/icon_1.svg';
import Icon_2 from '../../assets/features/icon_2.svg';
import Icon_3 from '../../assets/features/icon_3.svg';

import { Typography } from '@mui/material';

export default function Features() {
  const features = [
    {
      icon: Icon_1,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
    },
    {
      icon: Icon_2,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
    },
    {
      icon: Icon_3,
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col items-center gap-2 text-center"
        >
       
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-300">
            
        
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black">
              <img src={feature.icon} alt={feature.title} />
            </div>

          </div>

          <Typography
            variant="h6"
            sx={{ fontSize: 18, fontWeight: 'bold' }}
          >
            {feature.title}
          </Typography>

          <Typography
            variant="body2"
            className="text-gray-600"
          >
            {feature.description}
          </Typography>
        </div>
      ))}
    </section>
  );
}