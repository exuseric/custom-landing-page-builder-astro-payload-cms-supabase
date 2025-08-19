import { describe, it, expect, assert } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { getData } from '../../src/utils/pocketbase';

const record = await getData();
const directory = `../../build/${record.finalUrl.slice(8)}`
const image_folder = `${directory}/assets`

const htmlPath = path.resolve(__dirname, `${directory}/index.html`);
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;
const languages: Record<string, string> = {
	ke: "en-KE",
	cbv: "pt-cbv",
	mz: "pt-MZ",
	tz: "en-TZ",
	st: "pt-ST",
};

describe('SEO Checklist Tests', () => {
    it('Meta tags validation', () => {
        // Basic meta tags
        const metaTags = {
            viewport: 'meta[name="viewport"]',
            charset: 'meta[charset]',
            language: `html[lang="${languages[record.country]}"]`,
            themeColor: 'meta[name="theme-color"]',
            robots: 'meta[name="robots"]'
        };

        Object.entries(metaTags).forEach(([name, selector]) => {
            const tag = document.querySelector(selector);
            expect(
                tag, 
                `Missing required meta tag: ${name}\nSelector: ${selector}`
            ).not.toBeNull();
        });

        // Verify viewport content
        const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        const viewportContent = viewport.content;
        expect(
            viewportContent, 
            `Invalid viewport content: ${viewportContent}\nExpected to contain: width=device-width`
        ).toContain('width=device-width');
        expect(
            viewportContent, 
            `Invalid viewport content: ${viewportContent}\nExpected to contain: initial-scale=1`
        ).toContain('initial-scale=1');
    });

    it('Title and meta description optimization', () => {
        const title = document.querySelector('title') as HTMLTitleElement;
        const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;

        // Title checks
        expect(
            title, 
            'Missing title tag in document'
        ).not.toBeNull();
        expect(
            title.textContent?.length, 
            `Title length (${title.textContent?.length}) is too short. Must be > 10 characters\nCurrent title: "${title.textContent}"`
        ).toBeGreaterThan(10);
        expect(
            title.textContent?.length, 
            `Title length (${title.textContent?.length}) is too long. Must be ≤ 60 characters\nCurrent title: "${title.textContent}"`
        ).toBeLessThanOrEqual(60);
        expect(
            title.textContent, 
            `Title must contain record title\nCurrent title: "${title.textContent}"\nExpected to contain: "${record.title}"`
        ).toContain(record.title);

        // Meta description checks
        expect(
            metaDesc, 
            'Missing meta description tag'
        ).not.toBeNull();
        expect(
            metaDesc.content.length, 
            `Meta description length (${metaDesc.content.length}) is too short. Must be > 50 characters\nCurrent description: "${metaDesc.content}"`
        ).toBeGreaterThan(50);
        expect(
            metaDesc.content.length, 
            `Meta description length (${metaDesc.content.length}) is too long. Must be ≤ 160 characters\nCurrent description: "${metaDesc.content}"`
        ).toBeLessThanOrEqual(160);
        expect(
            metaDesc.content, 
            `Meta description contains undefined\nCurrent description: "${metaDesc.content}"`
        ).not.toContain('undefined');
    });

    it('Social media meta tags validation', () => {
        // Open Graph
        const ogTags = {
            title: 'meta[property="og:title"]',
            description: 'meta[property="og:description"]',
            image: 'meta[property="og:image"]',
            url: 'meta[property="og:url"]',
            type: 'meta[property="og:type"]',
            siteName: 'meta[property="og:site_name"]'
        };

        // Twitter Cards
        const twitterTags = {
            card: 'meta[name="twitter:card"]',
            title: 'meta[name="twitter:title"]',
            description: 'meta[name="twitter:description"]',
            image: 'meta[name="twitter:image"]'
        };

        // Verify all OG tags
        Object.entries(ogTags).forEach(([name, selector]) => {
            const tag = document.querySelector(selector) as HTMLMetaElement;
            expect(
                tag, 
                `Missing OpenGraph tag: og:${name}\nSelector: ${selector}`
            ).not.toBeNull();
            expect(
                tag.content, 
                `Empty OpenGraph content: og:${name}\nSelector: ${selector}`
            ).not.toBe('');
        });

        // Verify all Twitter tags
        Object.entries(twitterTags).forEach(([name, selector]) => {
            const tag = document.querySelector(selector) as HTMLMetaElement;
            expect(
                tag, 
                `Missing Twitter Card tag: twitter:${name}\nSelector: ${selector}`
            ).not.toBeNull();
            expect(
                tag.content, 
                `Empty Twitter Card content: twitter:${name}\nSelector: ${selector}`
            ).not.toBe('');
        });
    });

    it('Image optimization', () => {
        const images = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
        
        images.forEach((img) => {
            const src = img.getAttribute('src') || 'unknown';
            const loading = img.getAttribute('loading')
            // Alt text checks
            expect(img.hasAttribute('alt'), `Image ${src} missing alt text`).toBe(true);
            const altText = img.getAttribute('alt');
            expect(altText?.trim().length, `Image ${src} has empty alt text`).toBeGreaterThan(0);
            
            // Lazy loading - skip logo and eager images
            const isEager = img.getAttribute('data-eager') === 'true' || src.includes('logo');
            if (!isEager) {
                expect(loading, `Image ${src} should have lazy loading`).toBe('lazy');
            }
            
            // Responsive images
            const hasResponsiveFeature = 
                img.hasAttribute('srcset') || 
                img.hasAttribute('sizes') || 
                img.closest('picture') !== null;
            expect(hasResponsiveFeature, `Image ${src} should be responsive`).toBe(true);
        });
    });

    it('Performance optimization checks', () => {
        // Check for render-blocking resources
        const renderBlockingStyles = document.querySelectorAll('link[rel="stylesheet"]:not([media="print"])');
        expect(
            renderBlockingStyles.length, 
            `Too many render-blocking stylesheets (${renderBlockingStyles.length}). Maximum allowed: 2`
        ).toBeLessThan(3);

        // Check for preconnect/prefetch
        const preconnectTags = document.querySelectorAll('link[rel="preconnect"]');
        expect(
            preconnectTags.length, 
            'No preconnect tags found. Add preconnect for external resources'
        ).toBeGreaterThan(0);

        // Check for critical CSS
        const inlineStyles = document.querySelectorAll('style');
        expect(
            inlineStyles.length, 
            'No inline styles found. Consider adding critical CSS'
        ).toBeGreaterThan(0);
    });
});

describe('Quality Analysis Tests', () => {
    it('Headings Hierachy', () => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        
        headings.forEach((heading) => {
            const currentLevel = parseInt(heading.tagName.charAt(1));
            const headingText = heading.textContent?.trim();
            expect(
                currentLevel, 
                `Invalid heading hierarchy - ${heading.tagName} "${headingText}"\nPrevious level: ${previousLevel}, Current level: ${currentLevel}`
            ).toBeLessThanOrEqual(previousLevel + 1);
            previousLevel = currentLevel;
            
            expect(
                heading.textContent?.trim().length, 
                `Empty heading found - ${heading.tagName}`
            ).toBeGreaterThan(0);
        });
    });

    it('Link accessibility and usability', () => {
        const links = document.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
        
        links.forEach((link) => {
            const href = link.getAttribute('href');
            const text = link.textContent?.trim();
            const ariaLabel = link.getAttribute('aria-label')?.trim();
            const debugInfo = `Link [href: ${href}, text: "${text}", aria-label: "${ariaLabel}"]`;
            
            expect(
                href, 
                `Missing href attribute - ${debugInfo}`
            ).not.toBeNull();

            // Check if either text content or aria-label is present
            const hasAccessibleName = (text ?? '').length > 0 || (ariaLabel ?? '').length > 0;
            expect(
                hasAccessibleName,
                `Link has no accessible name (needs either text content or aria-label) - ${debugInfo}`
            ).toBe(true);
            
            if (href?.startsWith('http')) {
                expect(
                    link.getAttribute('rel'), 
                    `Missing rel="noopener" on external link - ${debugInfo}`
                ).toContain('noopener');
                expect(
                    link.getAttribute('target'), 
                    `Missing target="_blank" on external link - ${debugInfo}`
                ).toBe('_blank');
            }
        });
    });

    it('Email link has subject', () => { 
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach((link) => {
            const href = link.getAttribute('href');
            expect(
                href?.includes('subject='),
                `Email link missing subject - Link: ${href}`
            ).toBe(true);
        });
    })

    it('Checks if the OG image logo matches existing logos', () => { 
        const ogImageTag = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
        const ogImageUrl = ogImageTag?.content;

        if (!ogImageUrl) {
            throw new Error('OG image URL not found');
        }

        const assetDir = path.resolve(__dirname, `q${image_folder}`);
        const logoFiles = fs.readdirSync(assetDir).filter(file => file.toLowerCase().includes('logo'));

        let matchFound = false;
        for (const logoFile of logoFiles) {
            const logoPath = path.join(assetDir, logoFile);
            const logoContent = fs.readFileSync(logoPath);
            
            if (ogImageUrl.includes(logoFile) || Buffer.from(ogImageUrl).equals(new Uint8Array(logoContent))) {
                matchFound = true;
                break;
            }
        }

        expect(matchFound, `OG image (${ogImageUrl}) does not match any logo in the assets directory`).toBe(true);
    })

    it('Form validation', () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach((form, index) => {
            const formDebug = `Form #${index + 1}`;
            
            expect(
                form.getAttribute('action'), 
                `Missing action attribute - ${formDebug}`
            ).not.toBeNull();
            expect(
                form.getAttribute('method'), 
                `Missing method attribute - ${formDebug}`
            ).not.toBeNull();
            
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach((input) => {
                const inputId = input.id || 'unknown';
                const inputType = input.getAttribute('type') || input.tagName.toLowerCase();
                const inputDebug = `${formDebug} - Input [id: ${inputId}, type: ${inputType}]`;
                
                const label = form.querySelector(`label[for="${input.id}"]`);
                expect(
                    label, 
                    `Missing associated label - ${inputDebug}`
                ).not.toBeNull();
            });
        });
    });

    it('Mobile responsiveness indicators', () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        expect(
            viewport?.getAttribute('content'),
            'Invalid viewport meta tag content'
        ).toContain('width=device-width,initial-scale=1');

        const containers = document.querySelectorAll('.container, .wrapper');
        containers.forEach((container, index) => {
            const style = dom.window.getComputedStyle(container);
            const classes = (container as HTMLElement).className;
            expect(
                style.maxWidth,
                `Container #${index + 1} [classes: ${classes}] has no max-width set`
            ).not.toBe('none');
        });
    });

    it('Performance indicators', () => {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (!src) return;
            
            expect(
                script.hasAttribute('async') || script.hasAttribute('defer'),
                `External script missing async/defer attribute\nScript src: ${src}`
            ).toBe(true);
        });

        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src') || '';
            const classes = img.getAttribute('class') || 'no-class';
            const debugInfo = `Image [src: ${src}, class: ${classes}]`;
            
            expect(
                src.endsWith('.webp') || src.endsWith('.avif'),
                `Image not using modern format - ${debugInfo}\nExpected: .webp or .avif format`
            ).toBe(true);
        });
    });
});

describe('Accessibility Tests', () => {
    it('Toggle button should have toggle aria-expanded', () => { 
        const toggleButton = document.querySelector('[data-menu-toggle]') as HTMLButtonElement;
        const hasAriaExpanded = toggleButton.hasAttribute('aria-expanded');
        const buttonText = toggleButton?.textContent?.trim() || 'unknown';
        
        expect(
            hasAriaExpanded,
            `Menu toggle button missing aria-expanded attribute\nButton text: "${buttonText}"\nSelector: [data-menu-toggle]`
        ).toBe(true);
    });
});
