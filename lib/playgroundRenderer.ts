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
  let browser;
  try {
    // Launch browser with better error handling for deployment environments
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

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
  } catch (error) {
    throw new Error(`Failed to render PNG: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (browser) {
      await browser.close();
    }
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
  let browser;
  try {
    // Launch browser with better error handling for deployment environments
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

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
  } catch (error) {
    throw new Error(`Failed to render PDF: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
