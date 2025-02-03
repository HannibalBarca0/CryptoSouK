'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OnChainMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('/api/metrics/onchain', {
          params: { asset: 'BTC' }
        });
        setMetrics(response.data);
      } catch (error) {
        console.error('Erreur de chargement des métriques:', error);
        setError('Erreur de chargement des métriques');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <div className="animate-pulse">Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Métriques On-Chain</h2>
      <pre className="bg-gray-100 p-2 rounded">
        {JSON.stringify(metrics, null, 2)}
      </pre>
    </div>
  );
};

export default OnChainMetrics;