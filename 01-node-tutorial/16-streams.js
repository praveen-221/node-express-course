const { createReadStream } = require('fs')

// stream is used to manipulate data sequentially
/*
Normal read can't handle big data since variable size is limited
  There are 4 types of streams:
  [1] writeable (write sequentially)
  [2] readable (read sequentially)
  [3] duplex (read & write seq)
  [4] transform (data can be modified while reading/wrriting)
*/
// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./content/big.txt', 'utf8')

//event name for stream is 'data' always
stream.on('data', (result) => {
  console.log(result)
})
//error event is also present which is emitted when error occurs
stream.on('error', (err) => console.log(err))
