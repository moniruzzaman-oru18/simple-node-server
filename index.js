//user id : siara-db-user; pass: sslDBuser;
const express = require('express')
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
app.use(cors());
app.use(express.json());

const port = 8000



const uri = "mongodb+srv://siara-db-user:sslDBuser@cluster0.tg9yj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    const database = client.db("Tutor-Info");
    const usersCollection = database.collection("users");
    //GET API
    app.get('/users',async(req,res) =>{
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.get('/users/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const user = await usersCollection.findOne(query);
      console.log('load an user with id: ', id);
      res.send(user);
    })


    //POST API
    app.post('/users', async(req,res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      console.log('got new user',req.body);
      console.log('added user',result);
      res.json(result);
    });


    //UPDATE API
    app.put('/users/:id', async(req,res) =>{
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = {_id: ObjectId(id)};
      const options = {upsert: true};
      const updateDoc = {
        $set: {
            name: updatedUser.name,
            email: updatedUser.email
        },
      };
      const result = await usersCollection.updateOne(filter,updateDoc,options);
      console.log('updating user: ', id);
      res.json(result);
    }) ;

    //DELETE API
    app.delete('/users/:id',async(req,res) =>{
      const id =req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      console.log('deleting user with id: ', result);
      res.json(result);
    });


  }
  finally {
    //await client.close();
  }
}
run().catch(console.dir);



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
  console.log(`app listening on port ${port}`)
})