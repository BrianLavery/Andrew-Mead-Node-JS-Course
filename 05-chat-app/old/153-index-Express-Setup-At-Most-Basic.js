const path = require('path')
const express = require('express')

const app = express()

// Set port and public directory path
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
