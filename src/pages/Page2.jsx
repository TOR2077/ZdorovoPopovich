import React, { useEffect } from 'react';

function Page2() {
  useEffect(() => {
    // Текст на главной кнопке
    window.Telegram.WebApp.MainButton.setText("Вернуться на первую страницу");
    window.Telegram.WebApp.MainButton.show();
  }, []);

  return (
    <div>
      <h1>Работает</h1>
      <p>Это вторая страница.</p>
    </div>
  );
}

export default Page2;
