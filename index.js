
const express = require('express');
const bodyParser =require('body-parser');



const passord='hasim0011';
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { response } = require('express');
const uri = "mongodb+srv://hasim:hasim0011@cluster0.6omflfw.mongodb.net/db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get( '/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
  const collection = client.db("db").collection("product");




  app.get('/showProducts', (req, res) => {

    collection.find({})
    .toArray((err,documents) => {
      res.send(documents);
    })


  })


 







  app.post("/addProduct", (req, res) => {

        const productdata = req.body;
        collection.insertOne(productdata)
        .then(result => {
            console.log('data insert successs');
            
            res.redirect('/');
        })
  })



  // perform actions on the collection object
//    console.log('database connected');
//     const docs={name:"honey", price:200, quantity:20,description:"honey is"};
//     collection.insertOne(docs);
//    collection.insertOne()

app.delete('/delete/:id', (req,res)=> {

  console.log(req.params.id);

  collection.deleteOne({_id: ObjectId(req.params.id)})
  .then( (err, result) => {
      res.redirect('/');
  })

})

//l0ad product to update
app.get('/product/:id', (req, res) => {
  collection.find({_id: ObjectId(req.params.id)})
  .toArray((err, documents) =>{
    res.send(documents[0]);

  })
})


app.patch('/update/:id', (req, res)=>{

  collection.updateOne({_id:ObjectId(req.params.id)},
  {
    $set:{name: req.body.name, price: req.body.price, quantity: req.body.quantity, description: req.body.description}
  })
  .then( result => {
    console.log('updated');
  })
})




  
});







app.listen(8000);