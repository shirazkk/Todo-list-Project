#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold("\n\t-----------------Welcome To The Shiraz Todo App-----------------------\n\t"));
let todo = [];
async function createtodo(todo) {
    do {
        let options = await inquirer.prompt([
            {
                type: "list",
                name: "operation",
                message: "select one operation ",
                choices: ["AddTodo", "UpdateTodo", "ViewTodo", "Delete", "Exit"],
            },
        ]);
        if (options.operation == "AddTodo") {
            let todos = await inquirer.prompt([
                {
                    message: "What do yo want to add in your todos",
                    name: "addtodo",
                    type: "input",
                },
            ]);
            todo.push(todos.addtodo);
            console.log(todo);
        }
        if (options.operation == "UpdateTodo") {
            let update = await inquirer.prompt([
                {
                    message: "select item for update",
                    type: "list",
                    name: "updatetodo",
                    choices: todo.map((item) => item),
                },
            ]);
            let addTodo = await inquirer.prompt([
                {
                    message: "What do yo want to add in your todos",
                    name: "addtodo",
                    type: "input",
                },
            ]);
            let newtodo = todo.filter((val) => val !== update.updatetodo);
            todo = [...newtodo, addTodo.addtodo];
            console.log(todo);
        }
        if (options.operation == "ViewTodo") {
            console.log(todo);
        }
        if (options.operation == "Delete") {
            let deletes = await inquirer.prompt([
                {
                    message: "select item for update",
                    type: "list",
                    name: "deletetodo",
                    choices: todo.map((item) => item),
                },
            ]);
            let newtodo = todo.filter((val) => val !== deletes.deletetodo);
            todo = [...newtodo];
            console.log(todo);
        }
        if (options.operation == "Exit") {
            console.log(chalk.bold.italic.blue("Thank You For Using Shiraz Todo App"));
            break;
        }
    } while (true);
}
createtodo(todo);
