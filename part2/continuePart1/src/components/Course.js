import React from 'react';

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

export default Course