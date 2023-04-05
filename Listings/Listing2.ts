import { expect, test } from "@playwright/test";

test.describe('List', () => {
  test('render', async ({ page }) => {
    await page.goto('http://localhost:5173/list');

    const headline = page.getByRole('heading');
    await expect(headline).toHaveText('Bücherliste');

    const titles = page.locator('table > tbody > tr > td:nth-child(2)');
    await expect(titles).toHaveCount(3);
    await expect(titles).toHaveText(["The Hitchhiker's Guide to the Galaxy", '1984', 'The Lord of the Rings']);

    const years = page.getByTestId('year');
    await expect(years).toHaveText(['1979', '1949', '1954'])
  })
})