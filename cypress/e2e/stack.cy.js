import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from '../../src/constants/delays';
import { checkBtnDisabled } from '../utils/utils';
import { changingStyle, circleBorder, defaultStyle, circle } from '../constants/constants';

const addElement = (el) => {
  cy.get('input').type(el);
  cy.get('button').eq(1).click();
}

const testElement = 159;
const testArray = [159, 123, 15];

describe('Страница Стек работает корректно', () => {
  beforeEach(() => {
    cy.visit(`/stack`);
  });

  checkBtnDisabled('button', 'input');

  it('Добавление элемента в стэк работает корректно', () => {
    cy.get('input').type(testElement);
    cy.get('button').eq(1).click();

    cy.get(circleBorder).each((circle) => {
      cy.get(circle)
        .should('contain', `${testElement}`)
        .and('have.css', 'border-color', changingStyle);

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(circle)
        .should('contain', `${testElement}`)
        .and('have.css', 'border-color', defaultStyle);

      checkBtnDisabled('button', 'input');
    });
  });

  it('Удаление элемента из стэка работает корректно', () => {
    testArray.forEach((el) => addElement(el));
    let curr = testArray.length - 1;

    cy.get('button').eq(2).click();

    cy.get(circleBorder).eq(curr)
      .should('contain', `${testArray[curr]}`)
      .and('have.css', 'border-color', changingStyle);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).should("have.length", curr);

    curr--;
  });

  it('Удаление элемента из стэка работает корректно', () => {
    testArray.forEach((el) => addElement(el));

    cy.get('button').eq(3).click();

    cy.get(circleBorder).each((circle, index) => {
      cy.get(circle)
        .should('contain', testArray[index])
        .and('have.css', 'border-color', changingStyle);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).should("have.length", 0);
  });

});