'use client';

import { GeometricBackground } from '@/components/common/geometric-background';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/context/settings-context';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { settings, setSettings } = useSettings();

  const handleSearchEngineChange = (value: string) => {
    setSettings((prev) => ({ ...prev, defaultSearchEngine: value }));
  };

  const handleNewTabChange = (checked: boolean) => {
    setSettings((prev) => ({ ...prev, openInNewTab: checked }));
  };

  return (
    <div className="relative min-h-screen w-full bg-background">
      <GeometricBackground />
      <div className="relative z-10 flex flex-col items-center justify-center p-4 md:p-8">
        <header className="w-full max-w-2xl flex justify-between items-center mb-8">
          <Logo />
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </header>
        <main className="w-full max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Customize your search experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="open-in-new-tab">
                  Open search results in a new tab
                </Label>
                <Switch
                  id="open-in-new-tab"
                  checked={settings.openInNewTab}
                  onCheckedChange={handleNewTabChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="search-engine">Default Search Engine</Label>
                <Select
                  value={settings.defaultSearchEngine}
                  onValueChange={handleSearchEngineChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an engine" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(settings.searchEngines).map(
                      ([key, engine]) => (
                        <SelectItem key={key} value={key}>
                          {engine.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
