import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve('src', './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM( html )
    container = dom.window.document.body
  })

  test('renders a heading element', () => {
    expect(container.querySelector('h1')).not.toBeNull()
  })
})
