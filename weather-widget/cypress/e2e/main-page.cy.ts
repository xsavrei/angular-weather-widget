import { onE2e } from "../support/e2e";

describe('empty spec', () => {
  it('main-page weather response', () => {

    cy.visit('http://localhost:4200/main')
    onE2e.validateLocation('/main');
    cy.get('app-main-page app-weather-card').should('exist');
    cy.get('app-weather-card [data-cy="weather-card"]').should('exist');
  })
})
