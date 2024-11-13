// todoInput.tsx
import React, { useState, FormEvent } from 'react';
import { useSetAtom } from 'jotai';
import { todosAtom } from './atoms';

const TodoInput: React.FC = () => {
  const setTodos = useSetAtom(todosAtom);
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!input.trim()) return;

    setTodos(draft => {
      draft.push({
        id: Date.now(),
        text: input.trim(),
        completed: false,
      });
    });

    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Add a new todo..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoInput;
