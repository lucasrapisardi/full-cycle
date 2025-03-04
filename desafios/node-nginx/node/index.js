const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

// Create connection
const connection = mysql.createConnection(config);

// Insert data into the database
const sql = `INSERT INTO people(name) values('Lucas')`;
connection.query(sql, (err) => {
    if (err) console.error('Error inserting data:', err);
});

// Define the route to fetch data
app.get('/', (req, res) => {
    const searchQuery = `SELECT * FROM people`;
    
    connection.query(searchQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Database query error');
            return;
        }

        // Format the response with the retrieved data
        const names = results.map(row => row.name).join(', ');
        res.send(`<h1>Full Cycle!</h1><h2>${names}</h2>`);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
