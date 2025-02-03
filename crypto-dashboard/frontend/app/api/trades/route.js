import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Pour le moment, retournez des données de test
    const trades = [
      {
        time: new Date(),
        symbol: "BTCUSDT",
        qty: 0.1,
        price: 45000,
        isBuyer: true
      }
    ];

    return NextResponse.json(trades);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}