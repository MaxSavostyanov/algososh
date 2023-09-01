import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { checkBtnDisabled } from '../utils/utils';
import { changingStyle, circleBorder, defaultStyle, circle } from '../constants/constants';

const addElement = (el) => {
  cy.get('input').type(el);
  cy.get('button').eq(1).should('be.not.disabled');

  cy.get('button').eq(1).click();
}

const testArray = [159, 123, 15];

describe('Страница Стек работает корректно', () => {
  beforeEach(() => {
    cy.visit(`/queue`);
  });

  checkBtnDisabled('button', 'input');
  it('Кнопки удаление и очистить недоступны ', () => {
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });


  it('Добавление элемента в очередь работает корректно', () => {
    let start = 0;
    let length = 0;

    if (length === 0) {
      addElement(testArray[0]);
      length += 1;

      cy.get(circleBorder).eq(start)
        .should('have.css', 'border-color', changingStyle);

      cy.get(circle).eq(start)
        .should('contain', 'head')
        .and('contain', 'tail');

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(circleBorder).eq(start)
        .should('contain', `${testArray[0]}`)
        .and('have.css', 'border-color', defaultStyle);
    }

    addElement(testArray[1]);
    length += 1;

    cy.get(circleBorder).eq(length - 1)
      .should('have.css', 'border-color', changingStyle);

    cy.get(circle).eq(length - 1)
      .should('contain', 'tail');

    cy.get(circle).eq(length - 2)
      .should('not.contain', 'tail');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).eq(length - 1)
      .should('contain', `${testArray[1]}`)
      .should('have.css', 'border-color', defaultStyle);
  });

  it('Удаление элемента из очередь работает корректно', () => {
    testArray.forEach((el) => addElement(el));
    let start = 0;
    let length = testArray.length;

    for (let i = 0; i < length; i++) {
      cy.get('button').eq(2).click();

      cy.get(circleBorder).eq(start)
        .should('have.css', 'border-color', changingStyle);
      cy.get(circle).eq(start)
        .should('contain', 'head');

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(circleBorder).eq(start)
        .should('have.css', 'border-color', defaultStyle);
      start += 1;
      cy.get(circle).eq(start)
        .should('contain', 'head');
      cy.get(circle).eq(start - 1)
        .should('not.contain', 'head');
    }
  });

  it('Очистка очереди работает корректно', () => {
    testArray.forEach((el) => addElement(el));

    cy.get('button').eq(3).click();

    cy.get(circleBorder).each((circle) => {
      cy.get(circle)
        .and('have.css', 'border-color', changingStyle);
    });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).each((circle) => {
      cy.get(circle)
        .should('contain', '')
        .and('have.css', 'border-color', defaultStyle);
    });
    cy.get(circle).each((circle) => {
      cy.get(circle)
        .should('not.contain', 'head')
        .and('not.contain', 'tail');
    });

  });

});