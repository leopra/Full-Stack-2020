import anecdoteService from "../services/anecdotes"

const initialState = []

const anedReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

    case 'VOTE':
      const id = action.data.votedAnecdote
      console.log('asfafff', id)
      return state.map(aned => (aned.id === id) ? { ...aned, votes: aned.votes + 1 } : aned)

    case 'NEW_ANED':
      return [...state, action.data]

    case "INIT":
      return action.data

    default: return state

  }
}

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANED",
    data: data
  }
}

export const doVote = (votedAnecdote) => {
    return {
      type: "VOTE",
      data: { votedAnecdote }
    }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default anedReducer