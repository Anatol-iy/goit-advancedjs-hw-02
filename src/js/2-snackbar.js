import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault(); // Зупиняємо перезавантаження сторінки

  // Створюємо об'єкт FormData, щоб отримати дані з форми
  const formData = new FormData(e.target);

  // Отримуємо значення затримки і стану з форми
  const delay = parseInt(formData.get('delay')); // отримаємо значення delay
  const state = formData.get('state'); // отримаємо значення обраного стану

  // Створюємо проміс
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // проміс успішний
      } else {
        reject(delay); // проміс відхилено
      }
    }, delay);
  });

  // Обробляємо результат промісу
  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        timeout: 5000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        timeout: 5000,
      });
    });
}
