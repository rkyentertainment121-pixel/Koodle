
'use server';

import { generateSearchSuggestions, type SearchSuggestionsInput, type SearchSuggestionsOutput } from '@/ai/flows/ai-powered-search-suggestions';

export async function getSearchSuggestions(input: SearchSuggestionsInput): Promise<SearchSuggestionsOutput> {
  try {
    const output = await generateSearchSuggestions(input);
    return output;
  } catch (error) {
    console.error('Error generating search suggestions:', error);
    // In a real app, you'd want more robust error handling and logging
    return { suggestions: [] };
  }
}
