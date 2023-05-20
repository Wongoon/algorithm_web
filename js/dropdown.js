const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    select.addEventListener('click', function(){
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', function(){
            if(selected.id == 'select1'){
                if(option.innerHTML != document.querySelector('#select2').innerHTML){
                    selected.innerText = option.innerText;
                    options.forEach(option => {
                        option.classList.remove('active');
                    });
                    option.classList.add('active');
                }
            }
            else if(selected.id == 'select2'){
                if(option.innerHTML != document.querySelector('#select1').innerHTML){
                    selected.innerText = option.innerText;
                    options.forEach(option => {
                        option.classList.remove('active');
                    });
                    option.classList.add('active');
                }
            }
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
        });
    });
});