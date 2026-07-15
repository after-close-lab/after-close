import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { memberSchema, recordSchema, reviewSchema } from './lib/schemas';

const members = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/members' }),
  schema: memberSchema
});

const records = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/records' }),
  schema: recordSchema
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: reviewSchema
});

export const collections = { members, records, reviews };
