// frontend/components/DynamicTable.js
'use client';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useEffect } from "react";
import axios from "axios";

const DynamicTable = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        });
        setRowData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const columnDefs = [
    { headerName: "Nom", field: "name", sortable: true, filter: true },
    { headerName: "Symbole", field: "symbol", sortable: true, filter: true },
    { headerName: "Prix (USD)", field: "current_price", sortable: true, filter: true },
    { headerName: "Market Cap", field: "market_cap", sortable: true, filter: true },
    { headerName: "Variation (24h)", field: "price_change_percentage_24h", sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} />
    </div>
  );
};

export default DynamicTable;