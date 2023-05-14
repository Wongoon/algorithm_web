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

function delayTime(milisec) { 
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec); 
    });
}

let arraySize = document.querySelector('#size');
let size = parseInt(arraySize.value);
arraySize.innerHTML = size;

arraySize.addEventListener('input', function(){
    size = parseInt(arraySize.value);
    createNewArray(size);
    document.getElementById('sizeValue').innerHTML = size;
});

let speedRange = document.querySelector('#speed');
let interval = 125 / parseFloat(speedRange.value);

speedRange.addEventListener('input', function(){
    interval = 125 / parseFloat(speedRange.value);
    document.getElementById('rangeValue').innerHTML = this.value + 'x';
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
}

function deleteChild() {
    const bar = document.querySelector(".canvas");
    bar.innerHTML = '';
}

const newArrayButton = document.querySelector("#random");
newArrayButton.addEventListener("click", function(){
    hasPressedStop = false;
    enableSpeedSlider();
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});

const stopSortingButton = document.querySelector("#stop");
stopSortingButton.addEventListener("click", function(){
    disableSortingBtn();
    disableSizeSlider();
    hasPressedStop = true;
})