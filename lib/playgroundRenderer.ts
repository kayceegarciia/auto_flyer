import { chromium } from 'playwright';

/**
 * Render HTML to PNG buffer using Playwright
 */
export async function renderToPNG(
  htmlContent: string,
  options: {
    width?: number;
    height?: number;
  } = {}
): Promise<Buffer> {
  const browser = await chromium.launch({
    headless: true,
    // Use system default chromium, or specify a path if needed
  });

  try {
    const page = await browser.newPage({
      viewport: {
        width: options.width || 1080,
        height: options.height || 1350,
      },
    });

    // Set content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle',
    });

    // Take screenshot as PNG
    const screenshotBuffer = await page.screenshot({
      type: 'png',
      fullPage: true,
    });

    await page.close();
    return screenshotBuffer as Buffer;
  } finally {
    await browser.close();
  }
}

/**
 * Render HTML to PDF buffer using Playwright
 */
export async function renderToPDF(
  htmlContent: string,
  options: {
    width?: number;
    height?: number;
  } = {}
): Promise<Buffer> {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage({
      viewport: {
        width: options.width || 1080,
        height: options.height || 1350,
      },
    });

    // Set content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle',
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: false,
    });

    await page.close();
    return pdfBuffer as Buffer;
  } finally {
    await browser.close();
  }
}
