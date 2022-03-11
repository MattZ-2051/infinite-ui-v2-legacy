Cypress.Commands.add('getBySel', getBySel);

function getBySel(selector, ...arguments_) {
  return cy.get(`[data-cy=${selector}]`, ...arguments_);
}
