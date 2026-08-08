const express = require("express");
const router = express.Router();

const pool = require("../database/database");

// GET /api/calendar/all 
router.get("/calendar/all", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM daily_challenges");

        res.json({
            success: true,
            challenges: rows
        });
    } catch (error){
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error fetching all calendar data"
        });
    }
});

// GET /api/calendar/:month
router.get("/calendar/:month", async (req, res) => {
    const { month } = req.params;

    try {
        const [rows] = await pool.query("SELECT DATE_FORMAT(date, '%Y-%m-%d') as Date, Title, Status FROM daily_challenges WHERE DATE_FORMAT(date, '%m') = ?",
            [month]
        );

        const challenges = {};
        rows.forEach(row => {
            challenges[row.Date] = row;
        });

        res.json({
            success: true,
            challenges
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: `Error fetching calendar data for month ${month}`
        });
    }
});

// POST /api/calendar/:date
router.post("/calendar/:date", async (req, res) => {
    const { date } = req.params;
    const { title, question, status } = req.body;

    try {
        const [result] = await pool.query("INSERT INTO daily_challenges (date, title, question, status) VALUES (?, ?, ?, ?)", [date, title, question, status]);

        res.json({
            success: true,
            message: `Challenge for ${date} added successfully`
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: `Error adding challenge for ${date}`
        });
    }
});

module.exports = router;