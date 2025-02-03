// frontend/components/NewsFeed.js
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('hot');
  const [crypto, setCrypto] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const cryptosList = [
    { id: 'all', value: 'all', label: 'Toutes' },
    { id: 'btc', value: 'BTC', label: 'Bitcoin' },
    { id: 'eth', value: 'ETH', label: 'Ethereum' },
    { id: 'xrp', value: 'XRP', label: 'Ripple' },
    { id: 'sol', value: 'SOL', label: 'Solana' },
    { id: 'ada', value: 'ADA', label: 'Cardano' },
    { id: 'dot', value: 'DOT', label: 'Polkadot' },
  ];

  const fetchNews = async (page = 1) => {
    try {
      const currencies = crypto !== 'all' ? crypto : 'BTC,ETH,XRP,SOL,ADA,DOT';
      const response = await axios.get(`/api/news?filter=${filter}&currencies=${currencies}&page=${page}`);
      
      if (response.data && Array.isArray(response.data.results)) {
        setNews(response.data.results);
        // Calcul du nombre total de pages
        const total = Math.ceil(response.data.results.length / itemsPerPage);
        setTotalPages(total);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchNews(1);
  }, [filter, crypto]);

  // Calcul des indices pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-gray-800 rounded-lg h-full flex flex-col">
      <div className="sticky top-0 bg-gray-800 z-10 p-2 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Actualités Crypto</h2>
          
          {/* Pagination au centre */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-0.5 bg-gray-700 text-white text-sm rounded disabled:bg-gray-600 disabled:text-gray-400"
            >
              &lt;
            </button>
            <span className="px-2 py-0.5 text-white text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-0.5 bg-gray-700 text-white text-sm rounded disabled:bg-gray-600 disabled:text-gray-400"
            >
              &gt;
            </button>
          </div>

          {/* Filtres à droite */}
          <div className="flex gap-2">
            <select
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
              className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
            >
              {cryptosList.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
            >
              <option value="hot">Populaires</option>
              <option value="rising">En hausse</option>
              <option value="important">Important</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {/* ... reste du contenu ... */}
      </div>
    </div>
  );
};

export default NewsFeed;