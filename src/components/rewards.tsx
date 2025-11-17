'use client';

import { useSettings } from '@/context/settings-context';
import { Award } from 'lucide-react';

export function Rewards() {
  const { settings } = useSettings();

  return (
    <div className="flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-foreground backdrop-blur-sm">
      <Award className="h-5 w-5 text-primary" />
      <span className="font-semibold">{settings.rewardPoints}</span>
      <span className="text-sm text-muted-foreground">Points</span>
    </div>
  );
}
