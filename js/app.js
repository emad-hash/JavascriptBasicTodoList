let tasks = [
  {
    title: "Reading a book",
    date: "15/10/2021",
    isDone: false,
  },
  {
    title: "Reading a book2",
    date: "15/10/2021",
    isDone: true,
  },
  {
    title: "Reading a book3",
    date: "15/10/2021",
    isDone: false,
  },
];

function getTasksFormStorage(){
    let retrivedTasks = JSON.parse(localStorage.getItem("tasks"))
    // if(retrivedTasks == null){
    //     tasks = []
    // }else{
    //     tasks = retrivedTasks
    // }
    tasks = retrivedTasks ?? []
}
getTasksFormStorage();


function fillTaskOnThePage() {
  document.getElementById("task").innerHTML = "";
  let index = 0;
  for (taskoa of tasks) {
    // console.log(task.title);
    document.getElementById("task").innerHTML += `
        <div class="taskbox ${taskoa.isDone ? "done" : ""}" id="taskbox">
                <div class="text">
                  <h2 id="title">${taskoa.title}</h2>
                  <span id="date">
                    <i
                      class="fa-solid fa-calendar-days"
                      style="padding-right: 15px"
                    ></i>
                    ${taskoa.date}</span
                  >
                </div>
                <div class="icon">
                ${
                  taskoa.isDone
                    ? 
                    `
                    <button style="background-color: rgba(118,0,101)" onclick="toggleTaskcompletion(${index})">
                     <i class="fa-solid fa-xmark"></i>
                    </button>

                    `
                    :
                    `
                    <button style="background-color: rgba(0, 128, 0, 0.685)" onclick="toggleTaskcompletion(${index})">
                        <i class="fa-solid fa-check"></i>
                    </button>

                    `
                }
                  
                  <button style="background-color: rgba(0, 0, 255, 0.575)" onclick="edtiTask(${index})">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button style="background-color: rgba(255, 0, 0, 0.644)" onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
        `;
    index++;
  }
}
fillTaskOnThePage();

let now = new Date();
let date =
  now.getDate() +
  "/" +
  (now.getUTCMonth() + 1) +
  "/" +
  now.getFullYear() +
  " " +
  "| " +
  now.getHours() +
  ":" +
  now.getMinutes();

// console.log(now);
console.log(date);

////////// add task
document.getElementById("plus").addEventListener("click", function () {
  // console.log("eamd");
  let taskName = prompt("Please enter the task title");
  let taskobj = {
    title: taskName,
    date: date,
    isDone: false,
  };
  tasks.push(taskobj);
  storeTasks()
  fillTaskOnThePage();
});

// end add task

/// delete task
function deleteTask(index) {
  // alert(index)
  let task = tasks[index];
  console.log(task);
  let isConfirmed = confirm(
    "Are you sure you want to delete the task?" + task.title
  );
  if (isConfirmed) {
    tasks.splice(index, 1);
    storeTasks()
    fillTaskOnThePage();
  }
  // console.log(isConfirmed);
}
/// end  delete task
/// edit task
function edtiTask(index) {
  let task = tasks[index];
  let updateTask = prompt(
    "Please add the new task title" + " (" + task.title + ")",
    task.title
  );
  task.title = updateTask;
  storeTasks()
  fillTaskOnThePage();
}
/// end edit task

// isdone
function toggleTaskcompletion(index) {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks()
  fillTaskOnThePage();
}
// end isdone

 ///////// =========== Storage Functions
 function storeTasks(){
    let tasksString =JSON.stringify(tasks);
    localStorage.setItem("tasks",tasksString)
 }