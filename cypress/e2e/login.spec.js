import { loginPage } from '../pages/login/loginPage.js';

describe('OrangeHRM Login Tests', () => {
    beforeEach(() => {
        cy.fixture('logincredentials').as('login');
    });

    it('Logs in with valid credentials', () => {
        cy.get('@login').then((data) => {
            const { username, password } = data.validcredentials;
            cy.login(username, password);
            cy.url().should('include', '/dashboard');
        });
    });

    it('Shows error message with invalid credentials', () => {
        cy.get('@login').then((data) => {
            const { username, password } = data.invalidcredentials;
            cy.login(username, password);
            loginPage.getErrorMessage().should('contain', 'Invalid credentials');
        });
    });
});