import React from "react"
import { useDispatch} from 'react-redux'
import { filter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterValue = event.target.value
    console.log(filterValue)
    dispatch(filter(filterValue))
  }

  return (
    <div>
      <label>Filter</label>
      <input onChange={handleChange} />
    </div>
  )
}

export default Filter