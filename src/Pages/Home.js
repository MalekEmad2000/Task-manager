import React, { useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Note from '../components/Note'
import CreateArea from '../components/CreateArea'
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import NavBar from '../components/NavBar'
import { userContext } from './UserContext'

import Radio from '../components/Radio'
import { Navigate } from 'react-router'
import { useNavigate } from 'react-router'
import react from 'react'
import Swal from 'sweetalert2'

// sub prority too

import * as moment from 'moment'

// sub prority too
function sub(date, content, title, priority) {
  Axios.post('http://localhost:3001/api/insertNote', {
    userId: localStorage.getItem('userId'),
    due_date: date,
    description: content,
    title: title,
    priority: priority,
  }).then(() => {
    console.log('added to db')
  })
}

function Home() {
  const navigate3 = useNavigate()
  const [notes, setNotes] = React.useState([])
  const { value } = useContext(userContext)
  const [errorMessage, setErrorMessage] = React.useState('')
  // value contains user id use it for submisson

  react.useEffect(() => {
    if (localStorage.getItem('userId') == 'null') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User Not logged in',
        footer: '<p>Please Login or Register</p>',
      })
      navigate3('/')
    }
  }, [])

  function addNote(note) {
    const date = new Date()
    const taskDate = new Date(note.date)

    console.log(date.getDay)

    if (
      note.date === '' ||
      note.content === '' ||
      note.title === '' ||
      note.priority === ''
    ) {
      setErrorMessage('please fill all fields properly')
    } else if (
      moment.utc(note.date).add(1, 'days').format('MM/DD/YYYY') <
      moment.utc(moment().toDate()).format('MM/DD/YYYY')
    ) {
      setErrorMessage(
        'you cant enter a task with a date earlier than todays date '
      )
    } else {
      sub(note.date, note.content, note.title, note.priority)
    }
  }

  function deleteNote(id) {
    setNotes((prevNote) => {
      return prevNote.filter((noteItem, index) => {
        return index !== id
      })
    })
  }

  return (
    <div>
      <Helmet>
        <link rel='stylesheet' href='styles.css' />
      </Helmet>

      <NavBar />
      <CreateArea onAdd={addNote} />

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            date={noteItem.date}
            title={noteItem.title}
            priority={noteItem.priority}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        )
      })}
      <p className='error'>{errorMessage}</p>

      <Footer />
    </div>
  )
}

export default Home
