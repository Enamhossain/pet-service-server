const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vz4h6lc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
      const serviceCollection = client.db('petCare').collection('service') ;

      app.get('/services', async (req, res) => {
          const query = {}
          const cursor = serviceCollection.find(query);
          const services = await cursor.toArray();
          res.send(services);
      });

      app.get('/allservice/:id', async(req,res) => {
        const id = req.params.id;
        const query = { _id:ObjectId(id) }
        const service = await serviceCollection.findOne(query)
        res.send(service) 
      })
    }
    finally {

    }

}

run().catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello pet service server!')
})

app.listen(port, () => {
  console.log(`Start pet server port ${port}`)
})