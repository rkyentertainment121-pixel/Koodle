'use client';

import { useSettings } from '@/context/settings-context';
import { Award, ChevronDown, IndianRupee } from 'lucide-react';
import { WithdrawDialog } from './withdraw-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function Rewards() {
  const { settings } = useSettings();
  const [dialogOpen, setDialogOpen] = useState(false);

  const canWithdraw = settings.rewardPoints >= 50;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-foreground backdrop-blur-sm">
        <Award className="h-5 w-5 text-primary" />
        <span className="font-semibold">{settings.rewardPoints}</span>
        <span className="text-sm text-muted-foreground">Points</span>
        <div className="h-6 border-l border-border/50 mx-2"></div>
        <WithdrawDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1"
                      disabled={!canWithdraw}
                    >
                      Redeem
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                {!canWithdraw && (
                  <TooltipContent>
                    <p>You need at least 50 points to redeem.</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setDialogOpen(true)}
                disabled={!canWithdraw}
              >
                <IndianRupee className="mr-2 h-4 w-4" />
                <span>Withdraw</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </WithdrawDialog>
      </div>
    </div>
  );
}
