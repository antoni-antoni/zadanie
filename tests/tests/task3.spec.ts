import { test } from '@playwright/test';
import { NewPage } from '../POM/task3/newPage';
import { InfoHomePage } from '../POM/task3/wskzHomePage';
import { StudentsCouncilPage } from '../POM/task3/wskzStudentCouncil';

test('User navigates from local site to Students Council and gets the information about students', async ({ page, context }) => {
    const newPage = new NewPage(page);
    await newPage.openNewPage();

    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        newPage.clickButtonLink()
    ]);

    const infoHome = new InfoHomePage(newTab);
    const studentsCouncil = new StudentsCouncilPage(newTab);

    await infoHome.navigateToStudentCouncil();
    await newTab.waitForLoadState('load');

    const students = await studentsCouncil.getAllStudents();
    for (const student of students) {
        console.log(`Name: ${await student.getName()}, Year: ${await student.getYear()}`);
    }
});
