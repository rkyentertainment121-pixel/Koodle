import { AdBanner } from '@/components/ad-banner';
import { GeometricBackground } from '@/components/common/geometric-background';
import { Logo } from '@/components/logo';
import { Rewards } from '@/components/rewards';
import { SearchForm } from '@/components/search-form';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <GeometricBackground />
      <div className="flex flex-col min-h-screen">
        <header className="p-6 md:p-8 flex justify-between items-center">
          <Link href="/">
            <Logo />
          </Link>
          <Rewards />
        </header>

        <div className="w-full px-4 md:px-8">
          <AdBanner adKey="header-ad" />
        </div>

        <main className="relative z-10 flex flex-col items-center justify-center gap-6 p-4 text-center flex-grow">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-6xl font-bold tracking-tighter text-foreground sm:text-7xl md:text-8xl">
              KOOGLE
            </h1>
            <p className="max-w-md text-base text-muted-foreground md:text-lg">
              Search the web with style — by Kenz Media
            </p>
          </div>
          <SearchForm />
        </main>
        <footer className="w-full p-4 md:p-8">
          <AdBanner adKey="footer-ad" />
        </footer>
      </div>
    </div>
  );
}
