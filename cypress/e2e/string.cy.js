import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from '../../src/constants/delays';
import { checkLoader, checkBtnDisabled } from '../utils/utils';
import { circleBorder, string, stringSteps } from '../constants/constants';


describe('Страница Строка работает корректно', () => {
  beforeEach(() => {
    cy.visit(`/recursion`);
  });

  checkBtnDisabled('button', 'input');

  it('Алгоритм и анимация работают корректно', () => {
    cy.get('input').type(string);
    cy.get('button').eq(1).click();

    checkLoader(cy.get('button').eq(1), 'exist');

    cy.get(circleBorder).each((circle, index) => {
      cy.get(circle)
        .should('contain', stringSteps[0][index].textContent)
        .and('have.css', 'border-color', stringSteps[0][index].color);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    for (let i = 1; i < stringSteps.length; i++) {
      cy.get(circleBorder).each((circle, index) => {
        cy.get(circle)
          .should('contain', stringSteps[i][index].textContent)
          .and('have.css', 'border-color', stringSteps[i][index].color);
      });

      cy.wait(DELAY_IN_MS);
    }

    checkLoader(cy.get('button').eq(1), 'not.exist');
  });

  checkBtnDisabled('button', 'input');
});