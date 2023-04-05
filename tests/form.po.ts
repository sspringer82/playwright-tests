import { Locator, Page } from "@playwright/test";

export class FormPage {
  private ISBN: Locator;
  private title: Locator;
  private author: Locator;
  private price: Locator;
  private pages: Locator;
  private year: Locator;
  private submitButton: Locator;

  constructor(private readonly page: Page) {
    this.ISBN = page.getByLabel('ISBN:');
    this.title = page.getByLabel('Titel:');
    this.author = page.getByLabel('Autor:');
    this.price = page.getByLabel('Preis:');
    this.pages = page.getByLabel('Seiten:');
    this.year = page.getByLabel('Erscheinungsjahr:');
    this.submitButton = page.getByRole('button');
  }

  async goto() {
    await this.page.goto('http://localhost:5173/create');
  }

  async fillForm(data = { ISBN: 'TestISBN', title: 'TestTitel', author: 'TestAutor', price: 'TestPreis', pages: 'TestSeiten', year: 'TestJahr' }) {
    await this.ISBN.fill(data.ISBN);
    await this.title.fill(data.title);
    await this.author.fill(data.author);
    await this.price.fill(data.price);
    await this.pages.fill(data.pages);
    await this.year.fill(data.year);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}