import { ReactElement, createElement } from 'react';
import { TemplateProps, TemplateType } from './types';
import HeroTemplate from '@/templates/HeroTemplate';
import SplitTemplate from '@/templates/SplitTemplate';

// Use dynamic import for server-side rendering only
async function renderToStaticMarkup(element: ReactElement): Promise<string> {
  const { renderToStaticMarkup: renderFn } = await import('react-dom/server');
  return renderFn(element);
}

/**
 * Render a template component to HTML string
 */
export async function renderTemplateToHTML(props: TemplateProps): Promise<string> {
  const { template } = props;

  let templateComponent: ReactElement;

  if (template === 'hero') {
    templateComponent = createElement(HeroTemplate, props);
  } else if (template === 'split') {
    templateComponent = createElement(SplitTemplate, props);
  } else {
    // Default to hero
    templateComponent = createElement(HeroTemplate, props);
  }

  const htmlContent = await renderToStaticMarkup(templateComponent);

  // Wrap in minimal HTML document with styling
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Flyer</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Roboto:wght@400;500;700&family=Georgia:wght@400;700&display=swap');
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;
}

/**
 * Get template by name
 */
export function getTemplate(templateType: TemplateType) {
  if (templateType === 'hero') {
    return HeroTemplate;
  } else if (templateType === 'split') {
    return SplitTemplate;
  }
  return HeroTemplate;
}
