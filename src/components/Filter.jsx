import React, { useContext } from 'react'
import { isPropertySignature } from 'typescript'

function Filter(props) {
  // export filter or pass function as prop
  const [filter, setFilter] = React.useState('all')
  const [search, setSearch] = React.useState('')
  const [sort, setSort] = React.useState('none')

  function apply() {
    props.onFilter(filter, sort, search)
  }

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'search') {
      setSearch(value)
    } else if (name === 'sort') {
      setSort(value)
    } else {
      setFilter(value)
    }

    //props.onFilter(filter, sort, search)
  }

  function clearSearch() {
    console.log('clear initiated')
    setSearch('')
  }

  return (
    <div>
      <input
        className='search'
        name='search'
        value={search}
        placeholder='search for task'
        onChange={handleChange}
      />
      <button className='search-button' onClick={clearSearch}>
        clear
      </button>
      <br />
      <label>filter by</label>
      <select name='filter' placeholder='Filter by' onChange={handleChange}>
        <option>all</option>
        <option>in progress</option>
        <option>upcoming</option>
        <option>overdue</option>
      </select>

      <label>sort by</label>
      <select name='sort' placeholder='sort by' onChange={handleChange}>
        <option>none</option>
        <option>date</option>
        <option>priority</option>
      </select>
      <button className='search-button' onClick={apply}>
        Apply
      </button>
      <hr className='dots' />
    </div>
  )
}

export default Filter
