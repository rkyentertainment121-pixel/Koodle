import { GeometricBackground } from '@/components/common/geometric-background';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <GeometricBackground />
      <div className="relative z-10 flex flex-col items-center justify-center p-4 md:p-8">
        <header className="w-full max-w-4xl flex justify-between items-center mb-8">
            <Logo />
            <Button variant="outline" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </header>
        <main className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Welcome to Koogle. By using our services, you agree to the
                following terms and conditions. Please read them carefully.
              </p>
              <h3 className="font-semibold text-lg text-foreground pt-4">1. Reward Points</h3>
              <p>
                Reward points are awarded for activities such as opening the app and performing searches.
                Points are not transferable and have no cash value until redeemed.
              </p>

              <h3 className="font-semibold text-lg text-foreground pt-4">2. Redemption</h3>
              <p>
                You must accumulate a minimum of 50 points to be eligible for withdrawal.
                The current redemption rate is 50 points for ₹10. This rate is subject to change without notice.
                Withdrawals are processed to the bank account details you provide. Kenz Media is not responsible for payments made to incorrect account details.
              </p>

              <h3 className="font-semibold text-lg text-foreground pt-4">3. User Conduct</h3>
              <p>
                You agree not to use our service for any unlawful purpose or to engage in any activity that could harm the service or its users.
                Any attempt to manipulate the reward system through automated means or other fraudulent activities will result in account suspension and forfeiture of all points.
              </p>

              <h3 className="font-semibold text-lg text-foreground pt-4">4. Disclaimer</h3>
              <p>
                The service is provided "as is" without any warranties. Kenz Media disclaims all warranties, whether express or implied, including the warranty of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
