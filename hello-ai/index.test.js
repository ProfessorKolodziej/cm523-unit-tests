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
  
  test('Has an h1 tag at the beginning of the page containing the correct text', () => {
		expect( container.querySelector( 'h1' ).textContent ).toBe( 'Hello, world!' );
	} );

	test('Has a paragraph tag', () => {
		expect( container.querySelectorAll( 'p' ).length ).toBe( 1 );
	} );
})
