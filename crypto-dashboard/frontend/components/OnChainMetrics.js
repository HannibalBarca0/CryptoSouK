import { useState, useEffect } from "react";
import axios from "axios";

const OnChainMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get("/api/metrics/onchain", {
          params: { asset: "BTC" }
        });
        setMetrics(response.data);
      } catch (error) { // Renommé de _err à error pour l'utiliser
        console.error("Erreur de chargement des métriques:", error);
        setError("Erreur de chargement des métriques");
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
      <div className="grid grid-cols-2 gap-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="border p-3 rounded">
            <div className="font-medium">{metric.name}</div>
            <div className="text-xl">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnChainMetrics;