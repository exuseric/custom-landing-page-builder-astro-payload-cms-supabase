import type { ParsedPage } from "./types";
import { parsePage } from "./handle-response";
import type { PageKey } from "./page-keys";
// import { PAGE_ID, DATABASE_URL } from "astro:env/server";

export class LandingPageError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'LandingPageError';
  }
}

/**
 * Fetches and parses a landing page from the API, returning only the specified keys.
 * 
 * @param keys - Array of page keys to include in the response
 * @returns Promise resolving to an object containing only the requested page properties
 * 
 * @example
 * ```typescript
 * const pageData = await fetchPage(
 *   ['title', 'seo', 'blocks', 'navigation']
 * );
 * ```
 */
export async function fetchPage<T extends PageKey>(
  keys: T[],
): Promise<Pick<ParsedPage, T>> {
  try {
    const DATABASE_URL = "https://landing-cms-payload.onrender.com"
    const PAGE_ID = 16
    const res = await fetch(`${DATABASE_URL}/api/page/${PAGE_ID}?depth=2&draft=false&locale=undefined`);
    if (!res.ok) {
      throw new LandingPageError(
        `Failed to fetch landing page: ${res.status} ${res.statusText}`,
        res.status
      );
    }

    const json = await res.json();
    const parsed = parsePage(json);
    // console.log(parsed);

    // Build result object with only requested keys
    const result = {} as Pick<ParsedPage, T>;
    for (const key of keys) {
      result[key] = parsed[key];
    }

    return result;
  } catch (error) {
    if (error instanceof LandingPageError) {
      throw error;
    }
    throw new LandingPageError(`Network or parsing error: ${error}`);
  }
}

// Usage examples:
/*
// Fetch specific page data
const pageData = await fetchPage(
  ['title', 'seo', 'blocks', 'navigation']
);

// Work with specific block types
const heroBlocks = getBlocksByType(pageData.blocks, 'simple-hero');
const contactBlocks = getBlocksByType(pageData.blocks, 'simple-contact');
const testimonialBlocks = getBlocksByType(pageData.blocks, 'simple-testimonial'); // NEW
const contentGridBlocks = getBlocksByType(pageData.blocks, 'content-with-grid'); // NEW

// Access typed block properties
heroBlocks.forEach(hero => {
  console.log(hero.heading); // ✅ TypeScript knows this exists
  console.log(hero.cover.alt); // ✅ TypeScript knows this exists
});

// Work with new testimonial blocks
testimonialBlocks.forEach(testimonial => {
  console.log(testimonial.title); // ✅ "What Clients Are Saying"
  testimonial.testimonies.forEach(t => {
    console.log(t.title); // ✅ Customer name
    console.log(extractLexicalText(t.testimony)); // ✅ Testimonial text
  });
});

// Work with content grid blocks
contentGridBlocks.forEach(grid => {
  console.log(grid.title); // ✅ Grid title
  grid["card grid"].forEach(card => {
    console.log(card.title); // ✅ Card title
    console.log(extractLexicalText(card.body)); // ✅ Card description
  });
});

// Extract text from lexical content in content blocks
const contentBlocks = getBlocksByType(pageData.blocks, 'content-with-media');
contentBlocks.forEach(content => {
  const text = extractLexicalText(content.body);
  console.log(text); // Plain text extracted from lexical format
});
*/