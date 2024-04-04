// #!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const welcomeMessage = chalk.bold.rgb(355, 236, 0)(
  "\n\t----------------- Welcome To The Shiraz Todo App -----------------------\n\t"
);
console.log(welcomeMessage);


let todoList: string[] = [];
let isRunning = true;

while (isRunning) {
  let selectedOption = await inquirer.prompt([
    {
      message: chalk.cyan("Select an option to perform a task"),
      name: "option",
      type: "list",
      choices: [
        chalk.green("Add Todo"),
        chalk.blue("Update Todo"),
        chalk.yellow("View Todo"),
        chalk.magenta("Delete Todo"),
        chalk.red("Exit"),
      ],
    },
  ]);

  if (selectedOption.option === chalk.green("Add Todo")) {
    let addTodo = await inquirer.prompt([
      {
        message: chalk.green("Enter a new todo"),
        name: "newTodo",
        type: "input",
      },
    ]);
    if (addTodo.newTodo.trim() !== "") {
      todoList.push(addTodo.newTodo);
      console.log("✓ Todo added successfully: ",("\n") ,todoList,("\n"));
    } else {
      console.log(chalk.red("Please enter a valid todo"));
    }
  } else if (selectedOption.option === chalk.blue("Update Todo")) {
    if (todoList.length === 0) {
      console.log(chalk.red("Your todo list is empty."));
    } else {
      let selectedTodo = await inquirer.prompt([
        {
          message: chalk.blue("Select a todo to update"),
          type: "list",
          name: "selected",
          choices: todoList,
        },
      ]);
      let updatedTodo = await inquirer.prompt([
        {
          message: chalk.blue("Enter Your todo"),
          name: "updated",
          type: "input",
        },
      ]);
      if (updatedTodo.updated.trim() !== "") {
        let updatedList = todoList.filter((todo) => todo !== selectedTodo.selected);
        todoList = [...updatedList, updatedTodo.updated];
        console.log(chalk.green("✓ Todo updated successfully:","\n", todoList,"\n"));
      } else {
        console.log(chalk.red("Please enter a valid todo to update."));
      }
    }
  } else if (selectedOption.option === chalk.yellow("View Todo")) {
    if (todoList.length === 0) {
      console.log(chalk.red("Your todo list is empty."));
    } else {
      console.log(chalk.cyan("Your Todos: ", todoList));
    }
  } else if (selectedOption.option === chalk.magenta("Delete Todo")) {
    if (todoList.length === 0) {
      console.log(chalk.red("Your todo list is already empty."));
    } else {
      let selectedDelete = await inquirer.prompt([
        {
          message: chalk.magenta("Select a todo to delete"),
          name: "deleted",
          type: "list",
          choices: todoList,
        },
      ]);
      let updatedList = todoList.filter((todo) => todo !== selectedDelete.deleted);
      todoList = [...updatedList];
      console.log(chalk.green("✓ Todo deleted successfully:","\n", todoList,"\n"));
    }
  } else if (selectedOption.option === chalk.red("Exit")) {
    console.log(chalk.bold.rgb(255, 136, 0)("Thank you for using Shiraz Todo App"));
    isRunning = false;
    break;
  } else {
    console.log(chalk.red("Invalid Operation"));
  }
}
