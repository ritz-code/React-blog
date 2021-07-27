const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

require('dotenv').config({ path: './.env' });

const PORT = 3001;

const { encrypt, validPassword } = require("./encryption/EncryptionHandler");

app.use(cors({
    origin: "http://localhost:3000",
    preflightContinue: true,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* connection gets stored here */
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

/* GET request for all blog posts */
app.get('/api/get', (req, res) => {

    const sqlGet = "SELECT * FROM posts";
    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

/* GET request for an individual blog post */
app.get('/api/blog/:id', (req, res) => {

    const sqlGet = `SELECT * FROM posts WHERE id=${req.params.id}`;
    db.query(sqlGet, (err, result) => {
        if (err) console.log("error " + err);
        if (result) res.send(result);
    });
});

/* logout request, clears the cookie and sets loggeIn to false  */
app.get('/api/logout', auth, (req, res) => {

    let result = {};
    try {
        res.clearCookie("jwt");
        result.loggedIn = false;
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* POST request for creating a new blog post */
app.post('/api/insert', (req, res) => {

    const title = req.body.title;
    const body = req.body.body;
    const dated = new Date().toJSON().slice(0, 10);
    const sqlInsert = "INSERT INTO posts(title, body, dated) VALUES (?,?,?)";
    db.query(sqlInsert, [title, body, dated], (err, result) => {
        res.status(201).send(result);
    });
});

/* GET request for all the comments of a particular blog post */
app.get('/api/comment/:id', (req, res) => {

    const sqlGet = `SELECT * FROM comments WHERE post_id=${req.params.id}`;
    db.query(sqlGet, (err, result) => {
        res.status(201).send(result);
    });
});

/* POST request for inserting comments in the DB */
app.post('/api/comment', auth, (req, res) => {

    const comment = req.body.comment;
    const username = req.body.username;
    const post_id = req.body.post_id;
    const dated = new Date().toJSON().slice(0, 10);
    const sqlInsert = "INSERT INTO comments(comment, username, post_id, dated) VALUES (?,?,?,?)";
    db.query(sqlInsert, [comment, username, post_id, dated], (err, result) => {
        console.log(err);
        result.comment = comment;
        result.username = username;
        result.id = post_id;
        result.dated = dated;
        res.send(result);
    });
});

/* POST request for register page with user data in req */
app.post('/api/register', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    /* encrypted password from EncryptionHandler */
    const encryptedPassword = encrypt(password);

    const sqlInsert = "INSERT INTO users(email, password, username, salt) VALUES (?,?,?,?)";
    db.query(sqlInsert, [email, encryptedPassword.hash, username, encryptedPassword.salt], (err, result) => {
        res.status(201).send(result);
    });
});

/* POST request for login page data to be stored */
app.post('/api/login', (req, res) => {

    const password = req.body.password;

    let result = {};
    let status = 200;

    const sqlSelect = `SELECT * FROM users WHERE email = ?`;

    db.query(sqlSelect, [req.body.email],
        (err, user) => {
            if (err) {
                status = 404;
                res.send(err);
            }

            if (user.length > 0) {
                /* data returned from the db query */
                queryResult = Object.values(JSON.parse(JSON.stringify(user)));

                hashPassword = queryResult[0].password;
                salt = queryResult[0].salt;
                username = queryResult[0].username;
                id = queryResult[0].uid;

                /* checking the entered password with the stored hash */
                const isValid = validPassword(password, hashPassword, salt);

                /* creating a JSON web token */
                const accessToken = jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET);

                /* storing the JSON web token in cookies */
                res.cookie("jwt", accessToken, {
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true
                });

                if (isValid) {
                    status = 200;
                    result.token = accessToken;
                    result.status = status;
                    result.username = username;
                    result.loggedIn = true;
                    res.status(status).send(result);
                } else {
                    status = 401;
                    result.status = status;
                    result.error = "Wrong username/password"
                    res.status(status).send(result);
                }
            }
        })
});

/* authorization */
function auth(req, res, next) {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (error) {
        console.log("INSIDE ERROR");
        res.status(401).send(error);
    }
}


app.listen(PORT, () => {
    console.log(`connecting to port ${PORT}`);
});
