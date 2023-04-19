const li = document.querySelectorAll('.tablink');
const contents = document.querySelectorAll('.contents');

li.forEach((tablink) => {
    tablink.addEventListener('click', function(){
        let tab = tablink.getAttribute('data-tab');
        let content = document.getElementById(tab);

        li.forEach((tablink) => {
            tablink.classList.remove('current');
        })
        contents.forEach((content) => {
            content.classList.remove('current');
        })
        tablink.classList.add('current');
        content.classList.add('current');
    });
});