'use client';
import { usePositionsStore } from '@/app/_utils/store';
import { fetchPositions } from '../_utils/apiServices';
import { useEffect } from 'react';

const DisplayPortfolio = () => {
  const positions = usePositionsStore((state) => state.positions);

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div className='mt-4 p-4'>
      <span>Portfolio</span>
      {positions.map((position, index) => (
        <div key={index} className='mb-2'>
          {position.symbol}: {parseFloat(position.price).toFixed(2)} x{' '}
          {position.quantity}
        </div>
      ))}
    </div>
  );
};

export default DisplayPortfolio;
