import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './Firebase/firebaseConfig';
import { setUser } from './Redux/actions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/Home';
import Auth from './Components/Auth';
import TodoApp from './Components/TodoApp';
import './App.css';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      dispatch(setUser(user ? user.toJSON() : null));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/todos" element={user ? <TodoApp /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default App;