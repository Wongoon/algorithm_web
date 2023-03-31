const body = document.querySelector('body');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    body.classList.toggle('dark');
});