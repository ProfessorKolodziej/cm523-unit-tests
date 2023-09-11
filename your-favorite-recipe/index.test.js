import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import "html-validate/jest"
import '../extend-expect-cm523'

const html = fs.readFileSync(path.resolve('', './src/index.html'), 'utf8'),
		dom = new JSDOM( html ),
		container = dom.window.document.body;

describe('index.html', () => {
	test('All HTML is valid', () => {
		expect( html ).toHTMLValidate( {
			extends: ["html-validate:standard"],
			root: true
		} );
	} );

	test('Your recipe includes a title using an h1 tag.', () => {
		expect( container.querySelector( 'h1' ) ).not.toBeNull();
	} );

	test('Your recipe includes an introduction paragraph.', () => {
		expect( container.querySelector( 'p' ) ).not.toBeNull();
	} );

	test('Your recipe includes ingredients, using the ul tag.', () => {
		expect( container.querySelector( 'ul' ) ).not.toBeNull();
	} );

	test('Your recipe includes directions, using the ol tag.', () => {
		expect( container.querySelector( 'ol' ) ).not.toBeNull();
	} );
});
