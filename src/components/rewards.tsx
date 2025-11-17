
'use client';

import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/settings-context';
import { Award, IndianRupee } from 'lucide-react';
import Link from 'next/link';

export function Rewards() {
  const { settings } = useSettings();

  const canWithdraw = settings.rewardPoints >= 50;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-foreground backdrop-blur-sm">
        <Award className="h-5 w-5 text-primary" />
        <span className="font-semibold">{settings.rewardPoints}</span>
        <span className="text-sm text-muted-foreground">Points</span>
      </div>
      {canWithdraw && (
        <Link href="/withdraw" passHref>
          <Button size="sm">
            <IndianRupee className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
        </Link>
      )}
    </div>
  );
}
