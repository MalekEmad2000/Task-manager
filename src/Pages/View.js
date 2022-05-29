import React, { useContext } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Filter from '../components/Filter'
import { Helmet } from 'react-helmet'
import Note from '../components/Note'
import Axios from 'axios'
import react from 'react'
import * as moment from 'moment'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

function View() {
  const navigate3 = useNavigate()

  const [posts, setPosts] = react.useState([])
  const [objPosts, setObjPosts] = react.useState([])

  react.useEffect(() => {
    if (localStorage.getItem('userId') == 'null') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User Not logged in',
        footer: '<p>Please Login or Register</p>',
      })
      navigate3('/')
      return
    }
    Axios.post('http://localhost:3001/api/retriveTasks', {
      userId: localStorage.getItem('userId'),
    }).then((res) => {
      setPosts(res.data)
      setObjPosts(res.data)
    })
  }, [])

  function alterPosts(filter, sort, search) {
    let posts1 = objPosts

    posts1 = posts1.filter((post) => post.title.includes(search))

    if (filter == 'in progress') {
      console.log('inprog')

      posts1 = posts1.filter(
        (e) =>
          moment.utc(e.due_date).add(1, 'days').format('MM/DD/YYYY') ===
          moment.utc(moment().toDate()).format('MM/DD/YYYY')
      )
    }
    if (filter == 'upcoming') {
      console.log('upcoming')
      posts1 = posts1.filter(
        (e) =>
          moment.utc(e.due_date).add(1, 'days').format('MM/DD/YYYY') >
          moment.utc(moment().toDate()).format('MM/DD/YYYY')
      )
    }
    if (filter == 'overdue') {
      console.log('overdue')
      posts1 = posts1.filter(
        (e) =>
          moment.utc(e.due_date).add(1, 'days').format('MM/DD/YYYY') <
          moment.utc(moment().toDate()).format('MM/DD/YYYY')
      )
    }

    if (sort == 'priority') {
      posts1.sort((a, b) =>
        a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0
      )
    }

    if (sort == 'date') {
      posts1.sort((a, b) =>
        a.due_date > b.due_date ? 1 : b.due_date > a.due_date ? -1 : 0
      )
    }
    setPosts(posts1)
  }

  function editNote(taskid, title, description, due_date, priority) {
    // insert back end code fo editing
    console.log(moment.utc(due_date).format('YYYY-MM-DD'))

    Axios.post('http://localhost:3001/api/editNote', {
      due_date: moment.utc(due_date).format('YYYY-MM-DD'),
      description: description,
      title: title,
      priority: priority,
      taskid: taskid,
    }).then(() => {
      console.log('task edited')
    })
    // update in db u dont need to re render
  }

  function deleteNote(taskid) {
    // insert back end code for delete here u have task id and logged in user id

    Axios.post('http://localhost:3001/api/deleteTask', {
      taskid: taskid,
      userId: localStorage.getItem('userId'),
    }).then(() => {
      console.log('task removed')
      setPosts(posts.filter((post) => post.taskid !== taskid))
    })
  }

  return (
    <div>
      <Helmet>
        <link rel='stylesheet' href='styles.css' />
      </Helmet>

      <NavBar />
      <h1></h1>
      <Filter onFilter={alterPosts} />

      {posts.map((post) => {
        return (
          <Note
            key={post.taskid}
            index={post.taskid}
            title={post.title}
            content={post.description}
            priority={post.priority}
            date={moment.utc(post.due_date).add(1, 'days').format('MM/DD/YYYY')}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        )
      })}
      <Footer />
    </div>
  )
}

export default View
