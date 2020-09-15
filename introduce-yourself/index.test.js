import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import "html-validate/jest"
import '../extend-expect-cm523'

const html = fs.readFileSync(path.resolve('', './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
	beforeEach(() => {
		dom = new JSDOM( html );
		container = dom.window.document.body;
	} );

	test('All HTML is valid', () => {
		expect( html ).toHTMLValidate( {
			extends: ["html-validate:standard"],
			root: true
		} );
	} );

	test('Has one h1 tag', () => {
		expect( container ).toHaveOneH1();
	} );

	test('Has at least one h2 tag', () => {
		expect( container.querySelector( 'h2' ) ).not.toBeNull();
	} );

	test('Has at least one h3 tag', () => {
		expect( container.querySelector( 'h3' ) ).not.toBeNull();
	} );

	test('Has at least one p tag', () => {
		expect( container.querySelector( 'p' ) ).not.toBeNull();
	} );

	test('Has at least one ol tag', () => {
		expect( container.querySelector( 'ol' ) ).not.toBeNull();
	} );

	test('Has at least one ul tag', () => {
		expect( container.querySelector( 'ul' ) ).not.toBeNull();
	} );

	test('Has at least one li tag', () => {
		expect( container.querySelector( 'li' ) ).not.toBeNull();
	} );

	test('All text is wrapped HTML tags', () => {
		expect( container ).allTextIsWrapped();
	} );
})
