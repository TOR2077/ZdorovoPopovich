const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_BOT_TOKEN' на токен, полученный от @BotFather
const token = 'YOUR_BOT_TOKEN';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, "Добро пожаловать! Нажмите кнопку ниже, чтобы открыть приложение:", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Открыть приложение",
            web_app: { url: "https://your-app-url.com" } // Замените на URL вашего приложения
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});

// Обработчик ошибок
bot.on('polling_error', (error) => {
  console.log(error);
});

console.log('Бот запущен!'); 