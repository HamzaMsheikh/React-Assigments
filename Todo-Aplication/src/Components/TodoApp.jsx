import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../Firebase/firebaseConfig';
import { setTodos } from '../Redux/actions';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import TodoItem from './TodoItem';
import Footer from './Footer';

const TodoApp = () => {
  const [todoText, setTodoText] = useState('');
  const user = useSelector(state => state.user);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const todosRef = collection(db, 'todos', user.uid, 'userTodos');
      const unsubscribe = onSnapshot(todosRef, (snapshot) => {
        const todosData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text,
            completed: data.completed,
            createdAt: data.createdAt?.toDate() || new Date()
          };
        });
        dispatch(setTodos(todosData));
      }, (error) => {
        console.error("Error fetching todos:", error);
      });
      return () => unsubscribe();
    }
  }, [user, dispatch]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      const newTodo = {
        text: todoText,
        completed: false,
        createdAt: new Date()
      };
      try {
        await addDoc(collection(db, 'todos', user.uid, 'userTodos'), newTodo);
        setTodoText('');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      alert(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <motion.div
        className="flex-1 p-4 md:p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-full md:max-w-2xl mx-auto bg-white p-4 md:p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Todos</h2>
            <motion.button
              onClick={handleLogout}
              className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
          <form onSubmit={handleAddTodo} className="mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Add a new todo"
                className="w-full md:flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
              />
              <motion.button
                type="submit"
                className="w-full md:w-auto bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 text-base md:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.button>
            </div>
          </form>
          <ul className="space-y-2 md:space-y-3">
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center text-base md:text-lg">No todos yet!</p>
            ) : (
              todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </ul>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default TodoApp;