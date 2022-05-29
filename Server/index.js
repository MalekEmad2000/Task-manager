require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const { env } = require('process')
// const db = require('./util/database.js');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'taskmanagmentsystem',
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/registerUser', (req, res) => {
  const Username = req.body.Username
  const password = req.body.password
  console.log(Username)
  const insertToTable = `INSERT INTO taskmanagmentsystem.users (userName,password) VALUES (?,?);`
  console.log('request Came')
  db.query(insertToTable, [Username, password], (err, result) => {
    if (err == null) {
      res.send('FINE')
    } else {
      res.send('NOT FINE')
    }
  })
})

app.post('/api/loginUser', (req, res) => {
  const Username = req.body.Username
  const password = req.body.password
  const getFromTable = `SELECT * FROM taskmanagmentsystem.users WHERE userName = ? and password = ?;`
  console.log('login Came')

  db.query(getFromTable, [Username, password], (err, result) => {
    if (result.length == 0) {
      res.send('NOT FINE')
    } else {
      res.send('' + result[0]['userId'])
    }
  })
})

app.post('/api/insertNote', (req, res) => {
  const insertToTable = `INSERT INTO task (userid,title, due_date, description,status,priority)VALUES (?,?, ?,?,?,?);`
  const due_date = req.body.due_date
  const description = req.body.description
  const title = req.body.title
  const status = 'uncompleted'
  const userid = req.body.userId
  const priority = req.body.priority
  console.log('request Came')
  db.query(
    insertToTable,
    [userid, title, due_date, description, status, priority],
    (err, result) => {
      console.log(err)
      console.log(result)

      if (err == null) {
        res.send('FINE')
      } else {
        res.send('NOT FINE')
      }
    }
  )
})

// this method u send me the note id and all the attributes

app.post('/api/editNote', (req, res) => {
  const editNote = `UPDATE task SET  due_date=? , description = ?, title = ?, priority = ? WHERE taskid = ?;`

  const due_date = req.body.due_date
  const description = req.body.description
  const title = req.body.title
  const priority = req.body.priority
  const taskid = req.body.taskid

  console.log('request Came')
  db.query(
    editNote,
    [due_date, description, title, priority, taskid],
    (err, result) => {
      console.log(err)
      console.log(result)

      if (err == null) {
        res.send('Note Updated')
      } else {
        res.send('Not Updated')
      }
    }
  )
})

//get tasks with the userId
app.post('/api/retriveTasks', (req, res) => {
  const getTasks = `SELECT * FROM taskmanagmentsystem.task where userId = ?;`

  const userId = req.body.userId

  console.log('request Came')

  db.query(getTasks, [userId], (err, result) => {
    console.log(err)

    res.send(result)
  })
})

app.post('/api/changeTaskStatus', (req, res) => {
  const updateStatus = `UPDATE task SET  status = ? WHERE taskid = ?;`

  const status = req.status
  const taskid = req.taskid

  console.log('request Came')
  db.query(updateStatus, [status, taskid], (err, result) => {
    console.log(err)
    console.log(result)

    res.send(result)
  })
})

app.post('/api/getAssignedTasks', (req, res) => {
  const getAssignedTasks = `select * from tasksassigned where userid2 = ?;`

  const userId = req.body.userId

  console.log('request Came')
  db.query(getAssignedTasks, [userId], (err, result) => {
    console.log(err)
    console.log(result)

    res.send(result)
  })
})

app.post('/api/deleteTask', (req, res) => {
  const deleteTask =
    'delete from `taskmanagmentsystem`.task where taskid = ? and userid = ?;'

  const userId = req.body.userId
  const taskid = req.body.taskid

  console.log('delete request Came')
  console.log(taskid)
  db.query(deleteTask, [taskid, userId], (err, result) => {
    console.log(err)
    console.log(result)
    res.send('Task Deleted')
  })
})

app.listen(3001, () => {
  console.log('running on port 3001')
})
