import { Page } from '@playwright/test';

export class InfoHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToStudentCouncil() {
    this.page.goto("https://info.wskz.pl/samorzad-studencki")
    await this.page.waitForURL('**/samorzad-studencki');
  }
}