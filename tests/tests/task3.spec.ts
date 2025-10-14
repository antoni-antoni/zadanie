import { expect, test } from '@playwright/test';
import { NewPage } from '../POM/task3/newPage';
import { InfoHomePage } from '../POM/task3/wskzHomePage';
import { StudentsCouncilPage } from '../POM/task3/wskzStudentCouncil';

test('User navigates from local site to Students Council and gets the information about students @front', async ({ page, context }) => {
    const newPage = new NewPage(page);
    // Navigate to the new page
    await newPage.openNewPage();

    // Handle multi-tab navigation - wait for new tab to open
    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        newPage.clickButtonLink()
    ]);

    const infoHome = new InfoHomePage(newTab);
    const studentsCouncil = new StudentsCouncilPage(newTab);

    // Navigate to student council page
    await infoHome.navigateToStudentCouncil();
    await newTab.waitForLoadState('load');

    // Retrieve and validate student data
    const students = await studentsCouncil.getAllStudents();
    // Verify that students data was actually retrieved
    expect(students.length).toBeGreaterThan(0);
    
    // Log student information for verification
    for (const student of students) {
        console.log(`Name: ${await student.getName()}, Year: ${await student.getYear()}`);
    }
});
