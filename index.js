const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World! asdfasdf')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.get('/mtg', (req, res) => {
//   res.send('Here are simple rules for mtg')
// })

// app.get('/dandan', (req, res) => {
//   res.send('Here are the rules for dandan')
// })
