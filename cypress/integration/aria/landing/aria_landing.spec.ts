context('test', () => {
  beforeEach(() => {
    cy.visit('/marketplace');
  });

  it('Aria title', () => {
    cy.title().should('eq', 'ARIA Exchange - Marketplace');
  });
});
