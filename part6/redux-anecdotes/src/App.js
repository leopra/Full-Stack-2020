import React from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/FormAnecdote'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <Notification ></Notification>
      <Filter></Filter>
      <AnecdotesList ></AnecdotesList>
      <AnecdoteForm ></AnecdoteForm>
    </div>
  )
}

export default App