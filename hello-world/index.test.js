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
		expect( html ).toHTMLValidate();
	} );

	test('All text is wrapped HTML tags', () => {
		expect( container ).allTextIsWrapped();
	} );

	test('Has a paragraph at the beginning of the page containing "Hello, world!"', () => {
		expect( container.querySelector( 'p' ) ).text.toBe( 'Hello, world!' );
	} );
})
