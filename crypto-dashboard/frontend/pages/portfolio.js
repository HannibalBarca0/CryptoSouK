// frontend/pages/portfolio.js
import { useState, useEffect } from "react";
import axios from "axios";
import PortfolioRebalancer from "../components/PortfolioRebalancer";
import OnChainMetrics from "../components/OnChainMetrics";
import TradingBot from "../components/TradingBot";
import Alerts from "../components/Alerts";
import { getPreferences } from '../services/preferences';
import ThemeSwitcher from "../components/ThemeSwitcher";

const Portfolio = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get("https://api.binance.com/api/v3/myTrades", {
          headers: {
            "X-MBX-APIKEY": "your-binance-api-key",
          },
          params: {
            symbol: "BTCUSDT",
          },
        });
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
    <div className="container mx-auto p-4">
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
    </div>
  );
};

export default Portfolio;