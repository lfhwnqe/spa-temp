// todo.tsx
import React from "react";
import { Provider } from "jotai";
import TodoList from "./todoList";
import TodoInput from "./todoInput";
import TodoFilter from "./todoFilter";

const Todo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Todo App
        </h1>
        <TodoInput />
        <TodoFilter />
        <TodoList />
      </div>
    </div>
  );
};
Todo.whyDidYouRender = true;
export default Todo;
