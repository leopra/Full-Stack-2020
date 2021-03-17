import React, { useEffect } from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/FormAnecdote'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from "react-redux";
import anecdotesService from './services/anecdotes'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService
      .getAll().then(aneds => dispatch(initAnecdotes(aneds)))
  }, [dispatch])

  return (
    <div>
      <Notification></Notification>
      <Filter></Filter>
      <AnecdotesList></AnecdotesList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App