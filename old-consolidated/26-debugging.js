const myFunction = () => {
  const tim = {
    name: 'Tim',
    age: 36
  }
  
  const bob = { 
    name: 'Bob',
    age: 21
  }

  num = Math.random()

  // We have to run node with inspect option immediately after
  // Also pull up the chrome://inspect
  debugger

  if (num > 0.5) {
    return tim.name
  } else {
    return bob.name
  }
}

console.log(myFunction())