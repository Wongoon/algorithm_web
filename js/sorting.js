const dropdown = document.querySelector('.dropdown');
const options = document.querySelectorAll('.option div');
const text = document.getElementById('size');

dropdown.addEventListener('click', function(){
    dropdown.classList.toggle('active');
});

options.forEach((option) => {
    option.addEventListener('click', function(){
        text.value = this.outerText;
    });
});