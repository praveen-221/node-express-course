const express = require('express')
const app = express()
const { products } = require('./data')

app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>')
})
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product
    return { id, name, image }
  })

  res.json(newProducts)
})

//route parameter which is called as ':'name 
app.get('/api/products/:productID', (req, res) => {
  // console.log(req)
  // console.log(req.params)
  // store the named route from req.params or else err of undefined object occurs
  const { productID } = req.params

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  )
  /* Another way of accessing params from req.params
    const id = req.params;
    console.log(id);
    const newProduct = products.find((product)=>{
        return product.id === Number(id.productID);
    });
  */
  if (!singleProduct) {
    return res.status(404).send('Product Does Not Exist')
  }

  return res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params)
  res.send('hello world')
})

/*
here search is used eventhough req.query is for destructuring
app.get('/api/v1/search', (req, res)=>{
    const {start, limit} = req.query;
    console.log(req.query);
    res.send("Hello :):");
})
*/
app.get('/api/v1/query', (req, res) => {
  // whatever the name is in the url (in place of query) it should be destructured as req.query otherwise the object is undefined
  // console.log(req.query)
  const { search, limit } = req.query
  let sortedProducts = [...products]

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    // if return is not used when two response are being sent which cause errors
    // whenever two response is sent based on condition use return
    return res.status(200).json({ sucess: true, data: [] })
  }
  res.status(200).json(sortedProducts)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
