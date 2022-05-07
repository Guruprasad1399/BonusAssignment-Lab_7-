const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var sql = require("mssql");
const cors = require("cors");

var config = {
    user: "sa",
    password: "1234",
    port: 1433,
    server: 'localhost\\MSSQLSERVER',
    database: 'Company_GurVen',
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};

var conn = new sql.ConnectionPool(config);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = conn.connect(function (err) {
    if (err) {
        console.log("Error connecting to db: " + err);
        return;
    }
    else {
        console.log("Awesome");
    }
})

app.post("/api/employee", async (req, res) => {
    const lastName = req.body.lastName;

    const sqlSelect = "SELECT * FROM Employee where lname=?";

    db.query(sqlSelect, lastName, (err, result) => {
        res.send(result);
    });
});

app.get("/api/selectedemployee", (req, res) => {
    const sqlSelect = `SELECT * FROM Employee where lname=${lastName}`;
    db.query(sqlSelect, lastName, (err, result) => {
        res.send(result);
    });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});