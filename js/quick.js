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

// Quick sort algorithm
function quickSort(lowIndex, highIndex) {
    if (lowIndex < highIndex) {
        let partitionIndex = partition(lowIndex, highIndex);
        quickSort(lowIndex, partitionIndex - 1);
        quickSort(partitionIndex + 1, highIndex);
    }
}
  
// Partition the array for quick sort
function partition(lowIndex, highIndex) {
    // Use the last element as the pivot
    let pivot = arr[highIndex];
    let i = lowIndex - 1;

    for (let j = lowIndex; j < highIndex; j++) {
        if (arr[j] < pivot) {
            i++;
            swapBars(i, j);
        }
    }

    // Move the pivot to its final position
    swapBars(i + 1, highIndex);
    return i + 1;
}
  
// Start animation
function startAnimation() {
    animationPaused = false;
    if (animationId !== null) {
        continueAnimation();
    }
    else {
        animationId = setInterval(() => {
            quickSort(0, size - 1);
        }, interval);
    }
}

// Continue animation
function continueAnimation() {
    if (animationId === null) {
        animationId = setInterval(() => {
            quickSort(0, size - 1);
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

start.addEventListener('click', function(){
    startAnimation();
    start.classList.add('btn_invisible');
    pause.classList.remove('btn_invisible');
});

pause.addEventListener('click', function(){
    pause.classList.add('btn_invisible');
    start.classList.remove('btn_invisible');
    pauseAnimation();
});

// Initialize
generateArray(size);