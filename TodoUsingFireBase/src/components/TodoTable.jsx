import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import Checkbox from "./Checkbox";

function TodoTable({
  todoList,
  setTodoInput,
  setIsEdit,
  setSelectedTodoId,
  setTodoList,
  todoFilter,
}) {
  const filteredList = (() => {
    if (todoFilter === "completed") {
      return todoList.filter((todo) => todo.checked);
    } else if (todoFilter === "incomplete") {
      return todoList.filter((todo) => !todo.checked);
    } else {
      return todoList;
    }
  })();

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  const handleEdit = async (id, data) => {
    try {
      setTodoInput(data);
      setIsEdit(true);
      setSelectedTodoId(id);
    } catch (error) {
      console.message(error.message);
    }
  };

  const check_box_select = async (id) => {
    try {
      const todoToUpdate = todoList.find((todo) => todo.id === id);
      const updatedTodoRef = doc(db, "todos", todoToUpdate.id);
      const updateId = !todoToUpdate.checked;
      await updateDoc(updatedTodoRef, { checked: updateId });

      const updatedData = await getDocs(collection(db, "todos"));
      const updatedTodoList = updatedData.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        checked: doc.data().checked,
      }));
      setTodoList(updatedTodoList);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-y-auto  sm:h-[300px] lg:h-[330px] xl:h-[500px]">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
          <tbody>
            {filteredList.map((todotable) => (
              <tr
                key={todotable.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className=" flex justify-between px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p className=" text-balance  truncate break-all w-[100%] flex gap-2">
                    <Checkbox
                      todoCheck={todotable.checked}
                      handleCheckBox={() => check_box_select(todotable.id)}
                    />
                    {todotable.todo}
                  </p>
                  <div className="flex justify-between text-xl gap-2">
                    <MdDelete onClick={() => handleDelete(todotable.id)} />
                    <FaEdit
                      onClick={() => handleEdit(todotable.id, todotable.todo)}
                    />
                    {todotable.checked && <p className="text-sm"> Completed</p>}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoTable;
