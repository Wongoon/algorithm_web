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

// Merge sort algorithm
function mergeSort(arr, left, right) {
    if (left >= right) {
        return;
    }
    const middle = Math.floor((left + right) / 2);
    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);
    merge(arr, left, middle, right);
}

function merge(arr, left, middle, right) {
    const tempArr = [];
    let i = left;
    let j = middle + 1;
    while (i <= middle && j <= right) {
        if (arr[i] < arr[j]) {
            tempArr.push(arr[i]);
            i++;
        } else {
            tempArr.push(arr[j]);
            j++;
        }
    }
    while (i <= middle) {
        tempArr.push(arr[i]);
        i++;
    }
    while (j <= right) {
        tempArr.push(arr[j]);
        j++;
    }
    for (let k = 0; k < tempArr.length; k++) {
        arr[left + k] = tempArr[k];
    }
}

// Start merge sort
function startMergeSort() {
    pauseAnimation();
    mergeSort(arr, 0, arr.length - 1);
    generateBars();
}

// Start animation
function startAnimation() {
    animationPaused = false;
    if (animationId !== null) {
        continueAnimation();
    }
    else {
        animationId = setInterval(() => {
            startMergeSort();
        }, interval);
    }
}

// Continue animation
function continueAnimation() {
    if (animationId === null) {
        animationId = setInterval(() => {
            startMergeSort();
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
    console.log(animationId + ' + ' + animationPaused);
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