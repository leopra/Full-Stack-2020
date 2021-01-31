import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const VoteAned = function (points, vote, updateVotes) {
  const copy = [...points];
  copy[vote] += 1;
  updateVotes(copy)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, updateVotes] = useState(new Array(6).fill(0))

  const votemax = Math.max(...votes);
  const best = props.anecdotes[votes.indexOf(votemax)];


  return (
    <div>
      <h2>Anecdote of the Day</h2>

      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        <button onClick={() => VoteAned(votes, selected, updateVotes)}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      </div>
      <div>has {votes[selected]} votes</div>
      <h2>Anecdote with most votes</h2>
      <p>{best}</p>
      <p>has {votemax} votes</p>
    </div >
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)