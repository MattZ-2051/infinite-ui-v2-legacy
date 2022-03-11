context('test', () => {
  beforeEach(() => {
    cy.visit('/marketplace');
  });

  it('Infinite marketplace title', () => {
    cy.title().should('eq', 'INFINITE by SUKU - Marketplace');
  });
});
