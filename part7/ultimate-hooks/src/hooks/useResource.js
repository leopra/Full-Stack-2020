import axios from 'axios'
import React, { useState, useEffect } from 'react'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const result = await axios.get(baseUrl)
    return setResources(result.data)
  }

  const create = async (resource) => {
    const result = await axios.post(baseUrl, resource)
    setResources([...resources, result.data])
  }

  const service = {
    create,
    getAll
  }

  return [
    resources, service
  ]
}

export default useResource