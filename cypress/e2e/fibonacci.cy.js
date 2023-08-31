import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { circle, fibArray } from '../constants/constants';
import { checkLoader } from '../utils/utils';

describe('Страница Фибоначчи работает корректно', () => {
  beforeEach(() => {
    cy.visit(`/fibonacci`);
  });

  it('Если строка ввода пустая, то копка не активна', function () {
    cy.get('button').eq(1).should('be.disabled');
    cy.get('input').should('be.empty');
  });

  it('Числа генерируются корректно', () => {
    cy.get('input').type(fibArray.length - 1);
    cy.get('button').eq(1).click();

    let step = 0;

    checkLoader(cy.get('button').eq(1), 'exist');

    while (step < fibArray.length) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).each((circle, index) => {
        cy.get(circle).should('contain', fibArray[index]).and('contain', index);
      });
      step++;
    }

    checkLoader(cy.get('button').eq(1), 'not.exist');
  });
});