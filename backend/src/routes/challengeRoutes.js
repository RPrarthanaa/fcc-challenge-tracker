const express = require("express");
const router = express.Router();

const pool = require("../database/database");

// GET /api/challenge/:date
router.get("/challenge/:date", async (req, res) => {
    const { date } = req.params;

    try { 
        const [ rows ] = await pool.query("SELECT * FROM daily_challenges WHERE date = ?", [date]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No challenge found for date ${date}`
            });
        }

        res.json ({
            success: true,
            challenges: rows
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: `Error fetching challenge data for date ${date}`
        });
    }
});

// UPDATE /api/challenge/:date
router.put("/challenge/:date", async (req, res) => {
    const { date } = req.params;
    const { key, value } = req.body;

    let result;
    
    try {
        if (key === "Title") {
            result = await pool.query("UPDATE daily_challenges SET Title = ? WHERE date = ?", [value, date]);

            res.json({
                success: true,
                message: `Challenge title updated for date ${date}`
            });

        } else if (key === "Status") {
            result = await pool.query("UPDATE daily_challenges SET Status = ? WHERE date = ?", [value, date]);

            res.json({
                success: true,
                message: `Challenge status updated for date ${date}`
            });

        } else if (key === "Question") {
            result = await pool.query("UPDATE daily_challenges SET Question = ? WHERE date = ?", [value, date]);
            res.json({
                success: true,
                message: `Challenge question updated for date ${date}`
            });

        } else if (key === "Editor") {
            result = await pool.query(`
                UPDATE daily_challenges 
                SET Editor = JSON_SET(Editor, ?, ?) 
                WHERE Date = ?`,
                [
                    `$.${value.language}`,
                    value.code,
                    date
                ]
            );
            res.json({
                success: true,
                message: `Challenge code updated for ${value.language} on ${date}`
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `Error updating challenge data for date ${date}`
        });
    }
});

module.exports = router;