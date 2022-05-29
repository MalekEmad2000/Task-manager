import React from 'react'

function CreateArea(props) {
  // is expanded is not used now
  const [isExpanded, setExpanded] = React.useState(true)

  const [note, setNote] = React.useState({
    title: '',
    content: '',
    date: '',
    priority: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      }
    })
  }
  function submitNote(event) {
    //setExpanded(false);
    props.onAdd(note)
    setNote({
      title: '',
      content: '',
      date: '',
      priority: '',
    })
    event.preventDefault()
  }

  function expand() {
    setExpanded(true)
    console.log(isExpanded)
  }

  return (
    <div>
      <form>
        {isExpanded && (
          <input
            onChange={handleChange}
            name='title'
            value={note.title}
            placeholder='Task name '
          />
        )}

        <textarea
          onChange={handleChange}
          name='content'
          onClick={expand}
          value={note.content}
          placeholder='Task description ...'
          rows={isExpanded ? '3' : 1}
        />
        <select
          name='priority'
          className='drop'
          placeholder='Filter by'
          onChange={handleChange}
          value={note.priority}
        >
          <option value=''>choose priority</option>
          <option value='high'>high</option>
          <option value='medium'>medium</option>
          <option value='low'>low</option>
        </select>
        {isExpanded && (
          <input
            onChange={handleChange}
            name='date'
            type='date'
            value={note.date}
          />
        )}
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  )
}

export default CreateArea
