const {response} = require('express');
const pool = require('../connection/dbConnection');

// Method Get ALL
exports.getAllProject = async(req, res) => {
    try {
        const allProjectGet = await pool.query(`SELECT *FROM "project" JOIN "user" ON "project"."id_user" = "user"."id"`);
        res.json(allProjectGet.rows);
    } catch(err) {
        console.error(err);
    }
}

// Method Get By Id
exports.getProjectById = async(req, res) => {
    try{
        const {id} = req.params
        const projectByIdGet = await pool.query(
            `SELECT *FROM "project" JOIN "user" ON "project"."id_user" = "user"."id" WHERE "user"."id" = $1`, [id]
        );
        res.json(projectByIdGet.rows); 
    } catch (err) {
        console.error(err);
    }
}

// Create Project
exports.createProject = async(req, res) =>{
    try {
        const {project_name, id_user} = req.body
         await pool.query(
            `INSERT INTO "project" (project_name, id_user) VALUES ($1, $2)`, [project_name, id_user]
        );
        res.status(201).send({
            message: "New Project Has Been Created",
            body: {
                project : {project_name, id_user}
            }
        })
    } catch (err) {
        console.error(err)
    }
}

// Delete Project
exports.deleteProject = async(req, res) => {
    try{
        const {id} = req.params
        await pool.query(`DELETE FROM "project" WHERE id = $1`, [id]);
        res.json(200).send(
            {
                message: "Delete Project Successfully"
            }
        );
    } catch(err) {
        console.error(err)
    }
}

// Update Project
exports.updateProject = async (res, req) => {
    try{
        const {id} = req.params
        const {project_name, id_user} = req.body
        await pool.query(`UPDATE "project" SET project_name = $1, id_user = $2 WHERE id = $3`, [project_name, id_user, id]);
        res.status(200).send(
            {
                message: "Project Update Successfully"
            }
        );
    } catch(err){
        console.error(err)
    }
}