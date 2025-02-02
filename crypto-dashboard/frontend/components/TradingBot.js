import { useState } from "react";
import axios from "axios";

const TradingBot = () => {
  const [config, setConfig] = useState({
    strategy: "momentum",
    parameters: {
      threshold: 0.02,
      period: 14
    }
  });

  const [isRunning, setIsRunning] = useState(false);

  const handleStart = async () => {
    setIsRunning(true);
    try {
      const response = await axios.post("/api/trading-bot", config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsRunning(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Bot de Trading</h2>
      <div className="space-y-4">
        <select 
          value={config.strategy}
          onChange={(e) => setConfig({...config, strategy: e.target.value})}
          className="w-full p-2 border rounded"
        >
          <option value="momentum">Momentum</option>
          <option value="mean_reversion">Mean Reversion</option>
        </select>
        
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isRunning ? "En cours..." : "Démarrer"}
        </button>
      </div>
    </div>
  );
};

export default TradingBot;