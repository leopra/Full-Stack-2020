import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const All = (props) => {
  return (<div>all {props.good + props.neutral + props.bad}</div>)
}

const Average = (props) => {
  return (<div>average {(props.good * 1 + props.neutral * 0 + props.bad * -1) / (props.good + props.neutral + props.bad)} </div>)
}

const Percent = (props) => {
  return (<div>positive {(props.good) / (props.good + props.neutral + props.bad)} </div>)
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div><h1>give feedback</h1></div>

      <div>
        <button onClick={() => setGood(good + 1)}>
          good
      </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          neutral
      </button>
        <button onClick={() => setBad(bad + 1)}>
          bad
      </button>
      </div>
      <div><h1>statistics</h1></div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>
        <All good={good} neutral={neutral} bad={bad}></All>
        <Average good={good} neutral={neutral} bad={bad}></Average>
        <Percent good={good} neutral={neutral} bad={bad}></Percent>
      </div>
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)