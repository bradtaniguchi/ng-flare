describe('Hello Nx', () => {
  beforeEach(() => cy.visit('/'));

  it('redirect to login page', () => {
    cy.location('pathname').should('eq', '/login');
  });
});
