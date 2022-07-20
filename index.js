const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());

const port = 8000

app.get('/', (req, res) => {
  res.send('Hello & Greetings From MY-TUTE')
})

const users = [

    {id:0, name: 'oru', email: 'moniruzzaman@gmail.com' },
    {id:1, name: 'rezwan', email: 'rezwann@gmail.com' },
    {id:2, name: 'ashif', email: 'ashif@gmail.com' },
    {id:3, name: 'brishty', email: 'brishty@gmail.com' },
    {id:4, name: 'maruf', email: 'maruf@gmail.com' },
]
app.get('/users',(req,res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id]
    res.send(user);
} )

app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length;
  users.push(newUser);
  console.log('hitting the post',req.body)
  res.json(newUser)
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})