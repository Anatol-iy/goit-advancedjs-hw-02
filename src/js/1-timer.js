import flatpickr from 'flatpickr'; // Импорт библиотеки flatpickr для работы с календарем
import 'flatpickr/dist/flatpickr.min.css'; // Импорт стилей для календаря
import iziToast from 'izitoast'; // Импорт библиотеки для отображения уведомлений
import 'izitoast/dist/css/iziToast.min.css'; // Импорт стилей для уведомлений


const startBtn = document.querySelector('[data-start]'); 
const input = document.querySelector('#datetime-picker'); 
const daysEl = document.querySelector('[data-days]'); 
const hoursEl = document.querySelector('[data-hours]'); 
const minutesEl = document.querySelector('[data-minutes]'); 
const secondsEl = document.querySelector('[data-seconds]'); 

let userSelectedDate = null; 
let timerId = null; 

startBtn.disabled = true; // Изначально кнопка "Start" не активна,  это булевое (логическое) свойство элемента, которое может быть true или false.
// Если disabled = true, кнопка становится неактивной (заблокированной), и пользователь не может на неё нажать.
// Если disabled = false, кнопка активна и пользователь может её использовать.

//настройки flatpickr
const options = {
  enableTime: true, // Включить выбор времени
  time_24hr: true, // Использовать 24-часовой формат
  defaultDate: new Date(), // Текущая дата по умолчанию
  minuteIncrement: 1, // Шаг времени - 1 минута


  // selectedDates — это параметр, который передается в метод onClose библиотеки flatpickr.
  onClose(selectedDates) {
    const selectedDate = selectedDates[0]; // Получаем выбранную дату
    if (selectedDate <= new Date()) {
      // Если дата в прошлом, то выводим сообщение и блокируем кнопку, iziToast — это библиотека для отображения всплывающих уведомлений с различными стилями и типами сообщений, такими как успех, ошибка, предупреждение и информация.
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      // Если дата в будущем, разблокируем кнопку "Start"
      userSelectedDate = selectedDate; // Сохраняем выбранную дату
      startBtn.disabled = false; 
    }
  },
};

// сделать поле ввода даты и времени интерактивным календарём с выбором даты.
flatpickr(input, options);

// Добавляем событие на кнопку "Start"
startBtn.addEventListener('click', () => {
  // При нажатии на кнопку блокируем ее и input
  startBtn.disabled = true;
  input.disabled = true;

  // Запускаем таймер, который обновляет данные каждую секунду
  timerId = setInterval(() => {
    const currentTime = new Date(); // Текущая дата
    const timeDifference = userSelectedDate - currentTime; // Разница между выбранной и текущей датами

    if (timeDifference <= 0) {
      // Если время закончилось, остановить таймер
      clearInterval(timerId); // Останавливаем таймер
      iziToast.success({ title: 'Success', message: 'Time is up!' }); // Показываем уведомление
      return;
    }

    // Конвертируем миллисекунды в дни, часы, минуты и секунды
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    // Обновляем значения на странице
    daysEl.textContent = addLeadingZero(days); 
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000); 
});


function convertMs(ms) {
  const second = 1000; // Количество миллисекунд в одной секунде
  const minute = second * 60; // Количество миллисекунд в одной минуте
  const hour = minute * 60; // Количество миллисекунд в одном часе
  const day = hour * 24; // Количество миллисекунд в одном дне

  // Вычисляем количество дней, часов, минут и секунд
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds }; // Возвращаем объект с вычисленными значениями
}

// Функция для добавления 0 перед числом, если оно меньше 10
function addLeadingZero(value) {
  return String(value).padStart(2, '0'); // Метод padStart() добавляет 0, если строка меньше двух символов
}
