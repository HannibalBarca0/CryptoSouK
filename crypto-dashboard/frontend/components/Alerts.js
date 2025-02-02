import { useState, useEffect } from "react";
import axios from "axios";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [condition, setCondition] = useState("above");
  const [threshold, setThreshold] = useState("");

  const fetchAlerts = async () => {
    try {
      const response = await axios.get("/api/alerts");
      setAlerts(response.data.alerts);
    } catch (error) {
      console.error("Erreur lors de la récupération des alertes:", error);
    }
  };

  const createAlert = async () => {
    try {
      await axios.post("/api/alerts", {
        symbol,
        condition,
        threshold: parseFloat(threshold)
      });
      fetchAlerts();
      // Reset form
      setSymbol("");
      setCondition("above");
      setThreshold("");
    } catch (error) {
      console.error("Erreur lors de la création de l'alerte:", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Alertes Techniques</h2>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Symbole (ex: BTCUSDT)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="above">Au-dessus de</option>
            <option value="below">En-dessous de</option>
          </select>
          <input
            type="number"
            placeholder="Seuil"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={createAlert}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Créer une Alerte
          </button>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Alertes Actives</h3>
          {alerts.length > 0 ? (
            <ul className="space-y-2">
              {alerts.map((alert, index) => (
                <li key={index} className="bg-gray-50 p-2 rounded">
                  {alert.symbol} - {alert.condition} {alert.threshold}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune alerte configurée</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;