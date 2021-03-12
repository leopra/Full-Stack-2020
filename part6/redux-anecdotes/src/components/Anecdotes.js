import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}
const AnecdotesList = () => {
  const anecdotes = useSelector(state => state)
  console.log('aaaaaaa', anecdotes)
  const dispatch = useDispatch()

  return (
    <div><h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => (a.votes<b.votes ? 1 : -1)).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(doVote(anecdote.id))} />
      )}
    </div>
  )
}

export default AnecdotesList