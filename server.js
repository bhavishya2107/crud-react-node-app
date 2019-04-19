const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'pms_tool'
  })
}



//DEL REQUEST
app.delete('/users/:roleId', (req, res) => {
	console.log('Fetching user with roleId: ' + req.params.roleId);

	const connection = getConnection();

	const Id = req.params.roleId;

	const queryString = 'DELETE FROM role_master WHERE roleId = ?';
	connection.query(queryString, [ Id ], (err, rows, fields) => {
		if (err) {
			console.log('Failed to query for users: ' + err);
			res.sendStatus(500);
			return;
		}
		res.end('Record has been deleted!!!');
	});
});


//update role api 
app.put("/role_update/:roleId", (req, res) => {
	const id = req.params.roleId;
	const name = req.body.roleName;
	const description = req.body.description;
	const queryString = " UPDATE role_master SET roleName =  ? , description = ? WHERE roleId = ? "
	getConnection().query(queryString, [name,description, id], (err, results, fields, rows) => {
		if (err) {
			console.log("Not updated " + err);
			res.sendStatus(500);
			return
		}
		console.log('record updates ' + results.id)
		res.send(results)
	})
  
  })


//create a new role
app.post('/user_create', (req, res) => {
	console.log('Trying to create a new user...');
	console.log('first name: ' + req.body.rolename);
	const roleName = req.body.roleName;
	const description = req.body.description;
	const queryString = 'INSERT INTO role_master (roleName,description) values(?,?)';
	getConnection().query(queryString, [ roleName, description ], (err, results, fields) => {
		if (err) {
			console.log('Failed to insert new user :' + err);
			res.sendStatus(500);
		
			return;
		}
		console.log('Inserted a new user with id:', results.insertId);
		
		res.end();
	});
	res.end();
});




app.get('/', (req, res) => {
	console.log('Responding to root route');
	res.send('Hello from ROOT');
});


//get role by single ID
app.get('/users/:roleId', (req, res) => {
	console.log('Fetching user with roleId: ' + req.params.roleId);

	const connection = getConnection();

	const userId = req.params.roleId;

	const queryString = 'SELECT * FROM role_master WHERE roleId = ?';
	connection.query(queryString, [ userId ], (err, rows, fields) => {
		if (err) {
			console.log('Failed to query for users: ' + err);
			res.sendStatus(500);
			return;
		}

		console.log('I think we fetched users successfully');

		const users = rows.map((row) => {
			return { roleName: row.roleName, description: row.description };
		});

		res.json(users);
	});

	// res.end()
});


//get roles
app.get('/users', (req, res) => {
	const connection = getConnection();
	const queryString = 'SELECT * FROM role_master';
	connection.query(queryString, (err, rows, fields) => {
		if (err) {
			console.log('Failed to query for users: ' + err);
			res.sendStatus(500);
			return;
		}
		res.json(rows);
	});
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);