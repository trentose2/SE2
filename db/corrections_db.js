let db = require('./db');

let corrections_db = {

    insertACorrection: async function (correction) {
        let res = await db.executeQuery('INSERT INTO corrections (answer_id, text, score, user_id) VALUES ($1, $2, $3, $4) RETURNING id', [correction.answer_id, correction.text, correction.score, correction.user_id]);
        return res.rows[0].id;
    },

    getAllCorrections: async function (answer_id, user_id) {
        let res = await db.executeQuery('SELECT id FROM corrections WHERE ((answer_id::text LIKE $1) AND (user_id::text LIKE $2))', [answer_id, user_id]);
        return res.rows.map((x) => {
            return x.id;
        });
    },

    getACorrection: async function (correction_id) {
        let res = await db.executeQuery('SELECT * FROM corrections WHERE id=$1', [correction_id]);
        let result
        if (res.rows.length != 0) {
            result = res.rows[0];
        }
        else {
            throw new Error("The correction ID is inexistent.")
        }

        return result;
    },

    deleteACorrection: async function (correction_id) {
        let res = await db.executeQuery('DELETE FROM corrections WHERE id=$1 RETURNING *', [correction_id]);

        if (res.rows.length == 0)
            throw new Error("The correction ID is inexistent.")
    }
};

module.exports = corrections_db;