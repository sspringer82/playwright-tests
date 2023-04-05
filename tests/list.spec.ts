import { expect, test as base } from "@playwright/test";
import { ListPage } from "./list.po.ts";
import { FormPage } from "./form.po.ts";


const test = base.extend<{ listPage: ListPage }>({
  listPage: async ({ page }, use) => {
    const listPage = new ListPage(page);
    const formPage = new FormPage(page);
    await formPage.goto();
    await formPage.fillForm();
    await formPage.submitForm();
    await use(listPage);
    await listPage.remove();
  }
})

test.describe('List', () => {
  test('should render the list', async ({ listPage }) => {
    await listPage.goto();

    await expect(listPage.headline).toHaveText('Bücherliste');
    await expect(listPage.titles).toHaveText('TestTitel');
    await expect(listPage.error).not.toBeVisible();
    await expect(listPage.noData).not.toBeVisible();
  });
});