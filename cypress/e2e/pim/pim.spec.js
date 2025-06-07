import { generateEmployee } from '../../support/seeds/employeeSeed';
import { pimPage } from '../../pages/pim/pimPage';

let employee;

describe('OrangeHRM - PIM Employee Management', () => {
    before(() => {
        employee = generateEmployee();
    });

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

    it('adds a new employee with unique data', () => {
        pimPage.visitAddEmployeeForm();
        pimPage.fillEmployeeForm(employee);
        pimPage.saveForm();
        pimPage.verifyEmployeeName(employee);
    });

    it('searches employee by last name', () => {
        pimPage.searchByName(employee.lastName);
        pimPage.getTableRows().should('contain', employee.lastName);
    });

    it('edits an existing employee\'s last name', () => {
        const updatedFirstName = employee.firstName + '_X';
        const updatedLastName = employee.lastName + '_Edited';

        pimPage.searchByName(employee.lastName);
        cy.wait(1000);
        pimPage.editFirstResult();
        pimPage.updateName(updatedFirstName, updatedLastName);
        pimPage.saveForm();
        pimPage.visitEmployeeList();
        pimPage.searchByName(updatedLastName);
        pimPage.getTableRows().should('contain', updatedLastName);
    });

    it('deletes an employee', () => {
        pimPage.searchById(employee.employeeId);
        pimPage.deleteFirstResult();
        pimPage.searchById(employee.employeeId);

        cy.get('.loading-spinner', { timeout: 10000 }).should('not.exist');

        cy.contains('No Records Found', { timeout: 30000 }).should('be.visible');
    });
});
