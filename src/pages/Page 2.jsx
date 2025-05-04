import React, { useEffect } from 'react';

function Page2() {
  useEffect(() => {
    // Текст на главной кнопке
    TelegramWebApp.MainButton.setText("Вернуться на первую страницу");
    TelegramWebApp.MainButton.show();
  }, []);

  return (
    <div>
      <h1>Работает</h1>
      <p>Это вторая страница.</p>
    </div>
  );
}

export default Page2;
