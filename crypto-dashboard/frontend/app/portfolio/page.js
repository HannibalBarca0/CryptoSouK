'use client';

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import PortfolioRebalancer from "../../components/PortfolioRebalancer";
import OnChainMetrics from "../../components/OnChainMetrics";
import TradingBot from "../../components/TradingBot";
import Alerts from "../../components/Alerts";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { getPreferences } from '../../services/preferences';
import dynamic from 'next/dynamic';

// Import dynamique des composants avec le bon chemin
const DynamicTradingChart = dynamic(
  () => import('../../components/TradingChart'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-800">Chargement...</div>
  }
);

const DraggableWidget = dynamic(
  () => import('../../components/DraggableWidget'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-800">Chargement...</div>
  }
);

export default function PortfolioPage() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [widgets] = useState([
    {
      id: 'trading',
      title: 'Trading Chart',
      component: <DynamicTradingChart symbol="BINANCE:BTCUSDT" interval="D" />,
      defaultPosition: { x: 0, y: 0 },
      defaultSize: { width: 800, height: 400 }
    }
  ]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get("/api/trades");
        setTrades(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des trades:", error);
        setError("Erreur lors de la récupération des trades.");
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const prefs = await getPreferences('user_id');
        setPreferences(prefs);
      } catch (error) {
        console.error("Erreur lors du chargement des préférences:", error);
      }
    };
    loadPreferences();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <ThemeSwitcher />
      <h1 className="text-2xl font-bold mb-6">Mon Portfolio</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Paire</th>
            <th className="py-2 px-4 border-b">Quantité</th>
            <th className="py-2 px-4 border-b">Prix</th>
            <th className="py-2 px-4 border-b">Type</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{new Date(trade.time).toLocaleString()}</td>
              <td className="py-2 px-4">{trade.symbol}</td>
              <td className="py-2 px-4">{trade.qty}</td>
              <td className="py-2 px-4">${parseFloat(trade.price).toFixed(2)}</td>
              <td className="py-2 px-4">{trade.isBuyer ? "Achat" : "Vente"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {preferences?.widgets.includes('rebalancer') && <PortfolioRebalancer />}
        {preferences?.widgets.includes('metrics') && <OnChainMetrics />}
        {preferences?.widgets.includes('bot') && <TradingBot />}
        {preferences?.widgets.includes('alerts') && <Alerts />}
      </div>
      <div className="relative h-[100vh] mt-8">
        <Suspense fallback={<div>Chargement...</div>}>
          {widgets.map(widget => (
            <DraggableWidget
              key={widget.id}
              title={widget.title}
              defaultPosition={widget.defaultPosition}
              defaultSize={widget.defaultSize}
              minWidth={200}
              minHeight={200}
              bounds="parent"
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="h-full">
                <div className="p-2 bg-gray-700 cursor-move handle">
                  {widget.title}
                </div>
                <div className="p-4">
                  {widget.component}
                </div>
              </div>
            </DraggableWidget>
          ))}
        </Suspense>
      </div>
    </div>
  );
}