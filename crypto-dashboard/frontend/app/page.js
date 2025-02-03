'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique du TradingChart avec chargement
const DynamicTradingChart = dynamic(
  () => import('../components/TradingChart'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-800">Chargement...</div>
  }
);

// Import dynamique du NewsFeed
const DynamicNewsFeed = dynamic(
  () => import('../components/NewsFeed'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-800">Chargement...</div>
  }
);

const DraggableWidget = dynamic(
  () => import('../components/DraggableWidget'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-800">Chargement...</div>
  }
);

export default function Dashboard() {
  const [widgets] = useState([
    {
      id: 'trading',
      title: 'Trading Chart',
      component: <DynamicTradingChart symbol="BINANCE:BTCUSDT" interval="D" />,
      defaultPosition: { x: 0, y: 0 },
      defaultSize: { width: '30%', height: '30%' }
    },
    {
      id: 'news',
      title: 'Actualités Crypto',
      component: <DynamicNewsFeed />,
      defaultPosition: { x: '0', y: 0 },
      defaultSize: { width: '30%', height: '70%' }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="absolute top-14 bottom-0 left-0 right-0 p-4">
        {widgets.map(widget => (
          <DraggableWidget
            key={widget.id}
            title={widget.title}
            defaultPosition={widget.defaultPosition}
            defaultSize={widget.defaultSize}
            minWidth={400}
            minHeight={300}
            bounds="parent"
            className="bg-gray-800 rounded-lg overflow-hidden flex flex-col"
          >
            <div className="h-full flex flex-col">
              <div className="p-2 bg-gray-700 cursor-move handle">
                {widget.title}
              </div>
              <div className="flex-1">
                {widget.component}
              </div>
            </div>
          </DraggableWidget>
        ))}
      </div>
    </div>
  );
}