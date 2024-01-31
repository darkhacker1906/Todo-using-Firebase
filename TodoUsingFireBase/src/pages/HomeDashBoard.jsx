import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { v4 as uuid } from "uuid";
import TodoTable from "../components/TodoTable";

function HomeDashBoard() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const id = uuid();

  const handleTodoInput = (e) => {
    setTodoInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (todoInput.trim() !== "") {
        setTodoList([...todoList, { id: id, data: todoInput, checked: false }]);
        setTodoInput("");
      }
    } catch (error) {
      console.message(error.message);
    }
  };
  const handleUpdate = async (id, data) => {
    try {
      const updatedList = todoList.map((todo) => {
        return todo.id === id ? { ...todo, data: data } : todo;
      });
      setTodoList(updatedList);
    } catch (error) {
      console.message(error.message);
    }
  };
  const handleCancel = () => {
    isEdit(false);
    setSelectedTodoId(null);
  };
  return (
    <div className="w-[60%] m-auto">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-2xl text-center">Todo App</h1>
        <InputField
          InputFieldType="text"
          todoInput={todoInput}
          handleTodoInput={handleTodoInput}
        />

        {!isEdit ? (
          <Button title="Submit" handleClick={handleSubmit} />
        ) : (
          <>
            <div className="flex gap-2">
              <Button
                title="UPDATE"
                handleClick={() => handleUpdate(selectedTodoId, todoInput)}
              />
              <Button title="CANCEL" handleClick={handleCancel} />
            </div>
          </>
        )}
      </form>
      {todoList.length > 0 && (
        <div className="flex gap-2 mt-4 mb-1">
          <Button title="All" handleClick={() => handleFilter("all")}></Button>
          <Button
            title="Completed"
            handleClick={() => handleFilter("completed")}
          ></Button>
          <Button
            title="Incomplete"
            handleClick={() => handleFilter("incomplete")}
          ></Button>
        </div>
      )}
      <TodoTable
        todoList={todoList}
        setTodoInput={setTodoInput}
        setIsEdit={setIsEdit}
        setSelectedTodoId={setSelectedTodoId}
        setTodoList={setTodoList}
      />
    </div>
  );
}

export default HomeDashBoard;
