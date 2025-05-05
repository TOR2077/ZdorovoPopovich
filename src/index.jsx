import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Импортируем основной компонент приложения
import './index.css'; // Если у тебя есть стили, например, для приложения

// Рендерим приложение в корневой элемент
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
