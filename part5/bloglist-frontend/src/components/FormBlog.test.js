import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import FormBlog from './FormBlog'

describe('Form of new blog tests', () => {

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {

    component = render(
      <FormBlog createBlog={mockHandler}>
      </FormBlog>
    )

  })

  test('5.16 check form submit', () => {

    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const url = component.container.querySelector('.url')

    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'titolo' },
    })
    fireEvent.change(author, {
      target: { value: 'autore' },
    })
    fireEvent.change(url, {
      target: { value: 'link' },
    })

    fireEvent.submit(form)

    expect(mockHandler.mock.calls.length).toBe(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('titolo')
    expect(mockHandler.mock.calls[0][0].author).toBe('autore')
    expect(mockHandler.mock.calls[0][0].url).toBe('link')
  })
})