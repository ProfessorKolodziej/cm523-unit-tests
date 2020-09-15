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

expect.extend({
	toHaveAbbrOrCite( received ) {
		const abbr = received.querySelector( 'abbr' ),
				cite = received.querySelector( 'cite' );

		if ( abbr || cite ) {
			return {
				message: () =>
					`This meets the assignment requirements!`,
				pass: true,
			};
		} else {
			return {
				message: () =>
					`This page does not have an abbreviation or citation.`,
				pass: false,
			};
		}
	},
});

describe('index.html', () => {
	test('All HTML is valid', () => {
		expect( html ).toHTMLValidate( {
			extends: ["html-validate:standard"],
			root: true
		} );
	} );

	test('All text is wrapped HTML tags', () => {
		expect( container ).allTextIsWrapped();
	} );

	test('Has one h1 tag', () => {
		expect( container ).toHaveOneH1();
	} );

	test('Has at least one definition in dfn tag', () => {
		expect( container.querySelector( 'dfn' ) ).not.toBeNull();
	} );

	test('Has at least two examples in li tags', () => {
		expect( container.querySelectorAll( 'li' ).length ).toBeGreaterThanOrEqual(2);
	} );

	test('Examples are italicized using em tags', () => {
		expect( container.querySelector( 'em' ) ).not.toBeNull();
	} );

	test('Term is bolded using strong tag', () => {
		expect( container.querySelector( 'strong' ) ).not.toBeNull();
	} );

	test('Contact information is wrapped in address tag', () => {
		expect( container.querySelector( 'address' ) ).not.toBeNull();
	} );

	test('At least one abbreviation or citation is present', () => {
		expect( container ).toHaveAbbrOrCite();
	} );
})
