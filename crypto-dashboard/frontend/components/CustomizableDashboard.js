// frontend/components/CustomizableDashboard.js
'use client';
import { useState, useEffect } from "react";
import axios from "axios";

const CustomizableDashboard = () => {
  const [widgets, setWidgets] = useState([]);
  const [selectedWidget, setSelectedWidget] = useState("");

  const fetchPreferences = async () => {
    try {
      const response = await axios.get("/api/preferences");
      setWidgets(response.data.widgets);
    } catch (error) {
      console.error("Erreur lors de la récupération des préférences :", error);
    }
  };

  const savePreferences = async () => {
    try {
      await axios.post("/api/preferences", { widgets });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des préférences :", error);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return (
    <div>
      <h2>Personnaliser le Dashboard</h2>
      <div>
        <select value={selectedWidget} onChange={(e) => setSelectedWidget(e.target.value)}>
          <option value="">Sélectionnez un widget</option>
          <option value="trading_chart">Graphique TradingView</option>
          <option value="portfolio">Portfolio</option>
          <option value="alerts">Alertes</option>
        </select>
        <button onClick={() => setWidgets([...widgets, selectedWidget])}>Ajouter</button>
      </div>
      <button onClick={savePreferences}>Enregistrer</button>
      <ul>
        {widgets.map((widget, index) => (
          <li key={index}>{widget}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomizableDashboard;