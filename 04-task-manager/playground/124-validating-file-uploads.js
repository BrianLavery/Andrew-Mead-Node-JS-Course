// THIS NEEDS TO BE IN INDEX.JS TO WORK

const multer = require('multer') // Create new instances based on needs of application and filetype
// We are getting a new instance
const upload = multer({
  dest: 'images', // Name for folder where uploads should be stored
  limits: { // You can set more limits but file size is most common
    fileSize: 1000000 // Number in bytes
  },
  // We use this for filetype; takes a function with arguments request, file itself, callback (often called cb)
  fileFilter(req, file, cb) { // Documentation here https://www.npmjs.com/package/multer
    // if (!file.originalname.endsWith('.pdf')) { // Use this to reject non pdf
    //   return cb(new Error('Plesae upload a pdf'))
    // }

    if (!file.originalname.match(/\.(doc|docx)$/)) { // Use this to reject non doc/docx
      return cb(new Error('Please upload a Word document'))
    }

    cb(undefined, true)

    // cb(new Error('File must be a pdf')) // This is how we would call cb
    // cb(undefined, true) // This is how we say things went well
    // cb(undefined, false) // This is how we silently reject the file upload
  }
})
// We are now setting up an endpoint where client can set up files
// We are providing some middleware here as the second argument (upload.single) => takes argument - name of upload
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})
