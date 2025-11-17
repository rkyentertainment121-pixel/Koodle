'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/settings-context';
import { useToast } from '@/hooks/use-toast';
import { Award, IndianRupee } from 'lucide-react';

export function Rewards() {
  const { settings, setSettings } = useSettings();
  const { toast } = useToast();

  const canWithdraw = settings.rewardPoints >= 50;

  const handleWithdraw = () => {
    if (canWithdraw) {
      setSettings((prev) => ({
        ...prev,
        rewardPoints: prev.rewardPoints - 50,
      }));
      toast({
        title: 'Withdrawal Successful!',
        description: 'You have received ₹10.',
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-foreground backdrop-blur-sm">
        <Award className="h-5 w-5 text-primary" />
        <span className="font-semibold">{settings.rewardPoints}</span>
        <span className="text-sm text-muted-foreground">Points</span>
      </div>
      {canWithdraw && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm">
              <IndianRupee className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to exchange 50 points for ₹10? Your new
                balance will be {settings.rewardPoints - 50} points.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleWithdraw}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
