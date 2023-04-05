import { Locator, Page } from "@playwright/test";

export class ListPage {
  public headline: Locator;
  public titles: Locator;
  public noData: Locator;
  public error: Locator;

  constructor(private readonly page: Page) {
    this.headline = page.getByRole('heading');
    this.titles = page.getByTestId('title');
    this.noData = page.getByTestId('no-data');
    this.error = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/list');
  }

  async remove() {
    await this.page.getByTestId('delete').click();
  }
}
