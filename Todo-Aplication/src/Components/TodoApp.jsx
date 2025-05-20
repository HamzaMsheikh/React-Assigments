import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../Firebase/firebaseConfig';
import { setTodos } from '../Redux/actions';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import TodoItem from './TodoItem';

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
        console.log("Fetched todos:", todosData); // Debug ke liye
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
      // Redux state already null ho jayega via onAuthStateChanged
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Todos</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <form onSubmit={handleAddTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Add a new todo"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </form>
        <ul>
          {todos.length === 0 ? (
            <p className="text-gray-500">No todos yet!</p>
          ) : (
            todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;