import React from "react"
import { ALL_BOOKS, ME } from "../queries"
import { useQuery } from "@apollo/client"

const Recommend = (props) => {
  const result = useQuery(ME)

  const favoriteGenre = result.data?.me.favoriteGenre

  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { filterByGenre: favoriteGenre },
    fetchPolicy: "no-cache",
  })

  if (!props.show) {
    return null
  }

  if (loading || result.loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Recommendations</h1>
      <p>Books in your favorite genre: {favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.filter(book => book.genres.includes(favoriteGenre)).map((a) => (
            <tr>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend