import React from 'react'
import AnecdotesList from './components/Anecdotes'
import AnecdoteForm from './components/FormAnecdote'

const App = () => {

  return (
    <div>
      <AnecdotesList ></AnecdotesList>
      <AnecdoteForm ></AnecdoteForm>
    </div>
  )
}

export default App