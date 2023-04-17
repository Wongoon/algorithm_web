const dropdown = document.querySelector('.dropdown');
const select = document.querySelector('.select');
const caret = document.querySelector('.caret');
const options = document.querySelectorAll('.menu li');
const selected = document.querySelector('.selected');
const menubar = document.querySelector('.menu');


select.addEventListener('click', function(){
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menubar.classList.toggle('menu-open');
});

options.forEach(option => {
    option.addEventListener('click', function(){
        selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menubar.classList.remove('menu-open');
        options.forEach(option => {
            option.classList.remove('active');
        });
        option.classList.add('active');
    });
});