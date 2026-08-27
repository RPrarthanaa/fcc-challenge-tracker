const express = require("express");
const router = express.Router();

const pool = require("../database/database");

router.get("/dashboard/main-stats", async(req, res) => {
    const today = new Date();
    const day = today.getDay();
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    const formatDate = (date) => {
        return date.toISOString().split("T")[0];
    }

    const startDate = formatDate(monday);
    const endDate = formatDate(sunday);
    
    try {
        const [completedRows] = await pool.query(`
            SELECT COUNT(*) AS count
            FROM daily_challenges 
            WHERE Status = 'Completed'`);

        const [inProgressRows] = await pool.query(`
            SELECT COUNT(*) AS count
            FROM daily_challenges
            WHERE Status = 'In Progress'`);

        const [weekRows] = await pool.query(`
            SELECT COUNT(*) AS count
            FROM daily_challenges
            WHERE Date BETWEEN ? AND ?`, [startDate, endDate]);

        const [monthRows] = await pool.query(`
            SELECT COUNT(*) AS count
            FROM daily_challenges
            WHERE DATE_FORMAT(Date, '%Y-%m') = ?`, [today.toISOString().slice(0, 7)]);

        const [lastDate] = await pool.query(`
            SELECT Date
            FROM daily_challenges
            ORDER BY \`Date\` DESC
            LIMIT 1`);

        res.json({
            success: true,
            stats: {
                totalCompleted: completedRows[0].count,
                totalInProgress: inProgressRows[0].count,
                thisWeek: weekRows[0].count,
                thisMonth: monthRows[0].count,
                lastActivityDate: lastDate[0].Date
            }
        });

    } catch (error) {
        console.log("Error retrieving main stats:", error);

        res.status(500).json({
            success: false,
            message: "Error retrieving main stats"
        });
    }
});

module.exports = router;