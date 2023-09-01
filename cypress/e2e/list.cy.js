import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { changingStyle, circleBorder, defaultStyle, circle, modifiedStyle } from '../constants/constants';

const testElement = 51;

describe('Страница Связный Список работает корректно', () => {
  beforeEach(() => {
    cy.visit(`/list`);
  });

  it('Кнопки добавления элемента не доступны', () => {
    cy.get('input').eq(0).should('be.empty');

    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');

    cy.get('input').eq(1).should('be.empty');

    cy.get('button').eq(5).should('be.disabled');
    cy.get('button').eq(6).should('be.disabled');
  });

  it('Отрисовка дефолтного списка', () => {
    cy.get(circleBorder).each((circle) => {
      cy.get(circle)
        .and('have.css', 'border-color', defaultStyle);
    })

    cy.get(circle).eq(0).should('contain', 'head');
    cy.get(circle).each((circle, i, arr) => {
      if (i === 0)
        cy.get(circle).should('contain', 'head');

      if (i === arr.length - 1)
        cy.get(circle).should('contain', 'tail');

      cy.get(circle).should('contain', `${i}`);
    });
  });

  it('Добавление элемента в head', () => {

    cy.get('input').eq(0).type(testElement);
    cy.get('button').eq(1).click();

    cy.get(circleBorder).eq(0)
      .should('contain', `${testElement}`)
      .and('have.css', 'border-color', changingStyle)
      .and('have.css', 'width', '56px');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).eq(0)
      .should('have.css', 'border-color', modifiedStyle)
      .and('contain', `${testElement}`);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).eq(0)
      .should('have.css', 'border-color', defaultStyle);
    cy.get(circle).eq(0)
      .should('contain', 'head');
  });

  it('Добавление элемента в tail', () => {

    cy.get('input').eq(0).type(testElement);
    cy.get('button').eq(2).click();

    cy.get(circle).last().prev()
      .find(circleBorder)
      .should('contain', `${testElement}`)
      .and('have.css', 'border-color', changingStyle)
      .and('have.css', 'width', '56px');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).last()
      .should('have.css', 'border-color', modifiedStyle)
      .and('contain', `${testElement}`);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).last()
      .should('have.css', 'border-color', defaultStyle);
    cy.get(circle).last()
      .should('contain', 'tail');
  });

  it('Добавление элемента по индексу', () => {
    cy.get('input').eq(0).type(testElement);
    cy.get('input').eq(1).type(1);
    cy.get('button').eq(5).click();

    cy.get(circleBorder).eq(0)
      .should('contain', `${testElement}`)
      .and('have.css', 'border-color', changingStyle)
      .and('have.css', 'width', '56px');

    cy.get(circleBorder).eq(1)
      .should('have.css', 'border-color', changingStyle)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).eq(1)
      .should('contain', `${testElement}`)
      .and('have.css', 'border-color', changingStyle)
      .and('have.css', 'width', '56px');

    cy.get(circleBorder).eq(2)
      .should('have.css', 'border-color', changingStyle)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).eq(1)
      .should('contain', `${testElement}`)
      .and('have.css', 'border-color', modifiedStyle)
      .and('have.css', 'width', '80px');

    cy.get(circleBorder).eq(2)
      .should('have.css', 'border-color', changingStyle)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).each((circle) => {
      cy.get(circle)
        .should('have.css', 'border-color', defaultStyle)
    });
  });

  it('Удаление элемента из head', () => {
    cy.get(circleBorder).first().then(($p) => {
      const delElement = $p.text();

      cy.get('button').eq(3).click();

      cy.get(circleBorder).eq(0)
        .should('contain', `${delElement}`)
        .and('have.css', 'border-color', changingStyle)
        .and('have.css', 'width', '56px');

      cy.get(circleBorder).eq(1)
        .should('contain', ``)

      cy.wait(SHORT_DELAY_IN_MS);
    })

    cy.get(circleBorder).eq(0)
      .should('have.css', 'border-color', defaultStyle);
    cy.get(circle).eq(0)
      .should('contain', 'head');
  });

  it('Удаление элемента из tail', () => {
    cy.get(circleBorder).last().then(($p) => {
      const delElement = $p.text();

      cy.get('button').eq(4).click();

      cy.get(circle).last().prev()
        .find(circleBorder)
        .should('contain', `${delElement}`)
        .and('have.css', 'border-color', changingStyle)
        .and('have.css', 'width', '56px');

      cy.get(circleBorder).last()
        .should('contain', ``)

      cy.wait(SHORT_DELAY_IN_MS);
    })

    cy.get(circleBorder).last()
      .should('have.css', 'border-color', defaultStyle);
    cy.get(circle).last()
      .should('contain', 'tail');
  });

  it('Удаление элемента по индексу', () => {
    cy.get('input').eq(1).type(1);

    cy.get('button').eq(6).click();

    cy.get(circleBorder).eq(0)
      .and('have.css', 'border-color', changingStyle)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).eq(1)
      .should('have.css', 'border-color', changingStyle)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).eq(1)
      .should('have.css', 'border-color', changingStyle)
      .and('have.css', 'width', '56px');

    cy.get(circleBorder).eq(2)
      .should('have.css', 'border-color', changingStyle)
      .and('contain', '');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).eq(1)
      .should('have.css', 'border-color', defaultStyle)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circleBorder).each((circle) => {
      cy.get(circle)
        .should('have.css', 'border-color', defaultStyle)
    });
  });
});