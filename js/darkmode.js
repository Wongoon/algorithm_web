window.onload = function() {
    let theme = localStorage.getItem("theme");
    const btn = document.getElementById('btn');
    const body = document.querySelector('body');

    if(theme == null || theme == "light"){
        btn.classList.add('active');
        body.classList.add('dark');
    }
    else if(theme == "dark"){
        btn.classList.remove('active');
        body.classList.remove('dark');
    }
    
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        body.classList.toggle('dark');
    
        if(theme == null || theme == "light"){
            localStorage.setItem("theme", "dark");
        }
        else if(theme == "dark"){
            localStorage.setItem("theme", "light");
        }
    });
};