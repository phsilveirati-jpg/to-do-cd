const { addTask, removeTask } = require('../src/script');

describe('Lógica da lista de tarefas', () => {
  test('adiciona tarefa corretamente', () => {
    const tasks = ['Pagar conta'];
    const result = addTask(tasks, 'Lavar louça');

    expect(result).toEqual(['Pagar conta', 'Lavar louça']);
    expect(tasks).toEqual(['Pagar conta']);
  });

  test('não adiciona tarefa vazia', () => {
    const tasks = Object.freeze(['Pagar conta']);
    const result = addTask(tasks, '   ');

    expect(result).toBe(tasks);
    expect(result).toEqual(['Pagar conta']);
  });

  test('remove tarefa', () => {
    const tasks = ['Pagar conta', 'Lavar louça'];
    const result = removeTask(tasks, 1);

    expect(result).toEqual(['Pagar conta']);
    expect(tasks).toEqual(['Pagar conta', 'Lavar louça']);
  });

  test('não muta diretamente a lista original', () => {
    const tasks = Object.freeze(['A', 'B', 'C']);
    const added = addTask(tasks, 'D');
    const removed = removeTask(tasks, 0);

    expect(added).toEqual(['A', 'B', 'C', 'D']);
    expect(added).not.toBe(tasks);
    expect(removed).toEqual(['B', 'C']);
    expect(removed).not.toBe(tasks);
    expect(tasks).toEqual(['A', 'B', 'C']);
  });
});
