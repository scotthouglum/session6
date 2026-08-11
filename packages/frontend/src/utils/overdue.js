/**
 * Derived, non-persisted overdue status for todo items.
 */

function toDateOnly(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isOverdue(todo, today = new Date()) {
  if (!todo || todo.completed || !todo.dueDate) {
    return false;
  }

  const due = toDateOnly(new Date(`${todo.dueDate}T00:00:00`));
  const current = toDateOnly(today);

  return due < current;
}

function getOverdueCount(todos, today = new Date()) {
  return todos.reduce((count, todo) => (isOverdue(todo, today) ? count + 1 : count), 0);
}

export { isOverdue, getOverdueCount };
