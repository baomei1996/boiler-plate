const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..")).catch((err) => console.log(err))

app.get('/', (req, res) => res.send('실시간 노드 구동은 nodemon'))
app.listen(port, () => console.log(`Example app listening on port ${port}`))

app.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, doc) => {
    if(err) return res.json({ success: false })
    return res.status(200).json({ success: true })
  });
})


