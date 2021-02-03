import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  console.log(course.parts)
  const total = course.parts.reduce((s, p) => { return { exercises: s.exercises + p.exercises } })
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course}></Course>)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))