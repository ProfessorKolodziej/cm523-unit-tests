import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import '../extend-expect-cm523'

const html = fs.readFileSync(path.resolve('src', './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
	beforeEach(() => {
		dom = new JSDOM( html )
		container = dom.window.document.body
	})

	test('Has one h1 element', () => {
		expect( container ).toHaveOneH1()
	})
})
