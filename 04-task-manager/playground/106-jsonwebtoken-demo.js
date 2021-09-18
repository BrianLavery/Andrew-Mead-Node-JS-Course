const jwt = require('jsonwebtoken')

const myFunction = async () => {
  // .sign creates a jwt and returns a jwt
  // Arguments - first one needs a unique value, we can use id
  // Arguments - second is a secret to sign token to ensure it is signed. Need random characters
  // We can expire token - we can enter it in as plain text, e.g. 7 days, 60 seconds
  const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', { expiresIn: '60 seconds'})
  console.log(token)
  // JWT is 3 parts separated by '.'
  // 1) Header - meta info base-64 JSON encoded string
  // 2) Payload - in our case will be id
  // 3) Signature - what we provide
  // JWT is to create data that is verfiable by the secret
  // Take payload to https://www.base64decode.org/ and can view the payload - iat is timestamp

  // Can verify using another function
  // 2 arguments - a) token, b) secret
  // Will return payload if success else throw error
  const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data)

  // THis one will throw error
  const wrongData = jwt.verify(token, 'wrongsecret')
  console.log(wrongData)

}

myFunction()
