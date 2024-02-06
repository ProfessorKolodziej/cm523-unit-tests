import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import "html-validate/jest"
import '../extend-expect-cm523'

const css = fs.readFileSync(path.resolve('', './src/css/style.css'), 'utf8');

describe('index.html', () => {
	test('Has a heading tag at the beginning of the page containing the correct text', () => {
		console.log(css)
		expect( container.querySelector( 'h1' ).textContent ).toBe( 'I did it!' );
	} );
})
