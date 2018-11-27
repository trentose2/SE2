let db = require('./db');

let answers_db = {
    getAllAnswers: async function(user_id, task_id, type){
        let res = await db.executeQuery('SELECT answers.id FROM answers JOIN tasks ON task_id = tasks.id '
            + 'WHERE user_id::text LIKE $1 AND task_id::text LIKE $2 AND type::text LIKE $3;', [user_id, task_id, type]);

        return res.rows.map((x) => {
            return x.id;
        });
    },
    insertAnswer: async function(answer){
        let res = await db.executeQuery('INSERT INTO answers (user_id, task_id, submitted_at) VALUES ($1, $2, NOW()) RETURNING id', [answer.user_id, answer.task_id]);
        let answer_id = res.rows[0].id;
        
        for(let answ of answer.answers)
            await db.executeQuery('INSERT INTO answer_answers (answer_id, answer) VALUES ($1, $2)', [answer_id, answ]);
        
        return answer_id;
    }
};

module.exports = answers_db;