import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault(); 
    
  const formData = new FormData(e.target);

  
  const delay = parseInt(formData.get('delay')); 
  const state = formData.get('state'); 


  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); 
      } else {
        reject(delay); 
      }
    }, delay);
  });

  
  promise
    .then(delay => {
        iziToast.success({       
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        icon: '',
        progressBar: false,
      });
    })
    .catch(delay => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          icon: '',
          progressBar: false,
        });
    });
}
