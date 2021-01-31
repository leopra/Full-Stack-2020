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

const Statistics = (props) => {
  return (<div>
    <div><h1>give feedback</h1></div>

    <div>
      <button onClick={() => props.setGood(props.good + 1)}>
        good
    </button>
      <button onClick={() => props.setNeutral(props.neutral + 1)}>
        neutral
    </button>
      <button onClick={() => props.setBad(props.bad + 1)}>
        bad
    </button>
    </div>
    <div><h1>statistics</h1></div>
    <div>good {props.good}</div>
    <div>neutral {props.neutral}</div>
    <div>bad {props.bad}</div>
    <div>
      <All good={props.good} neutral={props.neutral} bad={props.bad}></All>
      <Average good={props.good} neutral={props.neutral} bad={props.bad}></Average>
      <Percent good={props.good} neutral={props.neutral} bad={props.bad}></Percent>
    </div>
  </div>)
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <Statistics setGood={setGood} setNeutral={setNeutral} setBad={setBad} good={good} neutral={neutral} bad={bad}></Statistics>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)