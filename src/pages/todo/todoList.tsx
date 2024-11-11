// todoList.tsx
import React, { useCallback } from 'react';
import { useAtom } from 'jotai';
import { todosAtom, filterAtom } from './atoms';
import { Todo } from './types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [filter] = useAtom(filterAtom);

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const toggleTodo = useCallback((id: number): void => {
    setTodos(draft => {
      const todo = draft.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    });
  }, [setTodos]);

  const deleteTodo = useCallback((id: number): void => {
    setTodos(draft => {
      const index = draft.findIndex(t => t.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  }, [setTodos]);

  return (
    <ul className="space-y-2">
      {filteredTodos.map((todo: Todo) => (
        <li 
          key={todo.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
            />
            <span 
              className={`${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-600 focus:outline-none"
            aria-label="Delete todo"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;