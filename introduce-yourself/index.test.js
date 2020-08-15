import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve('src', './index.html'), 'utf8');

let dom
let container

expect.extend({
  toHaveOneH1(received) {
    const pass = received.querySelector('h1').length === '1';

    if ( pass ) {
      return {
        message: () =>
          `There is one and only one H1 element in the document.`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `You should only have one H1 on this page.`,
        pass: false,
      };
    }
  },
});

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM( html )
    container = dom.window.document.body
  })

  test('renders a heading element', () => {
    expect(container.toHaveOneH1())
  })
})
