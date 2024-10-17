document.getElementById("start").addEventListener("click", startProgram);

function saveTasksToLocalStorage(Tasks) {
  localStorage.setItem("tasks", JSON.stringify(Tasks));
}

function startProgram() {
  let input = "";

  let Tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  while (input !== "7") {
    console.log(`Task Manager Menu:
          1. Add Task
          2. View Tasks
          3. Toggle Task Completion
          4. Edit Task
          5. Delete Task
          6. Search Task
          7. Exit
          `);

    input = prompt("Enter Your choice(1-7):");

    switch (input) {
      case "1": {
        const desc = prompt("Enter The Task Description");
        const task = {
          id: Tasks.length + 1,
          desc: desc,
          completion: "Not Completed",
        };
        Tasks.push(task);
        saveTasksToLocalStorage(Tasks);
        console.log(`Task added : "${desc}"`);
        break;
      }
      case "2": {
        console.log("Tasks:");
        if (Tasks.length === 0) {
          console.log("No tasks found.");
        } else {
          Tasks.forEach((task) => {
            console.log(` ${task.id}. ${task.desc} [${task.completion}]`);
          });
        }
        break;
      }
      case "3": {
        const idcomp = prompt("Enter The Task ID to toggle completion:");
        let flag = false;
        Tasks.forEach((task) => {
          if (task.id == idcomp) {
            flag = true;
            if (task.completion === "Not Completed") {
              task.completion = "Completed";
            } else {
              task.completion = "Not Completed";
            }
            saveTasksToLocalStorage(Tasks);
            console.log(
              `Task "${task.desc}" is now marked as "${task.completion}" `
            );
          }
        });
        if (!flag) {
          console.log("the ID is not valid");
        }
        break;
      }
      case "4": {
        const idEdit = prompt("Enter The Task ID to Edit:");
        let flag = false;
        Tasks.forEach((task) => {
          if (task.id == idEdit) {
            flag = true;
            const newdesc = prompt("Enter The New Description");
            task.desc = newdesc;
            saveTasksToLocalStorage(Tasks);
            console.log(`Task "${task.id}" updated to: "${newdesc}"`);
          }
        });
        if (!flag) {
          console.log("the ID is not valid");
        }
        break;
      }
      case "5": {
        const idDel = prompt("Enter The Task ID to Delete:");
        let flag = false;
        const DelIndex = Tasks.findIndex((task) => task.id == idDel);
        if (DelIndex !== -1) {
          flag = true;
          const deltask = Tasks.splice(DelIndex, 1);
          saveTasksToLocalStorage(Tasks);
          console.log(`Task deleted: ${deltask[0].desc}`);
        }
        if (!flag) {
          console.log("the ID is not valid");
        }
        break;
      }
      case "6": {
        const taskname = prompt("Enter The Task name to Search:");
        const matchTasks = Tasks.filter((task) =>
          task.desc.toLowerCase().includes(taskname.toLowerCase())
        );
        if (matchTasks.length > 0) {
          console.log("The Result:");
          matchTasks.forEach((task) => {
            console.log(`${task.id}: ${task.desc} [${task.completion}]`);
          });
        } else {
          console.log("No tasks found");
        }
        break;
      }
      case "7": {
        break;
      }
      default: {
        console.log("Invalid choice, Please enter a number between 1 and 7.");
      }
    }
  }
}
