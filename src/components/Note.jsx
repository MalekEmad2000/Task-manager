import React, { useState, useRef } from 'react'

// note component

function Note(props) {
  
  const [editable, setEditable] = useState(false)
  const [toggle, setToggle] = useState('EDIT')
  const titleRef = useRef()
  const descriptionRef = useRef()
  const dueDateRef = useRef()
  const priorityRef = useRef()


  function handleClick() {
    props.onDelete(props.index)
  }

  function edit(event) {
    if (event.target.name === 'EDIT') {
      setToggle('OK')
      setEditable(true)
      console.log(titleRef.current.innerHTML)
    } else {
     
      props.onEdit(
        props.index,
        titleRef.current.innerHTML,
        descriptionRef.current.innerHTML,
        dueDateRef.current.innerHTML,
        priorityRef.current.innerHTML
      )
      setToggle('EDIT')
      setEditable(false)
    }

    console.log('edit for note has been initiated')
  }

  return (
    <div className='note'>
      <h1
        ref={titleRef}   
        value={props.title}
        name='title'
        suppressContentEditableWarning={true}
        contentEditable={editable}
      >
        {props.title}
      </h1>
      <p
        ref={descriptionRef}
        name='description'
        suppressContentEditableWarning={true}
        contentEditable={editable}
      >
        {props.content}
      </p>
      <p
        ref={dueDateRef}   
        name='due_date'
        suppressContentEditableWarning={true}
        contentEditable={editable}
      >
        {props.date}
      </p>
      <p
        ref={priorityRef}
        name='priority'
        suppressContentEditableWarning={true}
        contentEditable={editable}
      >
        {props.priority}
      </p>

      <button onClick={handleClick}>DELETE</button>
      <button className='edit' name={toggle} onClick={edit}>
        {toggle + '  '}
      </button>
    </div>
  )
}

export default Note
