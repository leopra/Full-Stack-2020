import anecdoteService from "../services/anecdotes"

const initialState = []

const anedReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

    case 'VOTE':
      const id = action.data.res.id
      return state.map(aned => (aned.id === id) ? { ...aned, votes: aned.votes + 1 } : aned)

    case 'NEW_ANED':
      return [...state, action.data]

    case "INIT":
      return action.data

    default: return state

  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const res = await anecdoteService.createNewAned(data)
    dispatch({
      type: "NEW_ANED",
      data: res
    })
  }
}

export const doVote = (votedAnecdote) => {
  return async dispatch => {
    const res = await anecdoteService.updateAned({ ...votedAnecdote, votes: votedAnecdote.votes + 1 })
    dispatch({
      type: "VOTE",
      data: { res }
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anedReducer