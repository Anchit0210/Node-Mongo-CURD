const express = require("express");
const mongoose = require('mongoose');
const People = require('./models/people-model')
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.get('/',(req,res)=>{
    res.send("Hello Everyone");
})


app.post('/people',async(req,res)=>{
    try {
        const people = await People.create(req.body)
        res.status(200).json(people);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
    // console.log(req.body)
    // res.send(req.body)
})

app.get('/people', async(req, res) => {
    try {
        const peoples = await People.find({});
        res.status(200).json(peoples);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/people/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const people = await People.findById(id);
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Update people

app.put('/people/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const people = await People.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!people){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedPeople = await People.findById(id);
        res.status(200).json(updatedPeople);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Delete people

app.delete('/people/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const people = await People.findByIdAndDelete(id);
        if(!people){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(people);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(3000,()=>{
    console.log("this is working");
})

mongoose.connect('mongodb+srv://anchit:anchit951@mongocwh.gksomxt.mongodb.net/RD-node-api?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));