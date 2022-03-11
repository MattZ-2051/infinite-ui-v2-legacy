context('test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Seva title', () => {
    cy.title().should('eq', 'SEVA.LOVE');
  });
});
