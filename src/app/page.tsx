import { GeometricBackground } from '@/components/common/geometric-background';
import { Logo } from '@/components/logo';
import { SearchForm } from '@/components/search-form';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <GeometricBackground />
      <header className="absolute left-0 top-0 p-6 md:p-8">
        <Logo />
      </header>
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center">
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
    </div>
  );
}
