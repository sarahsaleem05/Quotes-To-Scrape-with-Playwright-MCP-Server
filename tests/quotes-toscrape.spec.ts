import { test, expect } from '@playwright/test';

const baseURL = 'https://quotes.toscrape.com';

test.describe('Quotes to Scrape main flows', () => {
  test('home page loads and title is correct', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Quotes to Scrape/);
    await expect(page.getByRole('heading', { name: 'Quotes to Scrape' })).toBeVisible();
  });

  test('quote cards display required content', async ({ page }) => {
    await page.goto(baseURL);
    const quoteCards = page.locator('.quote');
    await expect(quoteCards.first()).toBeVisible();
    const quoteCount = await quoteCards.count();
    expect(quoteCount).toBeGreaterThan(0);

    const firstQuote = quoteCards.first();
    await expect(firstQuote.locator('.text')).toBeVisible();
    await expect(firstQuote.locator('.author')).toBeVisible();
    const tagCount = await firstQuote.locator('.tag').count();
    expect(tagCount).toBeGreaterThan(0);
  });

  test('pagination controls appear on home page', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page.locator('.pager')).toBeVisible();
    await expect(page.locator('.pager >> text=Next')).toBeVisible();
  });

  test('tag list displays on home page and navigates to a tag page', async ({ page }) => {
    await page.goto(baseURL);
    const tagLink = page.locator('.tag').first();
    await expect(tagLink).toBeVisible();
    await tagLink.click();

    await expect(page).toHaveURL(/\/tag\/.+\//);
    await expect(page.locator('.quote')).toBeVisible();
  });

  test('open author details from a quote card and return home', async ({ page }) => {
    await page.goto(baseURL);
    const authorLink = page.locator('.quote .author').first();
    await expect(authorLink).toBeVisible();
    await authorLink.click();

    await expect(page).toHaveURL(/\/author\//);
    await expect(page.getByRole('heading', { name: /.+/ })).toBeVisible();

    await page.getByRole('link', { name: 'Quotes to Scrape' }).click();
    await expect(page).toHaveURL(baseURL + '/');
  });
});
