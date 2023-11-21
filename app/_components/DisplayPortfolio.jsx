'use client';
import { usePositionsStore } from '@/app/_utils/store';
import { fetchPositions, fetchInfo } from '@/app/_utils/apiServices';
import { useInfoStore } from '@/app/_utils/store';
import { useEffect } from 'react';

const DisplayPortfolio = () => {
  const positions = usePositionsStore((state) => state.positions);
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
  
    return () => { isMounted = false };
  }, []);

  return (
    <div className='mt-4 p-4'>
      <span>Portfolio</span>
      {positions && positions.map((position, index) => (
        <div key={index} className='mb-2'>
          {position.symbol}: {parseFloat(position.price).toFixed(2)} x{' '}
          {position.quantity}
          <div>
                <span>Bid: { 
                  symbolData[position.symbol] && symbolData[position.symbol].bid
                    ? symbolData[position.symbol].bid
                    : 'N/A'
                 }</span> | 
                <span> Ask: { 
                  symbolData[position.symbol] && symbolData[position.symbol].ask
                    ? symbolData[position.symbol].ask
                    : 'N/A'
                 }</span> |
          </div>
          {/* <div>Info for {position.symbol}: {JSON.stringify(symbolData[position.symbol])}</div> */}
        </div>
      ))}
    </div>
  );
};

export default DisplayPortfolio;