'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { getSearchSuggestions } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/context/settings-context';

const categories = ['news', 'design', 'react', 'ai', 'docs'];

const formSchema = z.object({
  query: z.string(),
});

export function SearchForm() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { settings, setSettings } = useSettings();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  const queryValue = form.watch('query');

  useEffect(() => {
    if (queryValue.trim().length > 2) {
      const fetchSuggestions = async () => {
        try {
          const result = await getSearchSuggestions({ query: queryValue });
          setSuggestions(result.suggestions);
        } catch (error) {
          console.error('Failed to fetch suggestions:', error);
          setSuggestions([]);
        }
      };

      const handler = setTimeout(() => {
        startTransition(() => {
          fetchSuggestions();
        });
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setSuggestions([]);
    }
  }, [queryValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.query.trim()) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        rewardPoints: prevSettings.rewardPoints + 10,
      }));
      const searchUrl = settings.searchEngines[settings.defaultSearchEngine].url;
      window.open(`${searchUrl}${encodeURIComponent(values.query)}`, '_blank');
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue('query', suggestion);
    setSuggestions([]);
    form.handleSubmit(onSubmit)();
  };

  const handleCategoryClick = (category: string) => {
    const currentQuery = form.getValues('query');
    const newQuery = currentQuery ? `${currentQuery} ${category}` : category;
    form.setValue('query', newQuery, { shouldValidate: true });
    form.setFocus('query');
  };

  return (
    <div className="w-full max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex items-center gap-2">
          <div className="relative flex-grow">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search by Kenz Media"
                      className="h-14 rounded-full bg-card px-6 pr-36 text-base shadow-md transition-all focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              className="absolute right-2 top-1/2 h-11 -translate-y-1/2 rounded-full px-6 text-base"
            >
              Search
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        {(isPending || (suggestions && suggestions.length > 0)) && (
          <div className="absolute top-2 z-20 w-full overflow-hidden rounded-lg border bg-card p-2 shadow-lg">
            {isPending && (!suggestions || suggestions.length === 0) ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ul>
                {suggestions.map((s, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className="w-full rounded-md p-2 text-left hover:bg-accent"
                      onClick={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <Button
            key={cat}
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-transparent bg-card/60 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-card hover:text-foreground"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
}
