import { useState } from "react";
import axios from "axios";

const PortfolioRebalancer = () => {
  const [currentPortfolio, setCurrentPortfolio] = useState({
    BTC: 0.5,
    ETH: 0.3,
    USDT: 0.2
  });
  
  const [targetAllocation, setTargetAllocation] = useState({
    BTC: 0.5,
    ETH: 0.5
  });

  const updateCurrentPortfolio = (asset, value) => {
    setCurrentPortfolio(prev => ({...prev, [asset]: value}));
  };

  const updateTargetAllocation = (asset, value) => {
    setTargetAllocation(prev => ({...prev, [asset]: value}));
  };
  
  const [adjustments, setAdjustments] = useState(null);

  const handleRebalance = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/portfolio/rebalance", {
        current_portfolio: currentPortfolio,
        target_allocation: targetAllocation,
      });
      setAdjustments(response.data.adjustments);
    } catch (error) {
      console.error("Erreur lors du rebalancement:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Rebalancement du Portfolio</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Portfolio Actuel</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(currentPortfolio, null, 2)}
          </pre>
          <input 
            type="number"
            value={currentPortfolio.BTC}
            onChange={(e) => updateCurrentPortfolio('BTC', e.target.value)}
          />
        </div>
        <div>
          <h3 className="font-medium">Allocation Cible</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(targetAllocation, null, 2)}
          </pre>
          <input 
            type="number"
            value={targetAllocation.BTC}
            onChange={(e) => updateTargetAllocation('BTC', e.target.value)}
          />
        </div>
        <button 
          onClick={handleRebalance}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Calculer les Ajustements
        </button>
        {adjustments && (
          <div>
            <h3 className="font-medium">Ajustements Nécessaires</h3>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(adjustments, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioRebalancer;