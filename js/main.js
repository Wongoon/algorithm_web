const body = document.querySelector('body');
const btn = document.getElementById('btn');
const dontmove = document.querySelector('.dontmove');
const menu = document.querySelector('#sub');
const navIn = document.querySelector('.nav_in');

let toggle = true;

btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    body.classList.toggle('dark');
});

dontmove.addEventListener('click', (e) => {
    e.preventDefault();
});

menu.addEventListener("click", function(){
    if(toggle){
        navIn.style.display = 'block';
        navIn.classList.add('down');
        navIn.classList.remove('up');
    }
    else{
        navIn.classList.add('up');
        navIn.classList.remove('down');
    }
    toggle = !toggle;
});