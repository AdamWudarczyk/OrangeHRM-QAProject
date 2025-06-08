// Page Object Model class for the OrangeHRM Login Page
class LoginPage {
    // Navigates directly to the login page
    visit() {
        cy.visit('/web/index.php/auth/login');
        cy.url().should('include', '/auth/login');
    }
    // Returns the username input field
    getUsernameInput() {
        return cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');
    }
    // Returns the password input field
    getPasswordInput() {
        return cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible');
    }
    // Returns the login button element
    getLoginButton() {
        return cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible');
    }
    // Returns the element showing an error message after failed login
    getErrorMessage() {
        return cy.get('.oxd-alert-content-text');
    }
    // Performs login using provided credential
    login(username, password) {
        this.getUsernameInput().type(username);
        this.getPasswordInput().type(password);
        this.getLoginButton().click();
    }
}

export const loginPage = new LoginPage();