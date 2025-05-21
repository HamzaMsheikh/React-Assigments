import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../Firebase/firebaseConfig';
import { setTodos } from '../Redux/actions';
import { collection, onSnapshot, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { motion } from 'framer-motion';
import TodoItem from './TodoItem';
import Footer from './Footer';

const TodoApp = () => {
  const [todoText, setTodoText] = useState('');
  const [category, setCategory] = useState('General');
  const [tags, setTags] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [recurrence, setRecurrence] = useState('None');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sharedWithEmail, setSharedWithEmail] = useState('');
  const user = useSelector(state => state.user);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const categories = ['General', 'Work', 'Personal', 'Shopping'];
  const priorities = ['Low', 'Medium', 'High'];
  const recurrences = ['None', 'Daily', 'Weekly', 'Monthly'];

  // Request Notification Permission
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Fetch Todos
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
            createdAt: data.createdAt?.toDate() || new Date(),
            category: data.category || 'General',
            tags: data.tags || [],
            priority: data.priority || 'Low',
            dueDate: data.dueDate ? new Date(data.dueDate) : null,
            recurrence: data.recurrence || 'None',
            sharedWith: data.sharedWith || [],
          };
        });
        dispatch(setTodos(todosData));
      }, (error) => {
        console.error("Error fetching todos:", error);
      });
      return () => unsubscribe();
    }
  }, [user, dispatch]);

  // Reminder Check
  useEffect(() => {
    const checkReminders = setInterval(() => {
      todos.forEach(todo => {
        if (todo.dueDate && !todo.completed) {
          const now = new Date();
          const due = new Date(todo.dueDate);
          if (now >= due && Notification.permission === 'granted') {
            new Notification(`Reminder: ${todo.text}`, {
              body: `Due date: ${due.toLocaleString()}`,
            });
          }
        }
      });
    }, 60000); // Check every minute
    return () => clearInterval(checkReminders);
  }, [todos]);

  // Handle Recurring Tasks
  useEffect(() => {
    const handleRecurringTasks = async () => {
      const now = new Date();
      for (const todo of todos) {
        if (todo.recurrence !== 'None' && todo.completed) {
          let nextDueDate;
          const currentDueDate = new Date(todo.dueDate);
          switch (todo.recurrence) {
            case 'Daily':
              nextDueDate = new Date(currentDueDate.setDate(currentDueDate.getDate() + 1));
              break;
            case 'Weekly':
              nextDueDate = new Date(currentDueDate.setDate(currentDueDate.getDate() + 7));
              break;
            case 'Monthly':
              nextDueDate = new Date(currentDueDate.setMonth(currentDueDate.getMonth() + 1));
              break;
            default:
              continue;
          }
          if (now >= currentDueDate) {
            await updateDoc(doc(db, 'todos', user.uid, 'userTodos', todo.id), {
              completed: false,
              dueDate: nextDueDate.toISOString(),
            });
          }
        }
      }
    };
    const interval = setInterval(handleRecurringTasks, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [todos, user]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      const newTodo = {
        text: todoText,
        completed: false,
        createdAt: new Date(),
        category: category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        priority: priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        recurrence: recurrence,
        sharedWith: [], // Initialize sharedWith as an empty array
      };
      try {
        await addDoc(collection(db, 'todos', user.uid, 'userTodos'), newTodo);
        setTodoText('');
        setCategory('General');
        setTags('');
        setPriority('Low');
        setDueDate('');
        setRecurrence('None');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleShareTodo = async (todoId) => {
    if (!sharedWithEmail) {
      alert("Please enter an email to share with.");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sharedWithEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      // Add to sharedTodos collection
      await addDoc(collection(db, 'sharedTodos'), {
        todoId: todoId,
        owner: user.uid,
        sharedWith: [sharedWithEmail],
      });
      // Update the original todo with sharedWith emails
      await updateDoc(doc(db, 'todos', user.uid, 'userTodos', todoId), {
        sharedWith: arrayUnion(sharedWithEmail),
      });
      setSharedWithEmail('');
      alert("Todo shared successfully!");
    } catch (error) {
      console.error("Error sharing todo:", error);
      alert(`Failed to share todo: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredTodos = filterCategory === 'All' 
    ? todos 
    : todos.filter(todo => todo.category === filterCategory);

  // Progress Tracking
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

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
          {/* Progress Tracking */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {completedCount} of {totalCount} tasks completed ({progress.toFixed(1)}%)
            </p>
          </div>
          <form onSubmit={handleAddTodo} className="mb-4 md:mb-6">
            <div className="flex flex-col md:flex-row gap-3 mb-3">
              <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Add a new todo"
                className="w-full md:flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full md:w-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
              >
                {priorities.map(pri => (
                  <option key={pri} value={pri}>{pri}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mb-3">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma-separated)"
                className="w-full md:flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
              />
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
              />
              <select
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
                className="w-full md:w-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
              >
                {recurrences.map(rec => (
                  <option key={rec} value={rec}>{rec}</option>
                ))}
              </select>
            </div>
            <motion.button
              type="submit"
              className="w-full md:w-auto bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 text-base md:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add
            </motion.button>
          </form>
          <div className="mb-4">
            <label className="text-gray-700 mr-2">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <ul className="space-y-2 md:space-y-3">
            {filteredTodos.length === 0 ? (
              <p className="text-gray-500 text-center text-base md:text-lg">No todos in this category!</p>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onShare={() => handleShareTodo(todo.id)}
                  sharedWithEmail={sharedWithEmail}
                  setSharedWithEmail={setSharedWithEmail}
                />
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

