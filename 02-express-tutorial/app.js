const { urlencoded } = require('express');
const express = require('express')
const app = express()
const {people} = require('./data');
const login = require('./routes/auth');

app.use(express.static('./methods-public'));
app.use(urlencoded({extended: false}))
app.use(express.json())

// using router for login by adding it
app.use('/login', login);

app.get('/api/people', (req, res)=>{
    console.log(people);
    res.status(200).json({success: true, data: people});
})

// app.post('/login', (req, res)=>{
//     const {name} = req.body;
//     if(name){
//       res.status(200).send(`Welcome ${name}`);
//     } else {
//       res.status(401).send("enter name :):");
//     }
// })

app.post('/api/people', (req, res)=>{
  const {name} = req.body;
  if(!name){
    return res.status(400).json({sucess:false, msg:"Please enter name :):"});
  }
  res.status(201).json({success: true, person:name})
})

app.put('/api/people/:id', (req, res)=>{
  const {id} = req.params;
  const {name} = req.body;
  const person = people.filter((person)=> person.id === Number(id));

  if(!person) {
    return res.status(304).json({success: false, msg: `No person with id:${id}`});
  } 
  // const pepl = people;
  const newPeople = people.map((person)=> {
    if(person.id === Number(id)){
      person.name = name;
    }
    return person;
  })
  return res.status(200).json({success:true, data: newPeople});
})

app.delete('/api/people/:id', (req, res)=>{
  const {id} = req.params;
  const person = people.find((person)=> person.id === Number(id));

  if(!person) {
    return res.status(404).json({success: false, msg: `No person with id:${id}`});
  } 
  // const pepl = people;
  const newPeople = people.filter((person)=> person.id != Number(id));
  return res.status(200).json({success:true, data: newPeople});
})

app.get ('/api/people/:id/gibbi/:reviewID', (req, res)=>{
  console.log(req.params);
  res.json({success:true, response: "received"});
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})