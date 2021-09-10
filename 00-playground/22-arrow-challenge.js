const tasks = {
  tasks: {
    tasks: [{
      text: 'Grocery shopping',
      completed: true
    }, {
      text: 'Clean yard',
      completed: false
    }, {
      text: 'Film course',
      completed: false
    }]
  },
  getTasksToDo() {
    return this.tasks.tasks.filter((task) => !task.completed)
  }
}



console.log(tasks.getTasksToDo())