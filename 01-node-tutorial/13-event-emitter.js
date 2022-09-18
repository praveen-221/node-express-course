// get back the class from events module
// if want custom event- extend from class with custom functionalities
// otherwise just for emitting and handling events create instance of the event emitter class
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// on and emit methods
// on - listen for an event
// emit - emit an event(execute that event)
// keep track of the order
// additional arguments
// built-in modules utilize it

// 1st argument is name of that event (string) which should be same in on & emit
customEmitter.on('response', (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`)
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

customEmitter.emit('response', 'john', 34)
