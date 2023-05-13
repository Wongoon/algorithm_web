const heapSortbtn = document.querySelector("#play");
async function heapSort(arr, n) {
    for (var i = n / 2 - 1; i >= 0; i--) {
        if(hasPressedStop){
            return;
        }
        await heapify(arr, n, i);
    }

    for (var i = n - 1; i > 0; i--) {
        if(hasPressedStop){
            return;
        }
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        arr[0].style.background = 'cyan';
        arr[i].style.background = 'green';
        swap(arr[0], arr[i]);
        await delayTime(interval);

        await heapify(arr, i, 0);
    }
}

async function heapify(arr, n, i) {
    if(hasPressedStop){
        return;
    }
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    if (l < n && parseInt(arr[l].style.height) > parseInt(arr[largest].style.height)) {
        arr[l].style.background = 'lightblue';
        arr[largest].style.background = 'cyan';
        largest = l;
        swap(arr[largest], arr[l]);
        arr[l].style.background = '#695cfe';
    }

    if (r < n && parseInt(arr[r].style.height) > parseInt(arr[largest].style.height)) { 
        arr[r].style.background = 'lightgreen';
        arr[largest].style.background = 'cyan'; 
        largest = r;
        swap(arr[largest], arr[r]);
        arr[l].style.background = '#695cfe'; 
    }

    if (largest != i) {
        var temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        swap(arr[i], arr[largest]);

        heapify(arr, n, largest);
    }
}

heapSortbtn.addEventListener("click", async function () {
    let arr = document.querySelectorAll('.bar');
    let n = arr.length;

    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await heapSort(arr, n);
    arr[0].style.background = 'green';
    if (hasPressedStop) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});