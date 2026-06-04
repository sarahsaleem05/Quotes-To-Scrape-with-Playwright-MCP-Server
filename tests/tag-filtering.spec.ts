import { test, expect } from '@playwright/test';

const baseURL = 'https://quotes.toscrape.com';
const tagName = 'love';

test.describe('Tag Filtering', () => {
  test('filters quotes by a selected tag and shows only matching quotes', async ({ page }) => {
    await page.goto(baseURL);
    const tagLink = page.locator('.tag', { hasText: tagName }).first();
    await expect(tagLink).toBeVisible();
    await tagLink.click();

    await expect(page).toHaveURL(new RegExp(`/tag/${tagName}(/|/page/1/)?$`));
    const quoteCards = page.locator('.quote');
    await expect(quoteCards.first()).toBeVisible();

    const count = await quoteCards.count();
    for (let i = 0; i < count; i++) {
      await expect(quoteCards.nth(i).locator('.tag')).toContainText([tagName]);
    }
  });

  test('supports pagination on a tag page and returns to the home page', async ({ page }) => {
    await page.goto(`${baseURL}/tag/${tagName}/`);
    const nextLink = page.locator('.pager a', { hasText: 'Next' });
    await expect(nextLink).toBeVisible();
    await nextLink.click();

    await expect(page).toHaveURL(new RegExp(`/tag/${tagName}/page/2/`));
    const quoteCards = page.locator('.quote');
    await expect(quoteCards.first()).toBeVisible();

    await page.getByRole('link', { name: 'Quotes to Scrape' }).click();
    await expect(page).toHaveURL(`${baseURL}/`);
    await expect(page.locator('.quote').first()).toBeVisible();
  });
});
