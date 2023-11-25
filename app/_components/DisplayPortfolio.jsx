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
import Dte from './Dte';

const DisplayPortfolio = () => {
  const positions = usePositionsStore((state) => state.positions);
  const setPositions = usePositionsStore((state) => state.setPositions);
  const symbolData = useInfoStore((state) => state.info);
  const filteredSymbol = usePositionsStore((state) => state.filteredSymbol);
  // const getTotalUnrealizedPL = usePositionsStore(
  //   (state) => state.getTotalUnrealizedPL
  // );

  // const totalUnrealizedPLForAll = getTotalUnrealizedPL(); // Total for all positions
  // const totalUnrealizedPLForFiltered =
  //   filteredSymbol !== 'All' ? getTotalUnrealizedPL(filteredSymbol) : null;
  const setFilteredSymbol = usePositionsStore(
    (state) => state.setFilteredSymbol
  );

  const handleSymbolChange = (event) => {
    setFilteredSymbol(event.target.value);
  };
  const uniqueSymbols = [
    'All',
    ...new Set(positions.map((position) => position.underlyingSymbol)),
  ];
  const filteredPositions =
    filteredSymbol === 'All'
      ? positions
      : positions.filter(
          (position) => position.underlyingSymbol === filteredSymbol
        );

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
    <div className='mt-4 p-8'>
      <span>Portfolio</span>
      <select value={filteredSymbol} onChange={handleSymbolChange}>
        {uniqueSymbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border table-auto'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th>Order Date</th>
            <th>DTE</th>
            <th>Ticker</th>
            <th>Price</th>
            <th>Call/Put</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Mark</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {positions &&
            filteredPositions.map((position, index) => (
              <tr key={index}>
                <td>{position.date}</td>
                <td className='p-2'>
                  <Dte date={position.date} />
                </td>
                <td>{position.underlyingSymbol}</td>
                <td>
                  {parseFloat(position.price).toFixed(2)} x {position.quantity}
                </td>
                <td>{position.optionType}</td>
                <td>
                  <Bid symbolData={symbolData} position={position} />
                </td>
                <td>
                  <Ask symbolData={symbolData} position={position} />
                </td>
                <td>
                  <Mark symbolData={symbolData} position={position} />
                </td>
                <td>
                  <Difference symbolData={symbolData} position={position} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayPortfolio;
