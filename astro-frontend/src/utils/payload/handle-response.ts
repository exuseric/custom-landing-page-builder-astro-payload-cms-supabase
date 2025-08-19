import type { ParsedPage, Block, RawPageData, LexicalContent } from './types';
import { extractLexicalText } from './helpers';
// function extractLexicalText(lexicalContent: LexicalContent | null | undefined): string {
//   if (!lexicalContent?.root?.children) return "";
  
//   try {
//     return lexicalContent.root.children
//       .flatMap(paragraph => 
//         paragraph.children?.map(node => node.text) || []
//       )
//       .filter(Boolean)
//       .join("\n\n");
//   } catch (error) {
//     console.warn('Failed to extract lexical text:', error);
//     return "";
//   }
// }

function isValidBlock(block: any): block is Block {
  return block && 
         typeof block === 'object' && 
         typeof block.id === 'string' && 
         typeof block.blockType === 'string';
}

export function parsePage(raw: RawPageData): ParsedPage {
  const blocks: Block[] = [];

  const pushBlockArray = (arr: any[] = []) => {
    if (!Array.isArray(arr)) return;
    
    arr.forEach((block) => {
      if (isValidBlock(block)) {
        blocks.push(block);
      }
    });
  };

  // Process all block sections - order matters for display
  // NOTE: When new block sections are added to the CMS (Page.ts), add them here
  pushBlockArray(raw.hero);
  pushBlockArray(raw["why choose us"]);
  pushBlockArray(raw.content);
  pushBlockArray(raw["call to action"]);
  pushBlockArray(raw.contact);
  
  /*
   * GUIDE FOR ADDING NEW BLOCK SECTIONS:
   * 
   * If the CMS adds new top-level block sections (like "testimonials", "gallery", etc.),
   * add them to the processing above:
   * 
   * pushBlockArray(raw.testimonials);
   * pushBlockArray(raw.gallery);
   * 
   * Also update the RawPageData type in types.ts to include the new optional fields:
   * 
   * testimonials?: Block[];
   * gallery?: Block[];
   * 
   * The order of pushBlockArray calls determines the order blocks appear in the
   * final blocks array, which affects display order on the frontend.
   */

  return {
    id: raw.id,
    title: raw.title || '',
    url: raw.url || '',
    country: raw.country || '',
    themeColor: raw["theme color"] || '',
    coreValues: raw["core values"],

    seo: {
      metaTitle: raw.seo?.["meta title"] || "",
      metaDescription: raw.seo?.["meta description"] || "",
      analytics: raw.seo?.analytics || "",
      searchConsole: raw.seo?.["search console"] || "",
    },

    navigation: {
      logo: raw.navigation?.logo || { url: '' },
      menuItems: (raw.navigation?.menuItems || []).map((item) => ({
        id: item.id,
        name: item["anchor name"] || '',
        anchorId: item["anchor id"] || '',
        style: item.style || 'default',
      })),
    },

    operatingHours: extractLexicalText(raw["operating hours"]),
    socialLinks: raw["social links"] || [],
    blocks,
    footerStyle: raw["footer style"] || 'default',
    companyUrl: raw["Company url"] || '',
    companyName: raw["Company Name"] || '',
    updatedAt: raw.updatedAt,
    createdAt: raw.createdAt,
  };
}