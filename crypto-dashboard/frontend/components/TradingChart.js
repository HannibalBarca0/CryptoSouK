// frontend/components/TradingChart.js
import { useEffect } from "react";



const TradingChart = ({ symbol, interval }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: "tradingview-chart",
        autosize: true,
        symbol: symbol || "BINANCE:BTCUSDT",
        interval: interval || "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        studies: ["RSI@tv-basicstudies"],
        details: true,
        hotlist: true,
        calendar: true,
        withdateranges: true,
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [symbol, interval]);

  return (
    <>
      <div id="tradingview-chart" style={{ height: "500px", width: "100%" }} />
      <TradingChart symbol="BINANCE:BTCUSDT" interval="D" indicators={["RSI@tv-basicstudies", "MACD@tv-basicstudies"]} />
    </>
  );
};

export default TradingChart;