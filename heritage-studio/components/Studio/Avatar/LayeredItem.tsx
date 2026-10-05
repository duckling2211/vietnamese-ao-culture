'use client';

import React, { useState } from 'react';
import ItemPopover from './ItemPopover';

interface LayeredItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    x: number;       // Mathematical positioning
    y: number;
    zIndex: number;  // Depth ordering to prevent clipping
    isSacred?: boolean;
    isCasual?: boolean;
  };
  hasViolation?: boolean;
}

export default function LayeredItem({ item, hasViolation }: LayeredItemProps) {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div 
      className="absolute cursor-pointer transition-transform hover:scale-105"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        zIndex: item.zIndex,
        transform: 'translate(-50%, -50%)' // Center anchor point
      }}
      onClick={() => setShowPopover(!showPopover)}
    >
      {/* The Graphical Asset */}
      <img 
        src={item.imageUrl} 
        alt={item.name}
        className={`w-48 h-auto object-contain drop-shadow-md ${hasViolation ? 'ring-2 ring-red-500 animate-pulse rounded-lg' : ''}`}
      />

      {/* Interaction Popover */}
      {showPopover && (
        <ItemPopover 
          name={item.name}
          description={item.description}
          isViolation={hasViolation}
          violationMessage="Mixing sacred ceremonial items with casual modern wear violates traditional heritage norms."
          onClose={() => setShowPopover(false)}
        />
      )}
    </div>
  );
}