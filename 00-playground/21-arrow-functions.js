// Example of where not to use Arrow function and where to use it
const socialEvent = {
  name: 'Birthday Party',
  guestList: ['Andrew', 'Ken', 'Jen'],
  // Do not use an Arrow function here as want to bind this
  printGuestList() {
    console.log('Guest list for ' + this.name)

    this.guestList.forEach((guest) => {
      console.log(guest + ' is attending ' + this.name)
    })
  }
}

socialEvent.printGuestList()