import React from "react"
import { connect } from 'react-redux'
import { filter } from "../reducers/filterReducer"

const Filter = ({ filter }) => {

  const handleChange = (event) => {
    const filterValue = event.target.value
    filter(filterValue)
  }

  return (
    <div>
      <label>Filter</label>
      <input onChange={handleChange} />
    </div>
  )
}

const FilterCon = connect(null, { filter })(Filter);

export default FilterCon