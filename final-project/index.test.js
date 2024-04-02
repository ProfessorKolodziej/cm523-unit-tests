import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import { readdir } from 'node:fs/promises';
import path from 'path'
import "html-validate/jest"
import '../extend-expect-cm523'

let fileCache = null,
	htmlCache = [],
	jsCache = [];

async function getAllFiles() {
	if ( fileCache === null ) {
		fileCache = await readdir('./src', { recursive: true });
		return fileCache;
	} else {
		return fileCache;
	}
}

beforeAll(async () => {
	const allFiles = await getAllFiles();
	const allHTML = allFiles.filter((file) => file.includes('.html'));
	allHTML.map((file) => {
		const html = fs.readFileSync(path.resolve('./src', file), 'utf8');
		htmlCache.push({
			markup: html,
			dom: new JSDOM( html )
		})
	});

	const allJS = allFiles.filter((file) => file.includes('.js'));
	allJS.map((file) => {
		const js = fs.readFileSync(path.resolve('./src', file), 'utf8');
		jsCache.push(js)
	});
});

describe('HTML checks', () => {
	test('All HTML is valid', () => {
		htmlCache.map((cacheItem) => {
			expect( cacheItem.markup ).toHTMLValidate( {
				extends: ["html-validate:standard"],
				root: true
			} );
		});
	} );

	test('Title is updated', () => {
		htmlCache.map((cacheItem) => {
			const jestDocument = cacheItem.dom.window.document;
			expect( jestDocument.title ).not.toEqual( 'Update your title here' );
		});
	} );

	test('There is no inline CSS in the HTML.', () => {
		htmlCache.map((cacheItem) => {
			const jestDocument = cacheItem.dom.window.document;
			expect( jestDocument.querySelector( '[style]' ) ).toBeNull();
		});
	} );

	test('There is no CSS in a style tag.', () => {
		htmlCache.map((cacheItem) => {
			const jestDocument = cacheItem.dom.window.document;
			expect( jestDocument.querySelector( 'style' ) ).toBeNull();
		});
	} );

	test('There are no inline event listeners in your HTML (use addEventListener instead)', () => {
		htmlCache.map((cacheItem) => {
			const jestDocument = cacheItem.dom.window.document;
			expect( jestDocument.querySelector( '[onclick]' ) ).toBeNull();
			expect( jestDocument.querySelector( '[onmouseover]' ) ).toBeNull();
		});
	} );

	test('There is no JavaScript in a script tag in your HTML.', () => {
		htmlCache.map((cacheItem) => {
			const jestDocument = cacheItem.dom.window.document;
			const scriptTags = Array.from( jestDocument.querySelectorAll( 'script' ) );
			scriptTags.map((tag) => {
				// If any script tag has text inside, fail the test.
				if (tag.text !== "") {
					throw new Error(' All JavaScript must be in the scripts.js file. Move the JavaScript inside your script tag in your HTML file to your scripts.js file.');
				}
			});
		});
	} );
});

describe('JavaScript checks', () => {
	test('There are no variables declared with var (use let or const instead)', () => {
		// Define a regular expression to match var declarations
		const varDeclarationRegex = /(\bvar\s)/;

		jsCache.map((cacheItem) => {
			expect( varDeclarationRegex.test(cacheItem) ).toBe(false);
		});
	});

	test('There is no code that is dependent on jQuery. Use JavaScript instead.', () => {
		// Define a regular expression to match var declarations
		const jQueryFlags = /(\$|jQuery)\(/;

		jsCache.map((cacheItem) => {
			expect( jQueryFlags.test(cacheItem) ).toBe(false);
		});
	});
});
