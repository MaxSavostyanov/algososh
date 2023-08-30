import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from '../button';

describe('Тестирование компонента Button', () => {

	it('Кнопка c текстом', () => {
		const button = TestRenderer.create(<Button text='Текст' />).toJSON();
		expect(button).toMatchSnapshot()
	})

	it('Кнопка без текста', () => {
		const button = TestRenderer.create(<Button />).toJSON();
		expect(button).toMatchSnapshot()
	})

	it('Кнопка заблокирована', () => {
		const button = TestRenderer.create(<Button disabled />).toJSON();
		expect(button).toMatchSnapshot()
	})

	it('Кнопка c индикацией загрузки', () => {
		const button = TestRenderer.create(<Button isLoader={true} />).toJSON();
		expect(button).toMatchSnapshot()
	})

	it('Вызов колбека при клике на кнопку', () => {
		window.alert = jest.fn();

		render(<Button text='тест' onClick={() => alert('успешно')} />)

		const button = screen.getByText('тест');

		fireEvent.click(button);

		expect(window.alert).toHaveBeenCalledWith('успешно');
	});
})
