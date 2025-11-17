'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdBanner({ adKey }: { adKey: string }) {
  const adRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (!adRef.current || loaded.current) {
      return;
    }

    // Only run if the ad container is on the screen and has a width
    if (adRef.current.offsetWidth > 0) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        loaded.current = true; // Mark as loaded to prevent re-pushing
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [adKey]);

  return (
    <div
      ref={adRef}
      key={adKey}
      className="flex items-center justify-center w-full min-h-[90px] py-4 text-center border-y bg-muted/20 border-dashed"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="YOUR_ADSENSE_CLIENT_ID"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
