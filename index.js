// don't use .env files in production
// they should be set directly on the host machine
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.NODE_PORT;

app.use(express.json())
app.use(cors())

const {insertData, removeData, removeDataById, listAllData} = require('./crud')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/recipes', async (req, res) => {
    const data = await listAllData()
    console.log(data)
    res.send(data.rows)
})

app.post('/add', (req,res)=>{
    console.log(req.body)
    let {recipe, ingredients, directions} = req.body
    let newRecipe = {
        recipe,
        ingredients,
        directions
    }
    try{
        insertData(newRecipe)
        res.send(newRecipe)
    }
    catch(e){
        console.log(e)
        res.error(500)
    }
})

app.post('/remove', (req,res)=>{
    console.log(req.body)
    let {recipe} = req.body

    try{
        removeData(recipe)
        res.send("Removed recipe: " + recipe)
    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }
})

app.post('/removeid', (req,res)=>{
    console.log(req.body)
    let {id} = req.body

    try{
        removeDataById(id)
        res.send("Removed id: "+id)
    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})