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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after initial render
    try {
      const item = window.localStorage.getItem('koogle-settings');
      if (item) {
        const parsedItem = JSON.parse(item);
        const mergedSettings = { ...defaultSettings, ...parsedItem };
        Object.keys(mergedSettings).forEach((key) => {
          if (!(key in defaultSettings)) {
            delete (mergedSettings as any)[key];
          }
        });
        setSettings(mergedSettings);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoaded(true); // Mark as loaded
  }, []);

  useEffect(() => {
    // This effect is to keep the local storage in sync with the state
    if (isLoaded) {
      try {
        const settingsToSave = { ...settings };
        // Do not save searchEngines to localStorage
        delete (settingsToSave as any).searchEngines;
        window.localStorage.setItem(
          'koogle-settings',
          JSON.stringify(settingsToSave)
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [settings, isLoaded]);

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
