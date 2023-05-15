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
        arr[0].style.background = '#ffd54f';
        arr[i].style.background = '#338a3e';
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
        largest = l;
        swap(arr[largest], arr[l]);
    }

    if (r < n && parseInt(arr[r].style.height) > parseInt(arr[largest].style.height)) {
        largest = r;
        swap(arr[largest], arr[r]);
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
    arr[0].style.background = '#338a3e';
    if (hasPressedStop) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});