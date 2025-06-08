// Page Object Model class for the OrangeHRM PIM (Employee) section
export class PimPage {
    // Navigates to the Add Employee form
    visitAddEmployeeForm() {
        cy.visit('/web/index.php/pim/addEmployee');
    }

    // Navigates to the Employee List page
    visitEmployeeList() {
        cy.visit('/web/index.php/pim/viewEmployeeList');
    }

    // Returns input fields
    getFirstNameInput() {
        return cy.get('input[name="firstName"]');
    }
    // Returns the middle name input field
    getMiddleNameInput() {
        return cy.get('input[name="middleName"]');
    }

    // Returns the last name input field and verifies it is visible
    getLastNameInput() {
        return cy.get('input[name="lastName"]').should('be.visible');
    }

    // Returns the Employee ID input field
    getEmployeeIdInput() {
        return cy.get('.oxd-input-group:has(label:contains("Employee Id")) input')
    }

    // Returns the Save button
    getSaveButton() {
        return cy.contains('Save');
    }

    // Returns the Search input and button
    getSearchInput() {
        cy.get('input[placeholder="Type for hints..."]').first().should('be.visible').clear().type(name);
    }

    getSearchButton() {
        return cy.get('button[type="submit"]');
    }

    // Returns the Employee Table rows
    getTableRows() {
        return cy.get('.oxd-table-body .oxd-table-row');
    }

    // Fills in the employee form using generated data
    fillEmployeeForm(employeeData) {
        this.getFirstNameInput().type(employeeData.firstName);
        this.getMiddleNameInput().type(employeeData.middleName);
        this.getLastNameInput().type(employeeData.lastName);
        this.getEmployeeIdInput().clear().type(employeeData.employeeId);
    }

    // Clicks Save button to submit form
    saveForm() {
        this.getSaveButton().click();
    }

    // Verifies employee name is present on the confirmation page
    verifyEmployeeName(employeeData) {
        cy.get('.orangehrm-edit-employee-name')
            .should('contain', employeeData.firstName)
            .and('contain', employeeData.lastName);
    }

    // Searches employee by name
    searchByName(name) {
        cy.get('input[placeholder="Type for hints..."]').first().should('be.visible').clear().type(name);
        this.getSearchButton().should('be.visible').click();
    }

    // Searches employee by ID
    searchById(id) {
        cy.get('.oxd-form-row')
            .within(() => {
                cy.get('input')
                    .eq(1) // zazwyczaj Employee Id
                    .should('be.visible')
                    .clear()
                    .type(id);
            });

        this.getSearchButton().click();
    }

    // Clicks the edit button for the first result row
    editFirstResult() {
        cy.get('.oxd-table-body .oxd-table-row', { timeout: 10000 })
            .should('have.length.greaterThan', 0);

        cy.get('.oxd-table-cell-actions')
            .first()
            .find('button')
            .eq(0)
            .should('be.visible')
            .click({ force: true });

        cy.url({ timeout: 10000 }).should('include', '/viewPersonalDetails');

        cy.get('input[name="lastName"]', { timeout: 10000 })
            .should('exist')
            .and('be.visible');
    }

    // Updates last name field with new value
    updateLastName(newLastName) {
        this.getLastNameInput().clear().type(newLastName);
    }

    // Updates first and last name fields with new values
    updateName(firstName, lastName) {
        this.getFirstNameInput().clear().type(firstName);
        this.getLastNameInput().clear().type(lastName);
    }

    // Deletes first search result with confirmation
    deleteFirstResult() {

        cy.get('.oxd-table-row input[type="checkbox"]').first().check({ force: true });
        cy.contains('Delete Selected').should('be.visible').click();
        cy.get('button.oxd-button--label-danger') // dokładniejszy selektor
            .contains('Yes, Delete')
            .should('be.visible')
            .click({ force: true });

        cy.contains('Yes, Delete').should('not.exist');
    }
}

export const pimPage = new PimPage();