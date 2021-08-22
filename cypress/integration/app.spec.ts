context('test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('title', () => {
    cy.title().should('eq', 'The ARIA Exchange');
  });
});
