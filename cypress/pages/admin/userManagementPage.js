// Page Object Model class for the OrangeHRM User Management Page (Admin section)
export class UserManagementPage {
    // Navigates directly to the System Users page
    visit() {
        cy.visit('/web/index.php/admin/viewSystemUsers');
    }

    // Returns the username search input field
    getUsernameInput() {
        return cy.get('input[placeholder="Type for hints..."]');
    }

    // Returns the User Role dropdown (1st dropdown)
    getRoleDropdown() {
        return cy.get('.oxd-select-wrapper').eq(0);
    }

    // Selects a specific user role from the dropdown
    selectRole(role) {
        this.getRoleDropdown().click();
        cy.contains('.oxd-select-option', role).click();
    }

    // Returns the Search button
    getSearchButton() {
        return cy.get('button[type="submit"]');
    }

    // Returns the Reset button
    getResetButton() {
        return cy.contains('Reset');
    }

    // Returns all table rows from the user list
    getTableRows() {
        return cy.get('.oxd-table-body .oxd-table-row');
    }

    // Returns all checkboxes for selecting users
    getCheckboxes() {
        return cy.get('.oxd-table-row input[type="checkbox"]');
    }

    // Returns the Delete Selected button
    getDeleteButton() {
        return cy.get('button .bi-trash-fill').parents('button').should('be.visible');
    }

    // Returns the Edit icon for a user row by index (default = first row)
    getEditIconForRow(index = 0) {
        return cy.get('.oxd-table-cell-actions > :nth-child(2)').eq(index);
    }

    // Returns the status toggle switch element
    getStatusToggle() {
        return cy.get('.oxd-switch-input').first();
    }

    // Returns the Save button after editing
    getSaveButton() {
        return cy.contains('Save');
    }
}