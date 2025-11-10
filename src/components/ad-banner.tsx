'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdBanner({ adKey }: { adKey: string }) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && adRef.current.hasChildNodes()) {
      const adContainer = adRef.current.querySelector('ins.adsbygoogle');
      if (adContainer && adContainer.getAttribute('data-adsbygoogle-status') === 'done') {
        return;
      }
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('adsbygoogle.push() error:', err);
    }
  }, [adKey]);

  return (
    <div
      ref={adRef}
      key={adKey}
      className="w-full py-4 text-center border-y bg-background/50"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="YOUR_ADSENSE_CLIENT_ID"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
