import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, deleteTodo } from '../Redux/actions';
import { db } from '../Firebase/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

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
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'todos', user.uid, 'userTodos', todo.id));
      dispatch(deleteTodo(todo.id));
    } catch (error) {
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
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.li
      className="flex flex-col md:flex-row items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg shadow-sm"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {isEditing ? (
        <form onSubmit={handleUpdate} className="w-full flex flex-col md:flex-row gap-2 mb-2 md:mb-0">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full md:flex-1 p-2 md:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            autoFocus
          />
          <motion.button
            type="submit"
            className="w-full md:w-auto bg-blue-500 text-white px-3 py-1 md:px-3 md:py-1 rounded-lg hover:bg-blue-600 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
          <motion.button
            onClick={() => setIsEditing(false)}
            className="w-full md:w-auto bg-gray-500 text-white px-3 py-1 md:px-3 md:py-1 rounded-lg hover:bg-gray-600 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </form>
      ) : (
        <div className="w-full flex items-center flex-col md:flex-row">
          <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800 text-sm md:text-base'}>
              {todo.text}
            </span>
          </div>
          <div className="flex gap-2 ml-0 md:ml-4">
            <motion.button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-lg hover:bg-yellow-600 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit
            </motion.button>
            <motion.button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 px-2 py-1 md:px-3 md:py-1 text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete
            </motion.button>
          </div>
        </div>
      )}
    </motion.li>
  );
};

export default TodoItem;