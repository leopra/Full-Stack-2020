import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test',
  author: 'Leonardo',
  likes: 22,
  url: 'test.com',
  id: '255353352',
  user: {
    name: 'Leo',
    username: 'Leo',
    id: '2512316'
  }
}

describe('Blog tests', () => {

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {

    component = render(
      <Blog blog={blog} doLike={mockHandler} removeBlog={mockHandler} user={blog.user}>
      </Blog>
    )

  })

  test('renders author and title, not by default url and likes', () => {

    expect(
      component.container.querySelector('.titlediv')
    ).toHaveTextContent(blog.title)

    expect(
      component.container.querySelector('.authordiv')
    ).toHaveTextContent(blog.author)

    expect(
      component.getByTestId('behidden')
    ).toHaveStyle('display: none')
  })

  test('5.14 url and like appear when press button show', () => {

    const button = component.getByText('View')

    fireEvent.click(button)

    const hiddenContent = component.getByTestId('behidden')

    expect(hiddenContent
    ).not.toHaveStyle('display: none')

    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)

  })

  test('5.15 like button pressed twice', () => {

    const button = component.getByText('Like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })




})