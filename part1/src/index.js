import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (<h1>{props.course}</h1>)
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (<div><Part part={props.part1} exercises={props.exercises1} />
    <Part part={props.part2} exercises={props.exercises2} />
    <Part part={props.part3} exercises={props.exercises3} /></div>)
}



const Total = (props) => {
  return (<p>Number of exercises {props.a + props.b + props.c}</p>)
}

const App = () => {
const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content part1 = {parts[0].name} part2 = {parts[1].name} part3 = {parts[2].name} exercises1 = {parts[0].exercises} exercises2 = {parts[1].exercises} exercises3 = {parts[2].exercises}/>
      <Total a={parts[0].exercises} b={parts[1].exercises} c={parts[2].exercises} />

    </div>

    // <div>
    //   <h1>{course}</h1>
    //   <p>
    //     {part1} {exercises1}
    //   </p>
    //   <p>
    //     {part2} {exercises2}
    //   </p>
    //   <p>
    //     {part3} {exercises3}
    //   </p>
    //   <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    // </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))