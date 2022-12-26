const btnRegister = document.getElementById('btnRegister');
const btnLoginPage = document.getElementById('btnLoginPage');

btnRegister.addEventListener('click', (event) => {
  event.preventDefault();
  document.location.href = '/register';
});

btnLoginPage.addEventListener('click', (event) => {
  event.preventDefault();
  document.location.href = '/login';
});
