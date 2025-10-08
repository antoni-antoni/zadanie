import { Locator, Page } from '@playwright/test';


export class StudentItem {
  readonly root: Locator;
  readonly name: Locator;
  readonly year: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.name = root.locator('p.font_5.wixui-rich-text__text');
    this.year = root.locator('p.font_8.wixui-rich-text__text:has-text("student")');
  }

  async getName() {
    return this.name.innerText();
  }

  async getYear() {
    return this.year.innerText();
  }
}

export class StudentsCouncilPage {
  readonly page: Page;
  readonly students: Locator;

  constructor(page: Page) {
    this.page = page;
    this.students = page.locator('div[role="listitem"]'); // wszystkie elementy studentów
  }
  async getAllStudents(): Promise<StudentItem[]> {
    const count = await this.students.count();
    const result: StudentItem[] = [];
    for (let i = 0; i < count; i++) {
      result.push(new StudentItem(this.students.nth(i)));
    }
    return result;
  }

}
