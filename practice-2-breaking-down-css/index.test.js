import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import "html-validate/jest"
import '../extend-expect-cm523'

const css = fs.readFileSync(path.resolve('', './src/css/style.css'), 'utf8');

describe('style.css', () => {
	test('You used display: grid; in your CSS at least once.', () => {
		expect(css).toContain('display: grid;');
	} );

	test('You used position: absolute; in your CSS at least once.', () => {
		expect(css).toContain('position: absolute;');
	} );
})
