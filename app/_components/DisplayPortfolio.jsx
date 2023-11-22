'use client';
import { usePositionsStore } from '@/app/_utils/store';
import {
  fetchPositions,
  fetchInfo,
  deletePosition,
} from '@/app/_utils/apiServices';
import { useInfoStore } from '@/app/_utils/store';
import { useEffect } from 'react';
import DeleteButton from './DeleteButton';
import Ask from './Ask';
import Bid from './Bid';
import Mark from './Mark';
import Difference from './Difference';

const DisplayPortfolio = () => {
  const positions = usePositionsStore((state) => state.positions);
  const setPositions = usePositionsStore((state) => state.setPositions);
  const symbolData = useInfoStore((state) => state.info);

  useEffect(() => {
    let isMounted = true;

    fetchPositions().then((fetchedPositions) => {
      if (isMounted) {
        fetchedPositions.forEach((position) => {
          fetchInfo(position.symbol);
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='mt-4 p-4'>
      <span>Portfolio</span>
      {positions &&
        positions.map((position, index) => (
          <div key={index} className='mb-2'>
            {position.symbol}: {parseFloat(position.price).toFixed(2)} x{' '}
            {position.quantity}
            <div>
              <Bid symbolData={symbolData} position={position} />
              |
              <Ask symbolData={symbolData} position={position} />
              |
              <Mark symbolData={symbolData} position={position} />
              |
              <Difference symbolData={symbolData} position={position} />
              |
              <DeleteButton
                symbol={position.symbol}
                setPositions={setPositions}
              />
            </div>
            {/* <div>Info for {position.symbol}: {JSON.stringify(symbolData[position.symbol])}</div> */}
          </div>
        ))}
    </div>
  );
};

export default DisplayPortfolio;
