import { expect, test } from "@playwright/test";

test.describe('List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/list');
  });

  test('fetch data from Server', async ({ page }) => {
    await page.route(/books/, async route => {
      const json = [{
        "ISBN": "978-3-86680-192-9",
        "title": "The Hitchhiker's Guide to the Galaxy",
        "author": "Douglas Adams",
        "price": 9.99,
        "pages": 224,
        "year": 1979
      }];
      await route.fulfill({ json })
    });

    const titles = page.getByTestId('title');
    await expect(titles).toHaveCount(1);
    await expect(titles).toHaveText("The Hitchhiker's Guide to the Galaxy")

    await expect(page.getByTestId('no-data')).not.toBeVisible();
    await expect(page.getByTestId('error')).not.toBeVisible();
  });

  test('fetch empty data from Server', async ({ page }) => {
    await page.route(/books/, async route => {
      await route.fulfill({ json: [] })
    });
    await expect(page.getByTestId('no-data')).toHaveText('Es sind keine Datensätze vorhanden');

    const titles = page.getByTestId('title');
    await expect(titles).toHaveCount(0);
    await expect(page.getByTestId('error')).not.toBeVisible();
  });

  test('fetch with error', async ({ page }) => {
    await page.route(/books/, async route => {
      await route.fulfill({ status: 500, body: 'Internal Server Error' });
    });
    await expect(page.getByTestId('error')).toHaveText('Es ist ein Fehler aufgetreten');

    const titles = page.getByTestId('title');
    await expect(titles).toHaveCount(0);
    await expect(page.getByTestId('no-data')).not.toBeVisible()
  });
});