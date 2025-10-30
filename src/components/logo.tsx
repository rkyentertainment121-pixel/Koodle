export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        <svg
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7F50" />
              <stop offset="100%" stopColor="#FFC0CB" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          KOOGLE
        </h1>
        <p className="text-xs text-muted-foreground">by Kenz Media</p>
      </div>
    </div>
  );
}
