import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { v4 as uuid } from "uuid";
import TodoTable from "../components/TodoTable";
import { db } from "../Firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function HomeDashBoard() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [todoFilter, setTodoFilter] = useState("all");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodoList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          checked: doc.data().checked,
        }))
      );
    });
    return () => unsubscribe();
  }, []);
  
  const handleTodoInput = (e) => {
    setTodoInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (todoInput.trim() !== "") {
        await addDoc(collection(db, "todos"), {
          todo: todoInput,
          id: uuid(),
          checked: false,
        });
        setTodoInput("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpdate = async (id, data) => {
    try {
      const todoToUpdate = todoList.find((todo) => todo.id === id);
      const updatedTodoRef = doc(db, "todos", todoToUpdate.id);
      await updateDoc(updatedTodoRef, { todo: data });

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id ? { ...todo, todo: data } : todo
        )
      );
      setTodoInput("");
      setIsEdit(false);
      setSelectedTodoId(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    isEdit(false);
    setSelectedTodoId(null);
  };

  const handleFilter = (filterType) => {
    setTodoFilter(filterType);
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
        todoFilter={todoFilter}
      />
    </div>
  );
}

export default HomeDashBoard;
