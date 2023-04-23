let arr = [];
let original_arr = [];
let bars = [];
let currentIndex = 0;
let minIndex = 0;
let animationId = null;
let animationPaused = true;

let dropdownMenu = document.querySelector('.dropdown');
let sizeRange = document.getElementById("size");
let RandomBtn = document.getElementById("random");
let speedRange = document.getElementById("speed");
let speedText = document.getElementById("rangeValue");
let start = document.getElementById('play');
let pause = document.getElementById('pause');
let reset = document.getElementById('reset');

let size = parseInt(sizeRange.value);
let speed = parseFloat(speedRange.value);
let interval = 500 / speed;
speedText.textContent = String(speed) + 'x';

RandomBtn.addEventListener("click", function(){
    generateArray(size);
    pause.classList.add('btn_invisible');
    start.classList.remove('btn_invisible');
});

dropdownMenu.addEventListener('click', function(){
    size = parseInt(sizeRange.value);
})

function rangeSlider(value){
    speedText.innerHTML = value + 'x';
    speed = parseFloat(value);
    interval = 250 / speed;
}

function generateArray(length) {
    arr = [];
    original_arr = [];
    while (arr.length < length) {
        let randNum = Math.floor(Math.random() * length) + 1;
        if (arr.indexOf(randNum) === -1) {
            arr.push(randNum);
            original_arr.push(randNum);
        }
    }
    generateBars();
    currentIndex = 0;
    minIndex = 0;
    pauseAnimation();
}

// Generate bars based on array values
function generateBars() {
    const canvas = document.querySelector('.canvas');
    canvas.innerHTML = '';
    bars = [];
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement('div');
        let height = 100 / size;
        bar.classList.add('bar');
        bar.style.width = 'calc(100% / ' + size + ')';
        bar.style.height = arr[i] * height + '%';
        canvas.appendChild(bar);
        bars.push(bar);
    }
}

// Swap two bars in the array
function swapBars(index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    const tempBarHeight = bars[index1].style.height;
    bars[index1].style.height = bars[index2].style.height;
    bars[index2].style.height = tempBarHeight;
}

// Shell sort algorithm
function shellSort() {
    if (currentIndex >= arr.length - 1) {
        pauseAnimation();
        return;
    }
    let gap = Math.floor(arr.length / 2);
    while (gap > 0) {
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                swapBars(j, j - gap);
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    currentIndex = arr.length - 1;
    start.classList.remove('btn_invisible');
    pause.classList.add('btn_invisible');
}
  


// Start animation
function startAnimation() {
    animationPaused = false;
    if (animationId !== null) {
        continueAnimation();
    }
    else {
        animationId = setInterval(() => {
            shellSort();
        }, interval);
    }
}

// Continue animation
function continueAnimation() {
    if (animationId === null) {
        animationId = setInterval(() => {
            shellSort();
        }, interval);
    }
}

// Pause animation
function pauseAnimation() {
    if (animationId !== null) {
        clearInterval(animationId);
        animationId = null;
        animationPaused = true;
    }
}

// Reset animation
function resetAnimation() {
    for (let i = 0; i < size; i++) {
        arr[i] = original_arr[i];
    }
    generateBars();
    currentIndex = 0;
    minIndex = 0;
    pauseAnimation();
}

reset.addEventListener('click', function(){
    pause.classList.add('btn_invisible');
    start.classList.remove('btn_invisible');
    resetAnimation();
});

play.addEventListener('click', function(){
    startAnimation();
    play.classList.add('btn_invisible');
    pause.classList.remove('btn_invisible');
});

pause.addEventListener('click', function(){
    pause.classList.add('btn_invisible');
    start.classList.remove('btn_invisible');
    pauseAnimation();
});

// Initialize
generateArray(size);