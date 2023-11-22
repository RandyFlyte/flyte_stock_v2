import clientPromise from '@/app/_utils/dbConnect';
import { NextResponse } from 'next/server';
import YFinance from '../_utils/yahooFinance';

// /api GET requested. Returns all positions.
export async function GET(request) {
  const yahooFinanceClient = new YFinance('AA231215P00015000');
  const info = await yahooFinanceClient.getInfo();
  console.log(info);
  // Connect to mongodb.
  const client = await clientPromise;
  const db = client.db('flyte-stocks');
  // Store all positions in a variable.
  const allPostions = await db.collection('positions').find({}).toArray();
  // Return a response containing the positions.
  return NextResponse.json({ status: 200, data: allPostions });
}

export async function POST(request) {
  // Await the client and connect to the database
  const client = await clientPromise;
  const db = client.db('flyte-stocks');

  try {
    // Put request body into requestData in json
    const requestData = await request.json();
    // Insert the new document into the 'positions' collection
    const result = await db.collection('positions').insertOne(requestData);
    // Check the result for success
    if (result.acknowledged && result.insertedId) {
      return NextResponse.json({
        status: 201,
        data: { insertedId: result.insertedId },
      });
    } else {
      return NextResponse.json({
        status: 500,
        data: { error: 'Failed to insert document' },
      });
    }
  } catch (error) {
    // Handle any errors that occur during the operation
    return NextResponse.json({
      status: 500,
      data: { error: error.message },
    });
  }
}

// DELETE request to /api. Deletes a position from the database.
export async function DELETE(request) {
  // Await the client and connect to the database
  const client = await clientPromise;
  const db = client.db('flyte-stocks');

  try {
    const symbol = request.nextUrl.searchParams.get('symbol');
    // Delete the document with the specified symbol
    const result = await db.collection('positions').deleteOne({ symbol });
    // Check the result for success
    if (result.acknowledged && result.deletedCount) {
      return NextResponse.json({
        status: 200,
        data: { deletedCount: result.deletedCount },
      });
    } else {
      return NextResponse.json({
        status: 500,
        data: { error: 'Failed to delete document' },
      });
    }
  } catch (error) {
    // Handle any errors that occur during the operation
    return NextResponse.json({
      status: 500,
      data: { error: error.message },
    });
  }
}
