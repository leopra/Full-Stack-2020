import React, { useState } from 'react'
import { ALL_BOOKS } from "../queries"
import { useQuery } from '@apollo/client'
import Select from "react-select"

const Books = (props) => {
  const [genre, setGenre] = useState("")
  const result = useQuery(ALL_BOOKS)


  if (!props.show) {
    return null
  }
  let books = result.data.allBooks
  books = genre ? result.data.allBooks.filter((bok) => bok.genres.includes(genre)) : books

  const handleChange = (data) => {
    const label = data?.label;
    setGenre(label)
  }

  let genres = result.data?.allBooks.flatMap(book => book.genres)

  const opts = Array.from(new Set(genres)).map(op => {
    return {
      value: op,
      label: op
    }
  }
  )

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Select
        options={opts}
        onChange={handleChange}
        value={genre ? { label: genre, value: genre?.toLowerCase() } : null}
      />
    </div>
  )
}

export default Books