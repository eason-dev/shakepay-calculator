import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      {
        headers: {
          'Accept': 'application/json',
        },
        next: {
          revalidate: 60, // Cache for 60 seconds
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch BTC price');
    }

    const data = await response.json();
    const price = data.bitcoin?.usd || 95000;

    return NextResponse.json({ price });
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    return NextResponse.json({ price: 95000 }, { status: 200 });
  }
}
