/* eslint-disable no-undef */

/**
 * Adiciona uma nova tarefa em uma lista existente sem mutar a lista original.
 * @param {string[]} tasks
 * @param {string} taskText
 * @returns {string[]}
 */
const addTask = (tasks, taskText) => {
  const text = String(taskText).trim();
  if (text === '') {
    return tasks;
  }

  return [...tasks, text];
};

/**
 * Remove uma tarefa pelo índice em uma lista existente sem mutar a lista original.
 * @param {string[]} tasks
 * @param {number} index
 * @returns {string[]}
 */
const removeTask = (tasks, index) => {
  if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
    return tasks;
  }

  return tasks.filter((_, itemIndex) => itemIndex !== index);
};

/**
 * Atualiza a lista de tarefas no DOM.
 * @param {string[]} tasks
 * @param {HTMLElement} listElement
 */
const renderTasks = (tasks, listElement) => {
  if (!listElement || typeof listElement.appendChild !== 'function') {
    return;
  }

  listElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.textContent = task;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remover';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
      currentTasks = removeTask(currentTasks, index);
      renderTasks(currentTasks, listElement);
    });

    item.appendChild(removeButton);
    listElement.appendChild(item);
  });
};

let currentTasks = [];

/**
 * Configura a interação entre o DOM e a lógica da aplicação.
 */
const bindEvents = () => {
  const input = document.getElementById('task-input');
  const addButton = document.getElementById('add-button');
  const taskList = document.getElementById('task-list');

  if (!input || !addButton || !taskList) {
    return;
  }

  addButton.addEventListener('click', () => {
    currentTasks = addTask(currentTasks, input.value);
    if (input.value.trim() !== '') {
      input.value = '';
    }
    renderTasks(currentTasks, taskList);
  });

  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addButton.click();
    }
  });
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    renderTasks(currentTasks, document.getElementById('task-list'));
  });
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    addTask,
    removeTask,
  };
}
