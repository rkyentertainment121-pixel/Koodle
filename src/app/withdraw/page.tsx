
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSettings } from '@/context/settings-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GeometricBackground } from '@/components/common/geometric-background';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  accountHolder: z.string().min(2, 'Name is too short'),
  accountNumber: z.string().regex(/^\d{9,18}$/, 'Enter a valid account number'),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Enter a valid IFSC code'),
});

export default function WithdrawPage() {
  const { settings, setSettings } = useSettings();
  const { toast } = useToast();
  const router = useRouter();

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
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Insufficient Points',
        description: 'You need at least 50 points to withdraw.',
      });
    }
  }

  return (
    <div className="relative min-h-screen w-full">
      <GeometricBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <CardTitle>Withdraw Rewards</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 rounded-lg bg-secondary p-4 text-center">
              <p className="text-lg font-semibold">
                You are withdrawing 50 points for{' '}
                <span className="text-primary">₹10</span>.
              </p>
              <p className="text-sm text-muted-foreground">
                Your new balance will be {Math.max(0, settings.rewardPoints - 50)} points.
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
                        <Input placeholder="Enter your bank account number" {...field} />
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
                        <Input placeholder="Enter your bank's IFSC code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={!canWithdraw}>
                  {canWithdraw ? 'Withdraw ₹10' : 'Insufficient Points'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
