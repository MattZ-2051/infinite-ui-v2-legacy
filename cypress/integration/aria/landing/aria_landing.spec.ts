context('test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Aria title', () => {
    cy.title().should('eq', 'ARIA Exchange');
  });
});
