context('test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('McLaren title', () => {
    cy.title().should('eq', 'McLaren MSO LAB - Exclusive NFT Drops & Metaverse Roadmap');
  });
});
