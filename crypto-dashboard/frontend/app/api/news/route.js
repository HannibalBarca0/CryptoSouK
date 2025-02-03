import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'hot';
    const currency = searchParams.get('currency') || 'all';
    const API_KEY = process.env.CRYPTOPANIC_API_KEY;

    // Debug de la clé API
    console.log('API Key utilisée:', API_KEY?.slice(0, 5) + '...');

    if (!API_KEY) {
      throw new Error('Clé API CryptoPanic non configurée');
    }

    let apiUrl = `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&public=true&filter=${filter}`;
    
    // Ajouter le filtre de crypto si une crypto spécifique est sélectionnée
    if (currency !== 'all') {
      apiUrl += `&currencies=${currency}`;
    }

    console.log('URL API:', apiUrl);

    const response = await fetch(apiUrl, { 
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    // Vérification de la réponse
    if (data.status === 'Incomplete' || data.info === 'Token not found') {
      throw new Error('Clé API invalide ou expirée');
    }

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Erreur détaillée:', error);
    return NextResponse.json(
      { error: error.message, results: [] },
      { status: 500 }
    );
  }
}