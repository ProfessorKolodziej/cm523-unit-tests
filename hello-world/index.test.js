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

	test('Has a paragraph at the beginning of the page containing "Hello, world!"', () => {
		expect( container.querySelector( 'p' ).textContent ).toBe( 'Hello, world!' );
	} );

	test('Has at least two paragraph (<p>) tags', () => {
		expect( container.querySelectorAll( 'p' ).length ).toBeGreaterThanOrEqual( 2 );
	} );

	test('Uses the code example from the template (hint: make sure you have a <code> tag)', () => {
		expect( container.querySelector( 'code' ) ).not.toBeNull();
	} );
})
