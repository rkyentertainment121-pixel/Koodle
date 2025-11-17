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
    // This effect attempts to push an ad into the queue.
    // We're wrapping it in a try/catch block to prevent errors
    // in development environments where the Google AdSense script might be blocked.
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
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
        style={{ display: 'block' }}
        data-ad-client="YOUR_ADSENSE_CLIENT_ID" // Replace with your AdSense client ID
        data-ad-slot="YOUR_AD_SLOT_ID"         // Replace with your ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
