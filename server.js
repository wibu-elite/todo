const express = require('express')
const app = express ()
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const projectRoutes = require ('./routes/projectRoutes')
const taskRoutes = require ('./routes/taskRoutes')
const port = process.env.APP_PORT
// const appName = process.env.APP_NAME

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// {loginAuth}
app.use(userRoutes)
// {middleware}
app.use(projectRoutes)
app.use(taskRoutes)

app.listen(port, () =>{
  console.log("This App Listening on Port " + port)
})
