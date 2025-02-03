'use client';

import React, { useEffect, useRef } from 'react';

const TradingChart = ({ symbol = "BINANCE:BTCUSDT", interval = "D" }) => {
  const container = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof TradingView !== 'undefined' && container.current) {
        new TradingView.widget({
          "width": "100%",
          "height": "100%",
          "symbol": symbol,
          "interval": interval,
          "timezone": "Europe/Paris",
          "theme": "dark",
          "style": "1",
          "locale": "fr",
          "toolbar_bg": "#131722",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "save_image": false,
          "container_id": container.current.id
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, interval]);

  return (
    <div 
      id="tradingview_widget"
      ref={container} 
      className="tradingview-chart"
    />
  );
};

export default TradingChart;