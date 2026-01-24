'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface SyndromeFilterProps {
  selected: string;
  onSelect: (syndrome: string) => void;
}

const syndromes = [
  { id: 'all', label: 'All Syndromes' },
  { id: 'fever', label: 'Fever' },
  { id: 'respiratory', label: 'Respiratory' },
  { id: 'gi', label: 'Gastro-Intestinal' },
  { id: 'neuro', label: 'Neurological' },
  { id: 'hemorrhagic', label: 'Hemorrhagic' },
];

export function SyndromeFilter({ selected, onSelect }: SyndromeFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-primary" />
        <label className="text-sm font-semibold text-foreground">
          Filter by Syndrome
        </label>
      </div>
      <div className="space-y-2">
        {syndromes.map((syndrome) => (
          <label key={syndrome.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="syndrome"
              value={syndrome.id}
              checked={selected === syndrome.id}
              onChange={() => onSelect(syndrome.id)}
              className="h-4 w-4"
            />
            <span className="text-sm text-foreground">{syndrome.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
