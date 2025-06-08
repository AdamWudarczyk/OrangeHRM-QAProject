// E2E test cases for OrangeHRM PIM (Personal Information Management) module
// Covers adding, searching, editing, and deleting employees using dynamic test data

import { generateEmployee } from '../../support/seeds/employeeSeed';
import { pimPage } from '../../pages/pim/pimPage';

let employee;

describe('OrangeHRM - PIM Employee Management', () => {
    // Generate unique employee data once before all tests
    before(() => {
        employee = generateEmployee();
    });

    // Before each test: log in once per session and visit Employee List page
    beforeEach(() => {
        cy.session('admin', () => {
            cy.visit('/web/index.php/auth/login');
            cy.get('input[name="username"]').type('Admin');
            cy.get('input[name="password"]').type('admin123');
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/dashboard');
        });

        pimPage.visitEmployeeList();
    });

    // Adds a new employee with generated unique data and verifies the addition
    it('adds a new employee with unique data', () => {
        pimPage.visitAddEmployeeForm();
        pimPage.fillEmployeeForm(employee);
        pimPage.saveForm();
        pimPage.verifyEmployeeName(employee);
    });

    // Searches employee by last name and verifies that search results contain the last name
    it('searches employee by last name', () => {
        pimPage.searchByName(employee.lastName);
        pimPage.getTableRows().should('contain', employee.lastName);
    });

    // Edits an existing employee’s first and last name, saves changes, and verifies update
    it('edits an existing employee\'s last name', () => {
        const updatedFirstName = employee.firstName + '_X';
        const updatedLastName = employee.lastName + '_Edited';

        pimPage.searchByName(employee.lastName);
        cy.wait(1000); // slight delay for search results to settle
        pimPage.editFirstResult();
        pimPage.updateName(updatedFirstName, updatedLastName);
        pimPage.saveForm();

        // Refresh list and search by updated last name to verify changes
        pimPage.visitEmployeeList();
        pimPage.searchByName(updatedLastName);
        pimPage.getTableRows().should('contain', updatedLastName);
    });

    // Deletes an employee by ID, then verifies that no records are found after deletion
    it('deletes an employee', () => {
        pimPage.searchById(employee.employeeId);
        pimPage.deleteFirstResult();
        pimPage.searchById(employee.employeeId);

        // Wait for any loading spinners to disappear before asserting no results
        cy.get('.loading-spinner', { timeout: 10000 }).should('not.exist');

        // Verify that the table indicates no records found
        cy.contains('No Records Found', { timeout: 30000 }).should('be.visible');
    });
});
