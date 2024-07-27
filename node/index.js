const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const pool = mysql.createPool(config);

// Função para garantir que a tabela 'people' exista
const ensureTableExists = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting database connection:', err.stack);
                reject('Database connection error');
                return;
            }

            const sqlCreateTable = `
                CREATE TABLE IF NOT EXISTS people (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL
                )
            `;

            connection.query(sqlCreateTable, (err, results) => {
                connection.release();
                if (err) {
                    console.error('Error creating table:', err.stack);
                    reject('Table creation error');
                    return;
                }
                resolve('Table created or already exists');
            });
        });
    });
};

app.get('/', async (req, res) => {
    try {
        await ensureTableExists();

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting database connection:', err.stack);
                res.status(500).send('Database connection error');
                return;
            }

            const sqlCheck = `SELECT * FROM people WHERE name = 'Lucas'`;
            connection.query(sqlCheck, (err, checkResults) => {
                if (err) {
                    console.error('Error performing select query:', err.stack);
                    connection.release();
                    res.status(500).send('Select query error');
                    return;
                }

                if (checkResults.length === 0) {
                    const sqlInsert = `INSERT INTO people(name) VALUES('Lucas')`;
                    connection.query(sqlInsert, (err, insertResults) => {
                        if (err) {
                            console.error('Error performing insert query:', err.stack);
                            connection.release();
                            res.status(500).send('Insert query error');
                            return;
                        }
                        console.log('Insert query result:', insertResults);
                    });
                }

                const sqlSelect = `SELECT * FROM people`;
                connection.query(sqlSelect, (err, selectResults) => {
                    connection.release();
                    if (err) {
                        console.error('Error performing select query:', err.stack);
                        res.status(500).send('Select query error');
                        return;
                    }
                    console.log('Select query results:', selectResults);

                    if (selectResults.length > 0) {
                        const firstResultName = selectResults[0].name;
                        res.send(`<h1>Full Cycle Rocks! \n${firstResultName}</h1>`);
                    } else {
                        res.send('<h1>No results found</h1>');
                    }
                });
            });
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log('Running on port ' + port);
});
