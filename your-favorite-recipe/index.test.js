import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import "html-validate/jest"
import '../extend-expect-cm523'

const html = fs.readFileSync(path.resolve('', './index.html'), 'utf8'),
		dom = new JSDOM( html ),
		container = dom.window.document.body;

describe('index.html', () => {
	test('All HTML is valid', () => {
		expect( html ).toHTMLValidate({
			extends: ["html-validate:standard"]
		});
	} );

	test('Your recipe includes a title, introduction paragraph, ingredients, and directions. (Hint: be sure to use semantic tags.)', () => {
		expect( container.querySelector( 'h1' ) ).not.toBeNull();
		expect( container.querySelector( 'p' ) ).not.toBeNull();
		expect( container.querySelector( 'ul' ) ).not.toBeNull();
		expect( container.querySelector( 'ol' ) ).not.toBeNull();
	} );

	/* TODO: Find a CSS validator. */
});
