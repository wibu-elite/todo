const {response} = require('express');
const pool = require('../connection/dbConnection')

// Get All Task
exports.getAllTask = async(req, res) => {
    try{
        const allTaskGet = await pool.query (
            `SELECT *FROM "task"
            INNER JOIN "project" ON "project"."id" = "task"."id_project"
            INNER JOIN "user" ON "user"."id" = "project"."id_user"`
        );
        res.json(allTaskGet.rows);
    }catch(err) {
        console.error(err);
    }
}

// Create Task
exports.createTask = async(req, res) => {
    try{
        const {task_name, description, start_date, deadline, status, id_user, id_project} = req.body
        await pool.query(
            `INSERT INTO "task" (task_name, description, start_date, deadline, status, id_user, id_project ) 
            VALUES ($1, $2, $3, $4, $5)`, [task_name, description, start_date, deadline, status, id_user, id_project]
        );
        res.status(201).send(
            {
                message: "Task Successfully Added",
                body: {
                    task: {task_name, description, start_date, deadline, status}
                }
            }
        );
    } catch(err){
        console.error(err)
    }
}

// Delete Task
exports.deleteTask = async(req, res) => {
    try {
        const {id} = req.params
        await pool.query(`DELETE FROM "task" WHERE id = $1 `, [id]);
        res.json(200).send(
            {
                message: "Delete Task Successfully!"
            }
        );
    }catch(err){
        console.error(err)
    }
}

exports.updateTask = async(req, res) => {
    try {
        const {id} = req.params
        const {task_name, description, start_date, deadline, status, id_user, id_project} = req.body
        await pool.query(`UPDATE "task" SET task_name = $1, description = $2, start_date = $3, deadline = $4, status = $5, id_user = $6, id_project = $7 WHERE id = $8`, [task_name, description, start_date, deadline, status, id_user, id_project, id]);

        res.json(200).send(
            {
                message: "Task Update Successfully!"
            }
        );
    } catch(err) {
        console.error(err)
    }
}