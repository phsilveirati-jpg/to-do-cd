/* eslint-disable no-undef */

const STORAGE_KEY = 'todo-cd-tasks';

/**
 * @param {string} task
 * @returns {{text:string,done:boolean}}
 */
const stringToTask = (task) => ({ text: String(task).trim(), done: false });

/**
 * Adiciona uma nova tarefa em uma lista existente sem mutar a lista original.
 * @param {Array<Object|string>} tasks
 * @param {string} taskText
 * @returns {Array<Object|string>}
 */
const addTask = (tasks, taskText) => {
  const text = String(taskText).trim();
  if (text === '') {
    return tasks;
  }

  const hasObjectTask = tasks.some((item) => item && typeof item === 'object' && 'text' in item);
  return [...tasks, hasObjectTask ? { text, done: false } : text];
};

/**
 * Remove uma tarefa pelo índice em uma lista existente sem mutar a lista original.
 * @param {Array} tasks
 * @param {number} index
 * @returns {Array}
 */
const removeTask = (tasks, index) => {
  if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
    return tasks;
  }

  return tasks.filter((_, itemIndex) => itemIndex !== index);
};

/**
 * Alterna o estado de conclusão de uma tarefa.
 * @param {Array<Object|string>} tasks
 * @param {number} index
 * @returns {Array<Object|string>}
 */
const toggleTaskCompletion = (tasks, index) => {
  if (!Number.isInteger(index) || index < 0 || index >= tasks.length) {
    return tasks;
  }

  return tasks.map((task, itemIndex) => {
    if (itemIndex !== index) {
      return task;
    }

    if (typeof task === 'string') {
      return task;
    }

    return { ...task, done: !task.done };
  });
};

/**
 * Limpa a lista de tarefas.
 * @returns {Array}
 */
const clearTasks = () => [];

/**
 * Normaliza tarefas recebidas do localStorage.
 * @param {Array} tasks
 * @returns {Array<{text:string,done:boolean}>}
 */
const normalizeTasks = (tasks) => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks
    .map((task) => {
      if (typeof task === 'string') {
        return stringToTask(task);
      }

      if (task && typeof task === 'object') {
        return {
          text: String(task.text ?? '').trim(),
          done: Boolean(task.done),
        };
      }

      return null;
    })
    .filter((task) => task && task.text !== '');
};

const loadTasks = () => {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return [];
  }

  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return normalizeTasks(JSON.parse(rawData));
  } catch {
    return [];
  }
};

const saveTasks = (tasks) => {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const getTaskData = (task) => (typeof task === 'string' ? stringToTask(task) : task);

const updateTaskCounter = (tasks, counterElement) => {
  if (!counterElement) {
    return;
  }

  const total = tasks.length;
  const completed = tasks.filter((task) => (typeof task === 'string' ? false : task.done)).length;
  const taskLabel = total === 1 ? 'tarefa' : 'tarefas';
  const doneLabel = completed === 1 ? 'concluída' : 'concluídas';

  counterElement.textContent = `${total} ${taskLabel} • ${completed} ${doneLabel}`;
};

const createTaskItem = (task, index, removeHandler, toggleHandler) => {
  const normalizedTask = getTaskData(task);
  const item = document.createElement('li');
  item.className = `task-item${normalizedTask.done ? ' completed' : ''}`;

  const taskContent = document.createElement('div');
  taskContent.className = 'task-content';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = normalizedTask.done;
  checkbox.className = 'task-checkbox';
  checkbox.setAttribute('aria-label', `Marcar ${normalizedTask.text} como concluída`);
  checkbox.addEventListener('change', () => toggleHandler(index));

  const label = document.createElement('span');
  label.textContent = normalizedTask.text;

  taskContent.append(checkbox, label);

  const taskActions = document.createElement('div');
  taskActions.className = 'task-actions';

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.textContent = 'Remover';
  removeButton.className = 'remove-button';
  removeButton.addEventListener('click', () => removeHandler(index));

  taskActions.appendChild(removeButton);
  item.append(taskContent, taskActions);

  return item;
};

/**
 * Atualiza a lista de tarefas no DOM.
 * @param {Array} tasks
 * @param {HTMLElement} listElement
 */
const renderTasks = (tasks, listElement) => {
  if (!listElement || typeof listElement.appendChild !== 'function') {
    return;
  }

  listElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = createTaskItem(
      task,
      index,
      (taskIndex) => {
        currentTasks = removeTask(currentTasks, taskIndex);
        saveTasks(currentTasks);
        renderTasks(currentTasks, listElement);
        updateTaskCounter(currentTasks, document.getElementById('task-count'));
      },
      (taskIndex) => {
        currentTasks = toggleTaskCompletion(currentTasks, taskIndex);
        saveTasks(currentTasks);
        renderTasks(currentTasks, listElement);
        updateTaskCounter(currentTasks, document.getElementById('task-count'));
      }
    );

    listElement.appendChild(taskElement);
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
  const clearButton = document.getElementById('clear-button');
  const taskCount = document.getElementById('task-count');

  if (!input || !addButton || !taskList) {
    return;
  }

  const addCurrentTask = () => {
    currentTasks = addTask(currentTasks, input.value);
    if (input.value.trim() !== '') {
      input.value = '';
      saveTasks(currentTasks);
    }
    renderTasks(currentTasks, taskList);
    updateTaskCounter(currentTasks, taskCount);
  };

  addButton.addEventListener('click', addCurrentTask);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addCurrentTask();
    }
  });

  clearButton?.addEventListener('click', () => {
    currentTasks = clearTasks();
    saveTasks(currentTasks);
    renderTasks(currentTasks, taskList);
    updateTaskCounter(currentTasks, taskCount);
  });
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    currentTasks = loadTasks();
    bindEvents();
    renderTasks(currentTasks, document.getElementById('task-list'));
    updateTaskCounter(currentTasks, document.getElementById('task-count'));
  });
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    addTask,
    removeTask,
    toggleTaskCompletion,
    clearTasks,
    normalizeTasks,
  };
}
