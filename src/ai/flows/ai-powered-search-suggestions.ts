'use server';
/**
 * @fileOverview An AI-powered search suggestions flow.
 *
 * - generateSearchSuggestions - A function that generates AI-powered search suggestions.
 * - SearchSuggestionsInput - The input type for the generateSearchSuggestions function.
 * - SearchSuggestionsOutput - The return type for the generateSearchSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchSuggestionsInputSchema = z.object({
  query: z.string().describe('The user search query.'),
});
export type SearchSuggestionsInput = z.infer<typeof SearchSuggestionsInputSchema>;

const SearchSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of search suggestions.'),
});
export type SearchSuggestionsOutput = z.infer<typeof SearchSuggestionsOutputSchema>;

export async function generateSearchSuggestions(input: SearchSuggestionsInput): Promise<SearchSuggestionsOutput> {
  return generateSearchSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchSuggestionsPrompt',
  input: {schema: SearchSuggestionsInputSchema},
  output: {schema: SearchSuggestionsOutputSchema},
  prompt: `You are an AI assistant that provides search suggestions based on the user's query.

  Given the following search query:
  {{query}}

  Generate an array of diverse and relevant search suggestions that can help the user refine their search and find more relevant results.  The suggestions should be no more than 3 words each.
  Return the suggestions as a JSON array of strings.
  `,
});

const generateSearchSuggestionsFlow = ai.defineFlow(
  {
    name: 'searchSuggestionsFlow',
    inputSchema: SearchSuggestionsInputSchema,
    outputSchema: SearchSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
