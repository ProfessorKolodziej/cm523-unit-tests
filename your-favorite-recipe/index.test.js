import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import "html-validate/jest"
import '../extend-expect-cm523'

const html = fs.readFileSync(path.resolve('', './src/index.html'), 'utf8'),
		dom = new JSDOM( html ),
		jestDocument = dom.window.document,
		jestBody = jestDocument.body

describe('index.html', () => {
	test('All HTML is valid', () => {
		expect( html ).toHTMLValidate( {
			extends: ["html-validate:standard"],
			root: true
		} );
	} );

	test('Your recipe includes a title using an h1 tag.', () => {
		expect( jestBody.querySelector( 'h1' ) ).not.toBeNull();
	} );

	test('Your recipe includes an introduction paragraph.', () => {
		expect( jestBody.querySelector( 'p' ) ).not.toBeNull();
	} );

	test('Your recipe includes ingredients, using the ul tag.', () => {
		expect( jestBody.querySelector( 'ul' ) ).not.toBeNull();
	} );

	test('Your recipe includes directions, using the ol tag.', () => {
		expect( jestBody.querySelector( 'ol' ) ).not.toBeNull();
	} );
});

describe('CSS checks', () => {
	test('There is no inline CSS in the HTML.', () => {
		expect( jestDocument.querySelector( '[style]' ) ).toBeNull();
	} );

	test('There is no CSS in a style tag.', () => {
		expect( jestDocument.querySelector( 'style' ) ).toBeNull();
	} );
});
