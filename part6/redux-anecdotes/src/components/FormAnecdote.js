import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from "../reducers/notificationReducer";
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdotesService.createNewAned(content)
    dispatch(createAnecdote(newAnecdote))
  }

  return (<div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div ><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  </div>)
}

export default AnecdoteForm