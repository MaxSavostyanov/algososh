import { loader } from '../constants/constants';

export const checkLoader = (button, exist) => {
  button.get(loader).should(exist);
};

export const checkBtnDisabled = (button, input) => {
  it('Если строка ввода пустая, то копка не активна', function () {
    cy.get(button).eq(1).should('be.disabled');
    cy.get(input).should('be.empty');
  });
}


