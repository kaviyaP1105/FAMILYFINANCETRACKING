const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve frontend files

// MySQL Connection
const db = mysql.createConnection({
    host: ""
    user: "" // Change if needed
    password: "" // Change if needed
    database: "personal_management"
});

// Connect to Database
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

// Serve Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Routes

// Get Expenditure
app.get("/getExpenditure", (req, res) => {
    db.query("SELECT * FROM expenditure", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add Expenditure
app.post("/addExpenditure", (req, res) => {
    const { month, type, amount } = req.body;
    db.query("INSERT INTO expenditure (month, type, amount) VALUES (?, ?, ?)", 
        [month, type, amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Expenditure added successfully", id: result.insertId });
    });
});

// Get Income
app.get("/getIncome", (req, res) => {
    db.query("SELECT * FROM income", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add Income
app.post("/addIncome", (req, res) => {
    const { month, type, amount } = req.body;
    db.query("INSERT INTO income (month, type, amount) VALUES (?, ?, ?)", 
        [month, type, amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Income added successfully", id: result.insertId });
    });
});

// Get Family Members
app.get("/getFamily", (req, res) => {
    db.query("SELECT * FROM family_members", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add Family Member
app.post("/addFamily", (req, res) => {
    const { name, occupation, studies, age } = req.body;
    db.query("INSERT INTO family_members (name, occupation, studies, age) VALUES (?, ?, ?, ?)", 
        [name, occupation, studies, age], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Family member added successfully", id: result.insertId });
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
