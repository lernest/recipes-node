// allow the program to use the db connection to query the db
const { pool } = require('./db');

/*
    Insert a new recipe into the database
*/
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

/*
    Remove a recipe from the database by recipe name
*/
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

/*
    Remove a recipe from the database by id
*/
async function removeDataById(recipe_id){
    console.log(recipe_id)

    try{
        const res = await pool.query(
            "DELETE FROM recipes WHERE id = $1",
            [recipe_id]
        );
        console.log(res)
        console.log(`Removed a recipe: ${recipe_id}`)
    }
    catch(e){
        console.log(e)
    }
}

module.exports = { insertData, removeData, removeDataById }