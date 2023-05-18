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

    const bars1 = document.querySelector("#canvas1");
    const bars2 = document.querySelector("#canvas2");

    for (let i = 0; i < length; i++) {
        const bar1 = document.createElement("div");
        const bar2 = document.createElement("div");
        let height = 100 / length;
        bar1.style.height = barArray[i] * height + '%';
        bar1.style.width = 'calc(100% /' + length + ')';
        bar1.classList.add('bar');
        bars1.appendChild(bar1);
        bar2.style.height = barArray[i] * height + '%';
        bar2.style.width = 'calc(100% /' + length + ')';
        bar2.classList.add('bar');
        bars2.appendChild(bar2);
    }
}

function deleteChild() {
    const bar1 = document.querySelector("#canvas1");
    const bar2 = document.querySelector("#canvas2");
    bar1.innerHTML = '';
    bar2.innerHTML = '';
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