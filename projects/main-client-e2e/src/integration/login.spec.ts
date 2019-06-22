/// <reference types="cypress" />

import { CONFIG } from '../e2e-config.env';

describe('login', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it('redirect to login page', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/login');
  });
  // TODO: run a test this isn't available in "production" environments
  it('firestore instance is exposed', () => {
    cy.window()
      .its('firestore' as any)
      .should('exist');
  });
  it('login via email and password, and logout', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').as('emailInput');
    cy.get('input[name="password"]').as('passwordInput');
    cy.contains('button', 'Login With Email').as('emailButton');
    cy.get('button[aria-label="Logout"]').as('logoutButton');

    cy.get('@emailInput').type(CONFIG.email);
    cy.get('@passwordInput').type(CONFIG.password);
    cy.get('@emailButton').click();
    // TODO: check redirect

    cy.get('@logoutButton').click();
    // TODO: check redirect
  });

  // these are not valid test
  it.skip('should have google login button', () => {
    cy.visit('/login?useRedirect=true');
    cy.contains('button', 'Login With Google').as('googleButton');
    cy.get('@googleButton').click();
  });
  it.skip('should have github login button', () => {
    cy.visit('/login?useRedirect=true');
    cy.contains('button', 'Login With Github').as('githubButton');
    cy.get('@githubButton').click();
  });
});
