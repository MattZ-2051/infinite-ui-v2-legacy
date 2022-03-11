import 'cypress-real-events/support';
import './commands';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Cypress.on('uncaught:exception', (error, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getBySel(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
