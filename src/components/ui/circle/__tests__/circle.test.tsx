import React from 'react';
import TestRenderer from 'react-test-renderer';

import { Circle } from '../circle';
import { ElementStates } from '../../../../types/element-states';

describe('Тестирование компонента Circle', () => {

	it('без буквы', () => {
		const circle = TestRenderer.create(<Circle />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it('с буквами', () => {
		const circle = TestRenderer.create(<Circle letter='1' />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it('с head', () => {
		const circle = TestRenderer.create(<Circle head='1' />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it('с react-элементом в head', () => {
		const circle = TestRenderer.create(<Circle head={<Circle />} />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it('с tail', () => {
		const circle = TestRenderer.create(<Circle tail='1' />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it('с react-элементом в tail', () => {
		const circle = TestRenderer.create(<Circle tail={<Circle />} />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it('с index', () => {
		const circle = TestRenderer.create(<Circle index={0} />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it('с пропом isSmall ===  true', () => {
		const circle = TestRenderer.create(<Circle isSmall={true} />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it(`в состоянии ${ElementStates.Default}`, () => {
		const circle = TestRenderer.create(<Circle state={ElementStates.Default} />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it(`в состоянии ${ElementStates.Changing}`, () => {
		const circle = TestRenderer.create(<Circle state={ElementStates.Changing} />).toJSON();
		expect(circle).toMatchSnapshot();
	});

	it(`в состоянии ${ElementStates.Modified}`, () => {
		const circle = TestRenderer.create(<Circle state={ElementStates.Modified} />).toJSON();
		expect(circle).toMatchSnapshot();
	});
})
