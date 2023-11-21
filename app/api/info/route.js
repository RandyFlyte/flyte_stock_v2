import { NextResponse } from 'next/server';
import YFinance from '@/app/_utils/yahooFinance';

/**
 * Handles the GET request for stock symbol information.
 * @param {Request} request - The request object.
 * @returns {NextResponse} The response object.
 */
export async function GET(request) {
  const symbol = request.nextUrl.searchParams.get('symbol');  
  const yahooFinanceClient = new YFinance(symbol);
  const info = await yahooFinanceClient.getInfo();
  console.log(info);
  return NextResponse.json({ status: 200, data: info });
}
