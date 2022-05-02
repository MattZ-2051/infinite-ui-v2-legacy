context('test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('McLaren title', () => {
    cy.title().should('eq', 'McLaren NFT Collection - Buy Rare & Exclusive Supercar NFTs');
  });
});
