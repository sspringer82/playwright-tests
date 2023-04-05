import { expect, test } from "@playwright/test";

test('create a new book', async ({ page }) => {
  await page.goto('http://localhost:5173/create');

  await page.getByLabel('ISBN:').fill('TestISBN');
  await page.getByLabel('Titel:').fill('TestTitel');
  await page.getByLabel('Autor:').fill('TestAutor');
  await page.getByLabel('Preis:').fill('TestPreis');
  await page.getByLabel('Seiten:').fill('TestSeiten');
  await page.getByLabel('Erscheinungsjahr:').fill('TestJahr');
  await page.getByRole('button').click();

  await expect(page).toHaveURL(/.*list/);

  await expect(page.getByText('TestISBN')).toHaveCount(1);
  await expect(page.getByText('TestTitel')).toHaveCount(1);
  await expect(page.getByText('TestAutor')).toHaveCount(1);
  await expect(page.getByText('TestPreis')).toHaveCount(1);
  await expect(page.getByText('TestSeiten')).toHaveCount(1);
  await expect(page.getByText('TestJahr')).toHaveCount(1);
});