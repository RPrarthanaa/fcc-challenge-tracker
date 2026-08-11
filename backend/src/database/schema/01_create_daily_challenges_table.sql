DROP TABLE IF EXISTS daily_challenges;

CREATE TABLE daily_challenges (
    `Date` DATE NOT NULL,
    `Title` VARCHAR(255),
    `Question` TEXT,
    `Editor` JSON,
    `Status` ENUM(
        'Completed',
        'In Progress',
        'Missed',
        'Current Day'
    ) NOT NULL,
    PRIMARY KEY (`Date`)
);