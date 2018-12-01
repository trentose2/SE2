let answers_logic = require('../logic/answers_logic');
let fetch = require('node-fetch');

/* Answer POST */
test('Undefined answer', () => {
    let answer = undefined;

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('String answer', () => {
    let answer = "a";

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Array answer', () => {
    let answer = ["a"];

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});

test('Undefined user_id', () => {
    let answer = {
        user_id: undefined,
        task_id: 1,
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('String user_id', () => {
    let answer = {
        user_id: "a",
        task_id: 1,
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Object user_id', () => {
    let answer = {
        user_id: {},
        task_id: 1,
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});

test('Undefined task_id', () => {
    let answer = {
        user_id: 1,
        task_id: undefined,
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('String task_id', () => {
    let answer = {
        user_id: 1,
        task_id: "a",
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Object task_id', () => {
    let answer = {
        user_id: 1,
        task_id: {},
        answers: [""]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});

test('Undefined answers array', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: undefined
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('String answers array', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: ""
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Object answers array', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: {}
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Integer array of answers', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: [1, 2]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Undefined array of answers', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: [undefined]
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});
test('Empty array of answers', () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: []
    };

    expect(answers_logic.insertAnAnswer(answer)).rejects.toBeInstanceOf(Error);
});

test('Insert a valid answer', async (done) => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: ['a', 'c']
    };

    let data;
    let exception = false;
    try {
        data = await answers_logic.insertAnAnswer(answer);
    }
    catch (e) {
        exception = true;
        expect(e.detail).toBe("Key (user_id, task_id)=(1, 1) already exists.");
    }

    if (exception && data === undefined)
        done();
    else
        expect(typeof data).toBe('number');
    done();
});


/* Answers GET all */

test('Undefined user_id', async () => {
    let user_id = undefined;
    let task_id = 1;
    let type = 'single_choice';

    let res = await answers_logic.getAllAnswers(user_id, task_id, type);
    expect(res).toBeInstanceOf(Array);
    for (let i of res)
        expect(typeof i).toBe('number');
});
test('String user_id', () => {
    let user_id = "a";
    let task_id = 1;
    let type = 'single_choice';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});
test('Object user_id', () => {
    let user_id = {};
    let task_id = 1;
    let type = 'single_choice';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});

test('Undefined task_id', async () => {
    let user_id = 1;
    let task_id = undefined;
    let type = 'single_choice';

    let res = await answers_logic.getAllAnswers(user_id, task_id, type);
    expect(res).toBeInstanceOf(Array);
    for (let i of res)
        expect(typeof i).toBe('number');
});
test('String task_id', () => {
    let user_id = 1;
    let task_id = "a";
    let type = 'single_choice';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});
test('Object task_id', () => {
    let user_id = 1;
    let task_id = {};
    let type = 'single_choice';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});

test('Undefined type', async () => {
    let user_id = 1;
    let task_id = 1;
    let type = undefined;

    let res = await answers_logic.getAllAnswers(user_id, task_id, type);
    expect(res).toBeInstanceOf(Array);
    for (let i of res)
        expect(typeof i).toBe('number');
});
test('Object type', () => {
    let user_id = 1;
    let task_id = 1;
    let type = {};

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});
test('Wrong type', () => {
    let user_id = 1;
    let task_id = 1;
    let type = 'aaa';

    expect(answers_logic.getAllAnswers(user_id, task_id, type)).rejects.toBeInstanceOf(Error);
});

test('Correct type parameters', async () => {
    let user_id = 1;
    let task_id = 1;
    let type = 'single_choice';

    let res = await answers_logic.getAllAnswers(user_id, task_id, type);
    expect(res).toBeInstanceOf(Array);
    for (let i of res)
        expect(typeof i).toBe('number');
});


/* Answers DELETE */

test('Undefined answer_id', () => {
    let answer_id = undefined;

    expect(answers_logic.deleteAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});
test('String answer_id', () => {
    let answer_id = "a";

    expect(answers_logic.deleteAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});
test('Object answer_id', () => {
    let answer_id = {};

    expect(answers_logic.deleteAnAnswer(answer_id)).rejects.toBeInstanceOf(Error);
});

/* API calls test */
let api;
beforeAll(() => {
    api = require('../api');
});

afterAll(() => {
    api.close();
});

/* Answer POST */
async function insertAnswer(answer) {
    let response = await fetch('http://localhost:3000/v1/answers', {
        method: 'post',
        body: JSON.stringify(answer),
        headers: { 'Content-Type': 'application/json' },
    });

    let id = await response.text();

    return id;
}

/* Answer DELETE */
async function deleteAnswer(answer_id) {
    await fetch('http://localhost:3000/v1/answers/' + answer_id, {
        method: 'delete'
    });
}

/* Answers GET all */
async function getAllAnswers(user_id, task_id, type) {
    let response = await fetch('http://localhost:3000/v1/answers?user_id=' + user_id + '&task_id=' + task_id + '&type=' + type);

    let json = await response.json();
    return json;
}

test('Insert a valid answer via API and DELETE', async () => {
    let answer = {
        user_id: 1,
        task_id: 1,
        answers: ['a', 'c']
    };

    let body = { Answer: answer };

    try {
        let id = await insertAnswer(body);

        await deleteAnswer(id);
    }
    catch (e) {
        expect(e).toContain("duplicate key value violates unique constraint");
    }
});

test('Get all answers via API', async () => {
    let user_id = 1;
    let task_id = 1;
    let type = 'single_choice';

    let json = await getAllAnswers(user_id, task_id, type);

    expect(json).toBeInstanceOf(Array);
    for (let i of json)
        expect(typeof i).toBe('number');
});