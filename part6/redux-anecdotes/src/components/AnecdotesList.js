import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

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
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter).filter
  const anecdotes = useSelector(state => state.anecdotes)
  console.log(anecdotes)

  const handleVote = (votedAnecdote) => {
    dispatch(doVote(votedAnecdote.id))
    dispatch(setNotification(`You voted ${votedAnecdote.content}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const filterAneds = (aneds) => {
    console.log('aneds', aneds)
    if (filter === "" || !filter) return aneds
    else {
      return aneds.filter(aned => aned.content.toLowerCase().includes(filter.toLowerCase()))
    }

  }

  return (
    <div><h2>Anecdotes</h2>
      {filterAneds(anecdotes).sort((a, b) => (a.votes < b.votes ? 1 : -1)).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote)} />
      )}
    </div>
  )
}

export default AnecdotesList