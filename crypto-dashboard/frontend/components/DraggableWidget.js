'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique de react-rnd en utilisant React.lazy
const Rnd = dynamic(
  () => 
    import('react-rnd').then((mod) => {
      const { Rnd } = mod;
      return { default: Rnd };
    }),
  { 
    ssr: false,
    loading: () => <div>Chargement...</div>
  }
);

const DraggableWidget = ({ title, defaultPosition, defaultSize, minWidth, minHeight, bounds, className, children }) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds={bounds}
      className={className}
      dragHandleClassName="handle"
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height
        });
        setPosition(position);
      }}
    >
      {children}
    </Rnd>
  );
};

export default DraggableWidget;