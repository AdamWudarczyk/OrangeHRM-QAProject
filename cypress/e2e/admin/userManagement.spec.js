// E2E test cases for user management in OrangeHRM Admin panel
// Includes search, filter, checkbox, delete, edit and negative scenario

import { UserManagementPage } from '../../pages/admin/userManagementPage';
const userManagementPage = new UserManagementPage();

let usersData;

describe('OrangeHRM Admin – User Management Tests', () => {
    beforeEach(() => {
        cy.login('Admin', 'admin123');
        cy.fixture('admin/users').then((data) => {
            usersData = data;
        });
        userManagementPage.visit();
    });

    it('searches for an existing user', () => {
        // Enters a username and verifies that the user appears in the search results
        userManagementPage.getUsernameInput().type(usersData.existingUser.username);
        userManagementPage.getSearchButton().click();
        userManagementPage.getTableRows().should('contain', usersData.existingUser.username);
    });

    it('filters users by role using dropdown', () => {
        // Selects a user role filter and checks that filtered results are displayed
        userManagementPage.selectRole(usersData.existingUser.role);
        userManagementPage.getSearchButton().click();
        userManagementPage.getTableRows().should('exist');
    });

    it('resets the search filters', () => {
        // Fills in search filters, resets them, and verifies inputs are cleared
        userManagementPage.getUsernameInput().type(usersData.existingUser.username);
        userManagementPage.selectRole(usersData.existingUser.role);
        userManagementPage.getResetButton().click();
        userManagementPage.getUsernameInput().should('have.value', '');
    });

    it('selects a user via checkbox and shows delete button', () => {
        // Checks the checkbox for a user and verifies the Delete button becomes visible
        userManagementPage.getTableRows().should('have.length.greaterThan', 1);
        userManagementPage.getCheckboxes().eq(1).scrollIntoView().check({ force: true });
        userManagementPage.getDeleteButton().should('be.visible');
    });

    it('edits status of a non-admin user', () => {
        // Finds a non-admin user, opens edit page, toggles status if toggle exists, then saves
        userManagementPage.getTableRows().each(($row, index) => {
            const rowText = $row.text();

            if (!rowText.includes('Admin')) {
                userManagementPage.getEditIconForRow(index).click();
                cy.url().should('include', '/saveSystemUser');
                cy.get('input.oxd-input').first().should('be.visible');

                cy.get('body').then($body => {
                    if ($body.find('.oxd-switch-input').length > 0) {
                        userManagementPage.getStatusToggle()
                            .scrollIntoView()
                            .should('be.visible')
                            .click({ force: true });
                    } else {
                        cy.log('No status toggle found for this user.');
                    }
                });

                userManagementPage.getSaveButton().click();
                return false; // stop iterating after first non-admin user
            }
        });
    });

    it('shows no results for non-existing user', () => {
        // Searches for a username that does not exist and verifies no results are displayed
        userManagementPage.getUsernameInput().type(usersData.nonExistingUser.username);
        userManagementPage.getSearchButton().click();
        userManagementPage.getTableRows().should('have.length', 0);
    });
});