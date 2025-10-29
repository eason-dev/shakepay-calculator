import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,cad',
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
    const priceUSD = data.bitcoin?.usd || 95000;
    const priceCAD = data.bitcoin?.cad || 130000;

    return NextResponse.json({
      usd: priceUSD,
      cad: priceCAD
    });
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    return NextResponse.json({
      usd: 95000,
      cad: 130000
    }, { status: 200 });
  }
}
