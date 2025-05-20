import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './Firebase/firebaseConfig';
import { setUser } from './Redux/actions';
import Auth from './Components/Auth';
import TodoApp from './Components/TodoApp';
import './App.css';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      dispatch(setUser(user ? user.toJSON() : null)); // User object ko serializable format mein store karo
    });
    return () => unsubscribe();
  }, [dispatch]);

  return user ? <TodoApp /> : <Auth />;
};

export default App;