// frontend/pages/index.js
import { useEffect } from "react";
import TradingChart from "../components/TradingChart";
import DynamicTable from "../components/DynamicTable";
import { requestNotificationPermission, onMessageListener } from "../firebase";
//import PortfolioRebalancer from "../components/PortfolioRebalancer";
//import WhaleTracker from "../components/WhaleTracker";
//import Alerts from "../components/Alerts";
//import TaxCalculator from "../components/TaxCalculator";
//import SentimentAnalysis from "../components/SentimentAnalysis";
//import TradeExecutor from "../components/TradeExecutor";
//import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Dashboard() {
  useEffect(() => {
    // Vérifier si nous sommes côté client
    if (typeof window !== "undefined") {
      requestNotificationPermission();

      onMessageListener().then((payload) => {
        if (payload) {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
          });
        }
      });
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl mb-4">Bitcoin (BTC/USDT)</h2>
          <TradingChart symbol="BINANCE:BTCUSDT" interval="D" />
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl mb-4">Ethereum (ETH/USDT)</h2>
          <TradingChart symbol="BINANCE:ETHUSDT" interval="D" />
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl mb-4">Binance Coin (BNB/USDT)</h2>
          <TradingChart symbol="BINANCE:BNBUSDT" interval="D" />
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl mb-4">Solana (SOL/USDT)</h2>
          <TradingChart symbol="BINANCE:SOLUSDT" interval="D" />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Top Cryptos</h2>
        <DynamicTable />
      </div>
    </div>
  );
}