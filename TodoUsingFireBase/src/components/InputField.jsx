import React from "react";

function InputField({ inputTextType, todoInput, handleTodoInput }) {
  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5 mb-2"
        type={inputTextType}
        value={todoInput}
        placeholder="Enter your todo"
        onChange={handleTodoInput}
      />
    </div>
  );
}

export default InputField;
