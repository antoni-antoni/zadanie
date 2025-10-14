import { Page } from '@playwright/test';

// Handles navigation to external WSKZ website sections
export class InfoHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToStudentCouncil() {
    await this.page.goto("https://info.wskz.pl/samorzad-studencki")
    await this.page.waitForURL('**/samorzad-studencki');
  }
}