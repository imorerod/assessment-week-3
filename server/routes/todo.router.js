const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool');

todoRouter.get('/', (req,res) => {
    const queryString = `SELECT * FROM "todo" ORDER BY "id" ASC`;

    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(`Error retrieving from DB: ${err}`);
            res.sendStatus(500);
        })
});

todoRouter.post('/', (req,res) => {
    const queryString = `INSERT INTO "todo" ("task", "completed")
                        VALUES ($1, false);`;

    pool.query(queryString, [req.body.task])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error posting to DB: ${err}`);
            res.sendStatus(500);
        });
});

// $.ajax ({ type: "PUT", url: "/todo/6" });
todoRouter.put('/:id', (req,res) => {
    const queryString = `UPDATE "todo" SET "completed"=true WHERE "id"=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`Error updating DB: ${err}`);
            res.sendStatus(500);
        });
});

todoRouter.delete('/:id', (req,res) => {
    const queryString = `DELETE FROM "todo" WHERE "id"=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`Error deleting from DB: ${err}`);
            res.sendStatus(500);
        });
});

module.exports = todoRouter;