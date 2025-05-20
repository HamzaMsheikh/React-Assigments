import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, deleteTodo } from '../Redux/actions';
import { db } from '../Firebase/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = async () => {
    try {
      await updateDoc(doc(db, 'todos', user.uid, 'userTodos', todo.id), {
        completed: !todo.completed
      });
      dispatch(toggleTodo(todo.id));
    } catch (error) {
      console.error("Error toggling todo:", error);
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'todos', user.uid, 'userTodos', todo.id));
      dispatch(deleteTodo(todo.id));
      console.log("Todo deleted:", todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editText.trim() && editText !== todo.text) {
      try {
        await updateDoc(doc(db, 'todos', user.uid, 'userTodos', todo.id), {
          text: editText
        });
        setIsEditing(false);
        console.log("Todo updated:", { id: todo.id, text: editText });
      } catch (error) {
        console.error("Error updating todo:", error);
        alert(error.message);
      }
    }
  };

  return (
    <li className="flex items-center justify-between p-2 border-b">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 p-1 border rounded"
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex items-center flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="mr-2"
          />
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-4 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        </div>
      )}
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;