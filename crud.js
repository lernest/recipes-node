// allow the program to use the db connection to query the db
const { pool } = require('./db');

async function insertData({recipe, ingredients, directions}){
    console.log(recipe, ingredients, directions)

    try{
        const res = await pool.query(
            "INSERT INTO recipes (recipe, ingredients, directions) VALUES ($1, $2, $3)",
            [recipe, ingredients, directions]
        );
        console.log(`Added a recipe: ${recipe}`)
    }
    catch(e){
        console.log(e)
    }
}

async function removeData(recipe){
    console.log(recipe)

    try{
        const res = await pool.query(
            "DELETE FROM recipes WHERE recipe = $1",
            [recipe]
        );
        console.log(res)
        console.log(`Removed a recipe: ${recipe}`)
    }
    catch(e){
        console.log(e)
    }
}

module.exports = { insertData, removeData }