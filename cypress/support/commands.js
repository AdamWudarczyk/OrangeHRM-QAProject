import { loginPage } from '../pages/login/loginPage.js';

Cypress.Commands.add('login', (username, password) => {
    loginPage.visit();
    loginPage.login(username, password);
});