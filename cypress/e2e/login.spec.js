// E2E test cases for login functionality of OrangeHRM
// Includes valid and invalid login scenarios
import { loginPage } from '../pages/login/loginPage.js';

describe('OrangeHRM Login Tests', () => {
    // Load test data from fixture before each test
    beforeEach(() => {
        cy.fixture('logincredentials').as('login');
    });

    it('Logs in with valid credentials', () => {
        cy.get('@login').then((data) => {
            const { username, password } = data.validcredentials;
            cy.login(username, password);
            cy.url().should('include', '/dashboard'); // Validate successful login
        });
    });

    it('Shows error message with invalid credentials', () => {
        cy.get('@login').then((data) => {
            const { username, password } = data.invalidcredentials;
            cy.login(username, password);
            // Validate that an error message is displayed on failed login
            loginPage.getErrorMessage().should('contain', 'Invalid credentials');
        });
    });
});