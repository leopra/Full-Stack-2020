import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  console.log(course.parts)
  const total = course.parts.reduce((s, p) => {return {exercises: s.exercises + p.exercises}})
  return (
    <p>Number of exercises {total.exercises}</p>
  )
}

const Part = (prop) => {
  return (
    <p>
      {prop.part.name} {prop.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map(part => <Part key={part.id} part={part}></Part>)}
    </ul>
  )
}

const Course = ({ course }) => {
  return (<div>
    <Header course={course}></Header>
    <Content course={course}></Content>
    <Total course={course}></Total>
  </div>
  )
}




const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))