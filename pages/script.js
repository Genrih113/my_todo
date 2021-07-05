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


function openTaskAddPopup() {
  taskAddPopup.classList.add('task-add-popup_opened');
}

function closeTaskAddPopup() {
  taskAddPopup.classList.remove('task-add-popup_opened');
  taskAddInput.value = '';
}

function toggleCompletedTasksList() {
  completedTasksList.classList.toggle('completed-tasks__list_opened');
}

function createNewTask() {
  const taskTemplate = document.querySelector('.list-item-template').content.querySelector('.list-item').cloneNode(true);
  const assignedTasksList = document.querySelector('.assigned-tasks__list');

  taskTemplate.querySelector('.list-item__text').textContent = taskAddInput.value;
  assignedTasksList.prepend(taskTemplate);
}

function removeTask(e) {
  if (e.target.classList.contains('list-item__delete-button')) {
    e.target.closest('.list-item').remove();
  }
}

function toggleTaskCheck(e) {
  if (e.target.classList.contains('list-item__checkbox')) {
    const task = e.target.closest('.list-item');
    if (e.target.closest('ol').classList.contains('assigned-tasks__list') && e.target.checked) {
      completedTasksList.prepend(task);
    } else if (e.target.closest('ol').classList.contains('completed-tasks__list') && !e.target.checked) {
      assignedTasksList.prepend(task);
    }
  }
}


taskAddButton.addEventListener('click', openTaskAddPopup);

taskAddPopupCloseButton.addEventListener('click', closeTaskAddPopup);

toggleCompletedTasksListButton.addEventListener('click', toggleCompletedTasksList);

taskAddForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createNewTask();
  closeTaskAddPopup();
});

document.addEventListener('click', (e) => {
  removeTask(e);
  toggleTaskCheck(e);
})