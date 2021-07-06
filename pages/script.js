const taskAddButton = document.querySelector('.assigned-tasks__add-task-button');
const closedTasksViewButton = document.querySelector('.completed-tasks__open-button');
const taskAddPopup = document.querySelector('.task-add-popup');
const taskAddForm = document.querySelector('.task-add-form');
const taskAddInput = document.querySelector('.task-add-form__input');
const taskAddPopupCloseButton = document.querySelector('.task-add-form__close-button');
const completedTasksList = document.querySelector('.completed-tasks__list');
const toggleCompletedTasksListButton = document.querySelector('.completed-tasks__open-button');
// const taskTemplate = document.querySelector('.list-item-template').content.querySelector('.list-item').cloneNode(true);
const assignedTasksList = document.querySelector('.assigned-tasks__list');
let tasksArray = ['default task1'];
let completedTasksArray = [];

function openTaskAddPopup() {
  taskAddPopup.classList.add('task-add-popup_opened');
}

function clearTaskAddFormInput() {
  taskAddInput.value = '';
}

function closeTaskAddPopup() {
  taskAddPopup.classList.remove('task-add-popup_opened');
}

function toggleCompletedTasksList() {
  completedTasksList.classList.toggle('completed-tasks__list_opened');
}

function createNewTask(task = taskAddInput.value) {
  const taskTemplate = document.querySelector('.list-item-template').content.querySelector('.list-item').cloneNode(true);
  taskTemplate.querySelector('.list-item__text').textContent = task;
  return taskTemplate;
}

function addTaskToStorage(taskText, storageKey) {
  let tasks = localStorage.getItem(storageKey);
  tasks ? tasks = tasks + ',' + taskText : tasks = taskText;
  localStorage.setItem(storageKey, tasks);
}

function insertTaskPrepend(task, parentNode) {
  parentNode.prepend(task);
}

function removeTask(e) {
  if (e.target.classList.contains('list-item__delete-button')) {
    let taskText = e.target.closest('.list-item').querySelector('.list-item__text').textContent;
    if (e.target.closest('.assigned-tasks__list')) {
      removeTaskFromStorage(taskText, 'assignedTasks')
    } else if (e.target.closest('.completed-tasks__list')) {
      removeTaskFromStorage(taskText, 'completedTasks')
    }
    e.target.closest('.list-item').remove();
  }
}

function isCheckboxClicked(e) {
  if (e.target.classList.contains('list-item__checkbox')) {
    return true;
  } else {
    return false;
  }
}

function getCheckedTask(e) {
  return e.target.closest('.list-item');
}

function isCheckedTaskFromAssigned(e) {
  if (e.target.closest('ol').classList.contains('assigned-tasks__list') && e.target.checked) {
    return true;
  } else {
    return false;
  }
}

function isCheckedTaskFromCompleted(e) {
  if (e.target.closest('ol').classList.contains('completed-tasks__list') && !e.target.checked) {
    return true;
  } else {
    return false;
  }
}

function getTaskTextFromCheckedTask(e) {
  return e.target.closest('.list-item').querySelector('.list-item__text').textContent;
}

function removeTaskFromStorage(taskText, storageKey) {
  let tasksArray = localStorage.getItem(storageKey).split(',');
  let newTaskArray = tasksArray.filter(task => {
    return task !== taskText;
  });
  localStorage.setItem(storageKey, newTaskArray);
}

function toggleTaskCheck(e) {
  if (isCheckboxClicked(e)) {
    const task = getCheckedTask(e);
    let taskText = getTaskTextFromCheckedTask(e);
    if (isCheckedTaskFromAssigned(e)) {
      removeTaskFromStorage(taskText, 'assignedTasks');
      addTaskToStorage(taskText, 'completedTasks');
      insertTaskPrepend(task, completedTasksList);
    } else if (isCheckedTaskFromCompleted(e)) {
      removeTaskFromStorage(taskText, 'completedTasks');
      addTaskToStorage(taskText, 'assignedTasks');
      insertTaskPrepend(task, assignedTasksList);
    }
  }
}




if (!localStorage.getItem('assignedTasks')) {
  localStorage.setItem('assignedTasks', tasksArray);
} else {
  let tasks = localStorage.getItem('assignedTasks');
  tasksArray = tasks.split(',');
}
tasksArray.forEach(task => {
  let taskNode = createNewTask(task);
  insertTaskPrepend(taskNode, assignedTasksList);
});

if (!localStorage.getItem('completedTasks')) {
  localStorage.setItem('completedTasks', completedTasksArray);
} else {
  let tasks = localStorage.getItem('completedTasks');
  completedTasksArray = tasks.split(',');
}
completedTasksArray.forEach(task => {
  let taskNode = createNewTask(task);
  insertTaskPrepend(taskNode, completedTasksList);
});


taskAddButton.addEventListener('click', openTaskAddPopup);

taskAddPopupCloseButton.addEventListener('click', () => {
  closeTaskAddPopup();
  clearTaskAddFormInput()
});

toggleCompletedTasksListButton.addEventListener('click', toggleCompletedTasksList);

taskAddForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (taskAddInput.value) {
    insertTaskPrepend(createNewTask(), assignedTasksList);
    closeTaskAddPopup();
    addTaskToStorage(taskAddInput.value, 'assignedTasks');
    clearTaskAddFormInput();
  }
});

document.addEventListener('click', (e) => {
  removeTask(e);
  toggleTaskCheck(e);
})