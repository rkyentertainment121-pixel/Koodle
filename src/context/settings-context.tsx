'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type SearchEngine = {
  name: string;
  url: string;
};

type SearchEngines = {
  [key: string]: SearchEngine;
};

type Settings = {
  defaultSearchEngine: keyof SearchEngines;
  searchEngines: SearchEngines;
  rewardPoints: number;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const defaultSettings: Settings = {
  defaultSearchEngine: 'bing',
  searchEngines: {
    bing: { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    google: { name: 'Google', url: 'https://www.google.com/search?q=' },
    duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    yahoo: { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=' },
  },
  rewardPoints: 0,
};

const SettingsContext =
  createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    // Award 10 points on the first visit of the session.
    const hasBeenAwarded = sessionStorage.getItem('daily_reward');
    if (!hasBeenAwarded) {
      setSettings((prev) => ({ ...prev, rewardPoints: prev.rewardPoints + 10 }));
      sessionStorage.setItem('daily_reward', 'true');
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
