import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/contextAuth';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import categoryReducer from './features/category';
import questionsReducer from './features/questions';
import currentIndexReducer from './features/currentIndex';
import scoreReducer from './features/score';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    questions: questionsReducer,
    currentIndex: currentIndexReducer,
    score: scoreReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
        <App />
    </Provider>
  </AuthContextProvider>
);
