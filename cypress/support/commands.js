import { loginPage } from '../pages/login/loginPage.js';

// Custom command to perform login using the LoginPage POM
Cypress.Commands.add('login', (username, password) => {
    loginPage.visit();
    loginPage.login(username, password);
});