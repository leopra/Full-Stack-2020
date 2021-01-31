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

const Statistic = (props) => {
  return (<div>{props.text} {props.value}</div>)
}
const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad) !== 0) {

    return (<div>
      <div><h1>statistics</h1></div>
      <Statistic text='good' value={props.good}></Statistic>
      <Statistic text='neutral' value={props.neutral}></Statistic>
      <Statistic text='bad' value={props.bad}></Statistic>

      <div>
        <All good={props.good} neutral={props.neutral} bad={props.bad}></All>
        <Average good={props.good} neutral={props.neutral} bad={props.bad}></Average>
        <Percent good={props.good} neutral={props.neutral} bad={props.bad}></Percent>
      </div>
    </div>)
  }
  else {
    return (<div><h1>statistics</h1>
      <div>no feedback given</div></div>
    )
  }
}

const Button = (props) => {
  return (<button onClick={() => props.func(props.value + 1)}>
    {props.text}
    </button>)
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div><div><h1>give feedback</h1></div>

      <div>
      <Button func = {setGood} value={good} text='good' ></Button>
      <Button func = {setNeutral} value={neutral} text='neutral' ></Button>
      <Button func = {setBad} value={bad} text='bad' ></Button>

      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>)

}

ReactDOM.render(<App />,
  document.getElementById('root')
)