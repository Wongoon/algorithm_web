function swap(el1, el2) {
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
}

function disableSortingBtn(){
    document.querySelector("#play").disabled = true;
}

function enableSortingBtn(){
    document.querySelector("#play").disabled = false;
}

function disableSizeSlider(){
    document.querySelector("#size").disabled = true;
}

function disableSpeedSlider(){
    document.querySelector("#speed").disabled = true;
}

function enableSpeedSlider(){
    document.querySelector("#speed").disabled = false;
}

function enableSizeSlider(){
    document.querySelector("#size").disabled = false;
}

function disableNewArrayBtn(){
    document.querySelector("#random").disabled = true;
}

function enableNewArrayBtn(){
    document.querySelector("#random").disabled = false;
}

function enableStopSortingBtn(){
    document.querySelector("#stop").disabled = false;
}

function disableStopSortingBtn(){
    document.querySelector("#stop").disabled = true;
}

function enableResetBtn(){
    document.querySelector("#reset").classList.remove('invisible');
    document.querySelector("#play").classList.add('invisible');
}

function disableResetBtn(){
    document.querySelector("#reset").classList.add('invisible');
    document.querySelector("#play").classList.remove('invisible');
}

function delayTime(milisec) { 
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec); 
    });
}

let arraySize = document.querySelector('#size');
let inputSize = document.querySelector('#sizeValue');
let size = parseInt(arraySize.value);
arraySize.innerHTML = size;

arraySize.addEventListener('input', function(){
    size = parseInt(arraySize.value);
    createNewArray(size);
    inputSize.value = size;
});

inputSize.addEventListener('change', function(){
    if(parseInt(inputSize.value) < parseInt(inputSize.min)){
        inputSize.value = parseInt(inputSize.min);
    }
    if(parseInt(inputSize.value) > parseInt(inputSize.max)){
        inputSize.value = parseInt(inputSize.max);
    }
    arraySize.value = parseInt(inputSize.value);
    size = parseInt(arraySize.value);
    createNewArray(size);
});

let speedRange = document.querySelector('#speed');
let speedSize = document.querySelector('#rangeValue');
let interval = parseInt(speedRange.value);

speedRange.addEventListener('input', function(){
    interval = parseInt(speedRange.value);
    speedSize.value = interval;
});

speedSize.addEventListener('change', function(){
    if(parseInt(speedSize.value) < parseInt(speedSize.min)){
        speedSize.value = parseInt(speedSize.min);
    }
    if(parseInt(speedSize.value) > parseInt(speedSize.max)){
        speedSize.value = parseInt(speedSize.max);
    }
    speedRange.value = parseInt(speedSize.value);
    interval = parseInt(speedRange.value);
});

let barArray = [];

createNewArray(size);

function createNewArray(length) {
    deleteChild();
    disableStopSortingBtn();

    barArray = [];
    while (barArray.length < length) {
        let randNum = Math.floor(Math.random() * length) + 1;
        if (barArray.indexOf(randNum) === -1) {
            barArray.push(randNum);
        }
    }

    const bars = document.querySelector(".canvas");

    for (let i = 0; i < length; i++) {
        const bar = document.createElement("div");
        let height = 100 / length;
        bar.style.height = barArray[i] * height + '%';
        bar.style.width = 'calc(100% /' + length + ')';
        bar.classList.add('bar');
        bars.appendChild(bar);
    }
    enableSpeedSlider();
    disableResetBtn();
    enableSortingBtn();
}

function deleteChild() {
    const bar = document.querySelector(".canvas");
    bar.innerHTML = '';
}

function ResetArray(){
    const bars = document.querySelectorAll(".bar");
    for(let i = 0; i < bars.length; i++){
        bars[i].style.height = 100 * barArray[i] / size + '%';
        bars[i].style.background = "#695cfe";
    }
    hasPressedStop = false;
}

let hasPressedStop = false;
const newArrayButton = document.querySelector("#random");
newArrayButton.addEventListener("click", function(){
    hasPressedStop = false;
    enableSpeedSlider();
    enableSortingBtn();
    enableSizeSlider();
    disableResetBtn();
    createNewArray(arraySize.value);
});

const stopSortingButton = document.querySelector("#stop");
stopSortingButton.addEventListener("click", function(){
    disableSortingBtn();
    disableSizeSlider();
    disableResetBtn();
    enableSizeSlider();
    hasPressedStop = true;
});

const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", function(){
    ResetArray();
    disableResetBtn();
    enableSortingBtn();
    enableSpeedSlider();
});