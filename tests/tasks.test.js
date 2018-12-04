let tasks_logic = require ("../logic/tasks_logic");
let fetch = require ("node-fetch");

test("Undefined title",() => {
    let task = {
        task_title: undefined,
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task))
    .rejects.toBeInstanceOf(Error);
});

test("Object title", () => {
    let task = {
        task_title: {},
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array title", () => {
    let task = {
        task_title: [],
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Undefined author id", () => {
    let task = {
        task_title : "",
        author_id : undefined,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array author id", () => {
    let task = {
        task_title : "",
        author_id : [],
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Object author id", () => {
    let task = {
        task_title : "",
        author_id : {},
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Undefined question", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question: undefined,
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Object question", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question : {},
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array question", () => {
    let task = {
        task_title: "task",
        author_id: 1,
        question: [],
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Undefined task type", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question: "",
        task_type: undefined,
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array task type", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question: "",
        task_type: [],
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Object task type", () => {
    let task = {
        task_title : "",
        author_id : 1,
        question: "",
        task_type: {},
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Undefined task",()=> {
    let task = undefined;
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Array task", () => {
    let task = [];
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("String task", () => {
    let task = "task";
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

test("Valid task", () => {
    let task = {
        id : 3,
        task_title : "",
        author_id : 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    return tasks_logic.insertTask(task).then((data) => {
        expect(typeof data).toBe("number"); });
});

// Check choices
test("Undefined choices",() => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: undefined,
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task))
    .rejects.toBeInstanceOf(Error);
});

test("Object choices", () => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: {},
        correct_answer: ["risp1"]
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

// Check correct answers
test("Undefined correct answers",() => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: undefined
    };
    expect(tasks_logic.insertTask(task))
    .rejects.toBeInstanceOf(Error);
});

test("Object choices", () => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: {}
    };
    expect(tasks_logic.insertTask(task)).rejects.toBeInstanceOf(Error);
});

// Check params of the delete
test("Object task id", () => {
    let task_id={};
    expect(tasks_logic.deleteATask(task_id)).rejects.toBeInstanceOf(Error);
});

test('Undefined task_id', () => {
    let task_id = undefined;
    expect(tasks_logic.deleteATask(task_id)).rejects.toBeInstanceOf(Error);
});

test('String answer_id', () => {
    let task_id = "a";
    expect(tasks_logic.deleteATask(task_id)).rejects.toBeInstanceOf(Error);
});


// API test
let api;
beforeAll(() => {
    api = require('../api');
});

afterAll(() => {
    api.close();
});

async function insertATask(task) {
    let response = await fetch ('http://localhost:3000/v1/tasks', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },    
    });

    let text = await response.text();

    return text;
}

async function getAllTasks(task_title, author_id, task_type) {
    let response = await fetch('http://localhost:3000/v1/corrections?task_title=' + task_title + '&author_id=' + author_id + '&task_type=' + task_type);

    let res = await response.json();
    return res;
}

async function getATask(task_id) {
    let response = await fetch('http://localhost:3000/v1/tasks/' + task_id);

    let res = await response.json();
    return res;
}

async function deleteATask(task_id) {
    await fetch('http://localhost:3000/v1/answers/' + task_id, {
        method: 'delete'
    });
}


test("Insert valid task via API", async () => {
    let task = {
        task_title: "",
        author_id: 1,
        question: "",
        task_type: "open_answer",
        choices: ["risp1","risp2","risp3"],
        correct_answer: ["risp1"]
    };
    try { let id = await insertATask(task); } catch (e) { expect(e).toBeInstanceOf(Error); }
});

test("Delete a task via API", async () => {
    let task_id = 1;
    try { await deleteATask(task_id); } catch (e) { expect(e).toBeInstanceOf(Error); }
});

test("Get a task via API", async () => {
    let task_id = 1;
    try { await getATask(task_id); } catch (e) { expect(e).toBeInstanceOf(Error); }
});