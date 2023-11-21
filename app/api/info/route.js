import { NextResponse } from 'next/server';
import YFinance from '@/app/_utils/yahooFinance';

export async function GET(request) {
  const symbol = request.query.get('symbol');
  const yahooFinanceClient = new YFinance('AA231215P00015000');
  const info = await yahooFinanceClient.getInfo();
  console.log(info);
  return NextResponse.json({ status: 200, data: info });
}
