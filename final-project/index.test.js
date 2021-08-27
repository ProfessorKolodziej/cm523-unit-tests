import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import "html-validate/jest"
import '../extend-expect-cm523'

const html = fs.readFileSync(path.resolve('', './src/index.html'), 'utf8'),
		dom = new JSDOM( html ),
		container = dom.window.document.body,
		document = dom.window.document;

describe('index.html', () => {
	test('Title is updated', () => {
		expect( document.title ).not.toEqual( 'Update your title here' );
	} );
})
