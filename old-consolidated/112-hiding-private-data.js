const pet = {
  name: 'Hal',
  password: 123456
}

pet.toJSON = function () {
  const pet = this
  delete pet.password
  return pet
}

console.log(JSON.stringify(pet))
