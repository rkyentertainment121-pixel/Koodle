'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useSettings } from '@/context/settings-context';
import { useToast } from '@/hooks/use-toast';
import { IndianRupee } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  accountHolder: z.string().min(2, 'Name is too short'),
  accountNumber: z.string().regex(/^\d{9,18}$/, 'Enter a valid account number'),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Enter a valid IFSC code'),
});

export function WithdrawDialog() {
  const { settings, setSettings } = useSettings();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountHolder: '',
      accountNumber: '',
      ifsc: '',
    },
  });

  const canWithdraw = settings.rewardPoints >= 50;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (canWithdraw) {
      setSettings((prev) => ({
        ...prev,
        rewardPoints: prev.rewardPoints - 50,
      }));
      toast({
        title: 'Withdrawal Successful!',
        description: `₹10 has been sent to ${values.accountHolder}.`,
      });
      setOpen(false); // Close the dialog
      form.reset(); // Reset form
    } else {
      toast({
        variant: 'destructive',
        title: 'Insufficient Points',
        description: 'You need at least 50 points to withdraw.',
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <IndianRupee className="mr-2 h-4 w-4" />
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Rewards</DialogTitle>
        </DialogHeader>
        <div className="mb-4 rounded-lg bg-secondary p-4 text-center">
          <p className="text-lg font-semibold">
            You are withdrawing 50 points for{' '}
            <span className="text-primary">₹10</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            Your new balance will be {Math.max(0, settings.rewardPoints - 50)}{' '}
            points.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="accountHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your bank account number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ifsc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your bank's IFSC code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                className="w-full"
                disabled={!canWithdraw}
              >
                {canWithdraw ? 'Withdraw ₹10' : 'Insufficient Points'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
