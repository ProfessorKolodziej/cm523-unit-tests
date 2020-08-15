import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve('src', './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  test('A single `<h1>` is used', () => {
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  });
})
