import { expect, test } from "@playwright/test";
import { FormPage } from "./form.po.ts";

test('create a new book', async ({ page }) => {
  const formPage = new FormPage(page);

  await formPage.goto();
  await formPage.fillForm();
  await formPage.submitForm();

  await expect(page).toHaveURL(/.*list/);

  await expect(page.getByText('TestISBN')).toHaveCount(1);
  await expect(page.getByText('TestTitel')).toHaveCount(1);
  await expect(page.getByText('TestAutor')).toHaveCount(1);
  await expect(page.getByText('TestPreis')).toHaveCount(1);
  await expect(page.getByText('TestSeiten')).toHaveCount(1);
  await expect(page.getByText('TestJahr')).toHaveCount(1);
});