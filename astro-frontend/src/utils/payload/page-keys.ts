export const pageKeys = [
  "id",
  "title", 
  "url",
  "country",
  "themeColor",
  "coreValues",
  "seo",
  "navigation",
  "operatingHours",
  "socialLinks",
  "blocks",
  "footerStyle",
  "companyUrl",
  "companyName",
  "updatedAt",
  "createdAt",
  "companyUrl",
  "companyName"
] as const;

export type PageKey = typeof pageKeys[number];