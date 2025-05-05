import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // Текст на главной кнопке
    window.Telegram.WebApp.MainButton.setText("Перейти ко второй страницу");
    window.Telegram.WebApp.MainButton.show();
  }, []);

  return (
    <div>
      <h1>Работает</h1>
      <p>Это первая страница.</p>
    </div>
  );
}

export default Home;
