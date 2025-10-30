'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing search results.
 *
 * - summarizeSearchResults - A function that takes a query and search results, and returns a concise summary.
 * - SummarizeSearchResultsInput - The input type for the summarizeSearchResults function.
 * - SummarizeSearchResultsOutput - The return type for the summarizeSearchResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSearchResultsInputSchema = z.object({
  query: z.string().describe('The search query.'),
  searchResults: z.array(z.string()).describe('The list of top search results.'),
});
export type SummarizeSearchResultsInput = z.infer<
  typeof SummarizeSearchResultsInputSchema
>;

const SummarizeSearchResultsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the search results.'),
});
export type SummarizeSearchResultsOutput = z.infer<
  typeof SummarizeSearchResultsOutputSchema
>;

export async function summarizeSearchResults(
  input: SummarizeSearchResultsInput
): Promise<SummarizeSearchResultsOutput> {
  return summarizeSearchResultsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSearchResultsPrompt',
  input: {schema: SummarizeSearchResultsInputSchema},
  output: {schema: SummarizeSearchResultsOutputSchema},
  prompt: `You are an AI expert in summarizing search results.

  Summarize the following search results for the query "{{query}}".  The summary should be concise and focus on providing a general overview of the results.

  Search Results:
  {{#each searchResults}}- {{{this}}}
  {{/each}}`,
});

const summarizeSearchResultsFlow = ai.defineFlow(
  {
    name: 'summarizeSearchResultsFlow',
    inputSchema: SummarizeSearchResultsInputSchema,
    outputSchema: SummarizeSearchResultsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
