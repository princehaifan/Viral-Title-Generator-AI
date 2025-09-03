
import type { Tier } from './types';

export const TIER_STYLES: { [key in Tier]: { badge: string; border: string; text: string; } } = {
  'S-Tier': {
    badge: 'bg-red-500 text-white',
    border: 'border-red-500',
    text: 'text-red-400',
  },
  'A-Tier': {
    badge: 'bg-yellow-500 text-gray-900',
    border: 'border-yellow-500',
    text: 'text-yellow-400',
  },
  'B-Tier': {
    badge: 'bg-blue-500 text-white',
    border: 'border-blue-500',
    text: 'text-blue-400',
  },
};
