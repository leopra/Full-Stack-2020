import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = {
  headers: { Authorization: `${token}` }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {

  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const update = async (id, updatedObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return request.data

}

export default { getAll, setToken, create, update }