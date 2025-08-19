/**
 * Generates a clean domain-friendly string from a business title by removing 
 * punctuation, business suffixes, and formatting for subdomain use.
 * 
 * The function performs the following transformations:
 * 1. Converts to lowercase
 * 2. Replaces '&' with 'and'
 * 3. Removes punctuation and symbols
 * 4. Removes common business suffix words (co, inc, llc, etc.)
 * 5. Removes all non-alphanumeric characters
 * 
 * @param {string} title - The business or organization title to convert
 * @returns {string} A clean, alphanumeric string suitable for use as a subdomain
 * 
 * @example
 * // Basic company name
 * generateUrl("Acme Corp") // returns "acme"
 * 
 * @example  
 * // Name with punctuation and ampersand
 * generateUrl("Smith & Jones, LLC") // returns "smithandjones"
 * 
 * @example
 * // Complex business name
 * generateUrl("ABC Consulting Services, Inc.") // returns "abc"
 * 
 * @example
 * // Name with multiple suffixes
 * generateUrl("Global Tech Solutions Group") // returns "globaltech"
 */

import { companyDomains, companyNames, companyUrls } from "./company-info";

type ParamType = {
    title?: string;
    country: string;
}

const businessSuffixes = [
    'co', 'corp', 'corporation', 'ltd', 'limited', 'inc',
    'incorporated', 'llc', 'plc', 'gmbh', 'sa', 'lda', 'sarl',
    'unipessoal', 'pty', 'pvt', 'partners', 'group',
    'holdings', 'enterprises', 'solutions', 'services', 'consulting',
    'consultants', 'lawyers', 'law', 'firm'
];

export function generateUrl({ title, country }: ParamType): string {
    const subdomain = title!
        .toLowerCase()
        // Replace & with 'and' first
        .replace(/&/g, ' and ')
        // Remove decorative punctuation and symbols first
        .replace(/[.'&\-,;:!?()[\]{}"|]/g, ' ')
        // Clean up extra spaces
        .replace(/\s+/g, ' ')
        .trim()
        // Remove specific business suffix words
        .split(' ')
        .filter(word => {
            return !businessSuffixes.includes(word.toLowerCase());
        })
        .join('')
        // Remove any remaining non-alphanumeric characters
        .replace(/[^\w]/g, '');

    const url = `https://${subdomain}.${companyDomains[country]}`

    return url
}

export function getParentUrl({ country }: ParamType): string {
    const url = companyUrls[country.toLowerCase()];
    if (!url) {
        throw new Error(`No URL found for country code: ${country}`);
    }
    return url;
}

export function getCompanyName({ country }: ParamType): string {
    const name = companyNames[country.toLowerCase()];
    if (!name) {
        throw new Error(`No company name found for country code: ${country}`);
    }
    return name;
}