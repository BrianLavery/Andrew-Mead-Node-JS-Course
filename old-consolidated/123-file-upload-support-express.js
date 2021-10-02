// THIS NEEDS TO BE IN INDEX.JS TO WORK

// PLAYGROUND FILES
const multer = require('multer') // Create new instances based on needs of application and filetype
// We are getting a new instance
const upload = multer({
  dest: 'images' // Name for folder where uploads should be stored
})
// We are now setting up an endpoint where client can set up files
// We are providing some middleware here as the second argument (upload.single) => takes argument - name of upload
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})