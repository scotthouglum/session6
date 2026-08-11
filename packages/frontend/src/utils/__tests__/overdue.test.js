import { isOverdue, getOverdueCount } from '../overdue';

describe('isOverdue', () => {
  const today = new Date('2026-08-11T12:00:00Z');

  it('should return true for an incomplete todo with a due date in the past', () => {
    const todo = { dueDate: '2026-08-10', completed: 0 };
    expect(isOverdue(todo, today)).toBe(true);
  });

  it('should return false for an incomplete todo due today', () => {
    const todo = { dueDate: '2026-08-11', completed: 0 };
    expect(isOverdue(todo, today)).toBe(false);
  });

  it('should return false for an incomplete todo with a due date in the future', () => {
    const todo = { dueDate: '2026-08-12', completed: 0 };
    expect(isOverdue(todo, today)).toBe(false);
  });

  it('should return false for a todo with no due date', () => {
    const todo = { dueDate: null, completed: 0 };
    expect(isOverdue(todo, today)).toBe(false);
  });

  it('should return false for a completed todo with a past due date', () => {
    const todo = { dueDate: '2026-08-10', completed: 1 };
    expect(isOverdue(todo, today)).toBe(false);
  });
});

describe('getOverdueCount', () => {
  const today = new Date('2026-08-11T12:00:00Z');

  it('should return 0 for an empty array', () => {
    expect(getOverdueCount([], today)).toBe(0);
  });

  it('should count only overdue todos in a mixed list', () => {
    const todos = [
      { dueDate: '2026-08-10', completed: 0 }, // overdue
      { dueDate: '2026-08-11', completed: 0 }, // due today, not overdue
      { dueDate: '2026-08-12', completed: 0 }, // future, not overdue
      { dueDate: null, completed: 0 }, // no due date, not overdue
      { dueDate: '2026-08-09', completed: 1 }, // completed, not overdue
      { dueDate: '2026-08-01', completed: 0 }, // overdue
    ];
    expect(getOverdueCount(todos, today)).toBe(2);
  });

  it('should return 0 when no todos are overdue', () => {
    const todos = [
      { dueDate: '2026-08-12', completed: 0 },
      { dueDate: null, completed: 0 },
    ];
    expect(getOverdueCount(todos, today)).toBe(0);
  });
});
