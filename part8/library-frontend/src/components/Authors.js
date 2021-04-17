
import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import { useQuery } from '@apollo/client'
import { useMutation } from "@apollo/client"
import Select from "react-select";

const Authors = (props) => {
  const [name, setName] = useState("")
  let [setBornTo, setBornDate] = useState("")

  const result = useQuery(ALL_AUTHORS)
  let authors = []

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })



  const submit = async (event) => {
    event.preventDefault()
    setBornTo = Number(setBornTo)
    console.log("bonr", setBornTo)
    console.log("bonr", name)

    updateAuthor({ variables: { name, setBornTo } })

    setName("")
    setBornDate("")
  }

  if (!props.show) {
    return null
  }

  let possibleAuth = []

  if (!result.loading) {
    authors = result.data?.allAuthors
    possibleAuth = authors.map((op) => {
      return {
        value: op.name,
        label: op.name,
      }
    })
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  
  
  else {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
            </th>
              <th>
                books
            </th>
            </tr>
            {authors?.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <label>
                name
          </label>
          <Select
          placeholder="author..."
          options={possibleAuth}
          onChange={({ label }) => setName(label)}
        /></div>
            <div>
              <label>
                born
          </label>
              <input
                value={setBornTo}
                onChange={({ target }) => setBornDate(target.value)}
              />
            </div>
            <button type="submit">Update author</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Authors
