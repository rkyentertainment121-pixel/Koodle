'use client';

import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/settings-context';
import { Award, IndianRupee } from 'lucide-react';
import { WithdrawDialog } from './withdraw-dialog';

export function Rewards() {
  const { settings } = useSettings();

  const canWithdraw = settings.rewardPoints >= 50;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-foreground backdrop-blur-sm">
        <Award className="h-5 w-5 text-primary" />
        <span className="font-semibold">{settings.rewardPoints}</span>
        <span className="text-sm text-muted-foreground">Points</span>
        {canWithdraw && (
          <div className="border-l border-border/50 h-6 mx-2"></div>
        )}
        {canWithdraw && <WithdrawDialog />}
      </div>
    </div>
  );
}
