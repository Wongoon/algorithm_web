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

function swap(el1, el2) {
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
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

function delayTime(milisec) { 
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec); 
    });
}

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
    enableSpeedSlider();
    enableSortingBtn();
}

function deleteChild() {
    const bar1 = document.querySelector("#canvas1");
    const bar2 = document.querySelector("#canvas2");
    bar1.innerHTML = '';
    bar2.innerHTML = '';
}

let hasPressedStop = false;
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
    enableSizeSlider();
    hasPressedStop = true;
});

const sortingButton = document.querySelector("#play");
sortingButton.addEventListener('click', async function(){
    const bar1 = document.querySelectorAll('#canvas1 .bar');
    const bar2 = document.querySelectorAll('#canvas2 .bar');
    const select1 = document.querySelector('#select1');
    const select2 = document.querySelector('#select2');
    
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await sorting(bar1, bar2, select1, select2);
    if(hasPressedStop){
        disableSpeedSlider();
    }
    else {
        enableSizeSlider();
    }
    enableSortingBtn();
    enableNewArrayBtn();
    disableStopSortingBtn();
});

async function runSimultaneously(sort1, sort2){
    let promise1 = sort1;
    let promise2 = sort2;

    await Promise.all([promise1, promise2]);
}

function func(){
    console.log('func');
}

async function sorting(bar1, bar2, select1, select2){
    let sort1 = func();
    let sort2 = func();
    switch (select1.innerHTML){
        case '단순 선택 정렬':
            sort1 = selectionSort(bar1);
            break;
        case '단순 삽입 정렬':
            sort1 = insertionSort(bar1);
            break;
        case '버블 정렬':
            sort1 = bubbleSort(bar1);
            break;
        case '셸 정렬':
            sort1 = shellSort(bar1);
            break;
        case '퀵 정렬':
            sort1 = quickSort(bar1, 0, bar1.length - 1);
            break;
        case '힙 정렬':
            sort1 = heapSort(bar1, bar1.length);
            break;
        case '합병 정렬':
            sort1 = mergeSort(bar1, 0, bar1.length - 1);
            break;
        case '기수 정렬':
            sort1 = radixSort(bar1, barArray);
            break;
        default:
            alert('Error');
            break;
    }
    switch (select2.innerHTML){
        case '단순 선택 정렬':
            sort2 = selectionSort(bar2);
            break;
        case '단순 삽입 정렬':
            sort2 = insertionSort(bar2);
            break;
        case '버블 정렬':
            sort2 = bubbleSort(bar2);
            break;
        case '셸 정렬':
            sort2 = shellSort(bar2);
            break;
        case '퀵 정렬':
            sort2 = quickSort(bar2, 0, bar2.length - 1);
            break;
        case '힙 정렬':
            sort2 = heapSort(bar2, bar2.length);
            break;
        case '합병 정렬':
            sort2 = mergeSort(bar2, 0, bar2.length - 1);
            break;
        case '기수 정렬':
            sort2 = radixSort(bar2, barArray);
            break;
        default:
            alert('Error');
            break;
    }
    await runSimultaneously(sort1, sort2);
    console.log('finish');
}