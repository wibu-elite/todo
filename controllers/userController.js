
const { response } = require("express");
const pool = require("../connection/dbConnection")
const bcrypt = require('bcrypt');

// Method GET
exports.getUserAll = async (req, res) => {
    try {
        const allUserGet = await pool.query(`SELECT * FROM "user"`);
        res.json(allUserGet.rows)
    } catch (err) {
        console.error(err.message)
    }
}

// Get by ID
exports.getUserById = async(req, res) => {
    try {
        const {id} = req.params
        const userByIdGet = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [id]);
        res.json(userByIdGet.rows);
    } catch (err) {
        console.error(err)
    }
}

// Create Users
exports.createUser = async(req, res) => {
    try{
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
                `INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3)`, [username, email, hashedPassword]
        );
        res.status(201).send ({
            message: "Username Added Successfully",
            body: {
                user: { username, email, password }  
            }
        });
    } catch (err) {
        console.error(err)
    }
}
//Delete Users
exports.deleteUser = async(req, res) => {
    try{
        const {id} = req.params;
        const userDelete =  await pool.query(`DELETE FROM "user" WHERE id = $1`, [id]);
        res.json(200).send(
            {
                message: "Delete User Successfully"
            }
        );
    } catch (err) {
        console.error(err.message);
    }
}

// Update User
exports.updateUserById = async(req, res) => {
    try {
        const {id} = req.params
        const {username, email, password } = req.body
        const responses = await pool.query(
            `UPDATE "user" SET username = $1, email = $2, password = $3 WHERE id = $4`,
            [ username, email, password, id ]
        );
        res.status(200).send(
            {
                message: "User Update Successfully"
            }
        );
    } catch(err) {
        console.error(err)
    }
}