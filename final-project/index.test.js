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
		jestBody = jestDocument.body,
		jsContent = fs.readFileSync('src/js/scripts.js', 'utf8'),
		cssContent = fs.readFileSync('src/css/style.css', 'utf8');

describe('index.html', () => {
	test('All HTML is valid', () => {
		expect( html ).toHTMLValidate( {
			extends: ["html-validate:standard"],
			root: true
		} );
	} );

	test('Title is updated', () => {
		expect( jestDocument.title ).not.toEqual( 'Update your title here' );
	} );

});

describe('CSS checks', () => {
	test('There is no inline CSS in the HTML.', () => {
		expect( jestDocument.querySelector( '[style]' ) ).toBeNull();
	} );

	test('There is no CSS in a style tag.', () => {
		expect( jestDocument.querySelector( 'style' ) ).toBeNull();
	} );

	test('There are no variables declared with var (use let or const instead)', () => {
		// Define a regular expression to match var declarations
		const varDeclarationRegex = /(\bvar\s)/;

		expect( varDeclarationRegex.match(jsContent) ).toBeLessThanOrEqual(1);
	});
});

describe('JavaScript checks', () => {
	test('There are no inline event listeners in your HTML (use addEventListener instead)', () => {
		expect( jestDocument.querySelector( '[onclick]' ) ).toBeNull();
		expect( jestDocument.querySelector( '[onmouseover]' ) ).toBeNull();
	} );

	test('There is no JavaScript in a script tag in your HTML.', () => {
		const scriptTags = Array.from( jestDocument.querySelectorAll( 'script' ) );

		scriptTags.map((tag) => {
			// If any script tag has text inside, fail the test.
			if (tag.text !== "") {
				throw new Error(' All JavaScript must be in the scripts.js file. Move the JavaScript inside your script tag in your HTML file to your scripts.js file.');
			}
		})
	} );

	test('There are no variables declared with var (use let or const instead)', () => {
		// Define a regular expression to match var declarations
		const varDeclarationRegex = /(\bvar\s)/;

		expect( varDeclarationRegex.test(jsContent) ).toBe(false);
	});

	test('There is no code that is dependent on jQuery. Use JavaScript instead.', () => {
		// Define a regular expression to match var declarations
		const jQueryFlags = /(\$|jQuery)\(/;

		expect( jQueryFlags.test(jsContent) ).toBe(false);
	});
});
