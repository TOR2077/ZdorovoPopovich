import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    // Текст на главной кнопке
    TelegramWebApp.MainButton.setText("Перейти ко второй странице");
    TelegramWebApp.MainButton.show();
  }, []);

  return (
    <div>
      <h1>Работает</h1>
      <p>Это первая страница.</p>
    </div>
  );
}

export default Home;
