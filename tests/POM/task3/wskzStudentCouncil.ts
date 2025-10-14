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

  //  Extracts the student's name from the page element

  async getName() {
    return this.name.innerText();
  }

  //  Extracts the student's year information from the page element

  async getYear() {
    return this.year.innerText();
  }
}

//  Page Object Model for the student council page
//  Handles retrieval of all student information from the council page

export class StudentsCouncilPage {
  readonly page: Page;
  readonly students: Locator;

  constructor(page: Page) {
    this.page = page;
    this.students = page.locator('div[role="listitem"]');
  }

  //  Retrieves all student items from the page
  //  Iterates through each student element and creates StudentItem objects

  async getAllStudents(): Promise<StudentItem[]> {
    const count = await this.students.count();
    const result: StudentItem[] = [];
    for (let i = 0; i < count; i++) {
      result.push(new StudentItem(this.students.nth(i)));
    }
    return result;
  }

}
