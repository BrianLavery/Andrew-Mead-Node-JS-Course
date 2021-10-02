const sgMail = require('@sendgrid/mail')

// This is the "Task App" api key
const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
  to: 'brianplavery@gmail.com',
  from: 'brianplavery@gmail.com',
  subject: 'My gmail email',
  text: 'Using this to check I do not get a warning.'
})