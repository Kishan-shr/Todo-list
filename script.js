

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#add-task-btn");
  const input = document.querySelector("#todo-input");
  const todoList = document.querySelector("#todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((taskObj, index) => {
      const task = document.createElement("li");
      task.classList.add("todo-item");

      task.innerHTML = `
        <span class="task-text" style="color: ${taskObj.done ? '#5CB338' : 'white'}; text-decoration: ${taskObj.done ? 'line-through' : 'none'};">
  ${taskObj.text}
</span>
       <span class="material-symbols-outlined done-btn">task_alt</span>
      <span class="material-symbols-outlined edit-btn">edit</span>
       <span class="material-symbols-outlined delete-btn">delete</span>
      `;

      // Done button
      task.querySelector(".done-btn").addEventListener("click", () => {
        taskObj.done = !taskObj.done;
        saveTasks();
        renderTasks();
      });

      // Edit button
      task.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit the task:", taskObj.text);
        if (newText !== null) {
          taskObj.text = newText.trim();
          saveTasks();
          renderTasks();
        }
      });

      // Delete button
      task.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      todoList.appendChild(task);
    });
  }

  function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    tasks.push({ text: taskText, done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }

  addBtn.addEventListener("click", addTask);
  input.addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
      addTask();
    }
  })
//event listener for the keybord shortcuts


  // Initial render from localStorage
  renderTasks();
});







