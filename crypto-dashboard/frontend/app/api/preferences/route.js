import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Pour le moment, retournez des préférences par défaut
    const preferences = {
      widgets: ['rebalancer', 'metrics', 'bot', 'alerts'],
      theme: 'dark'
    };

    return NextResponse.json(preferences);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const preferences = await request.json();
    // Ici vous pouvez sauvegarder les préférences dans une base de données
    return NextResponse.json(preferences);
  } catch (error) {
    return NextResponse.error(error);
  }
}