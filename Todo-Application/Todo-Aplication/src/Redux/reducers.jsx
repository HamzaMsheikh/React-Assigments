import { SET_USER, SET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actions';

const initialState = {
  user: null,
  todos: []
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_TODOS:
      return { ...state, todos: action.payload };
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case DELETE_TODO:
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    default:
      return state;
  }
};