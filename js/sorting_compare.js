async function selectionSort(ele){
    for(let i = 0; i < ele.length; i++){
        if(hasPressedStop){
            return;
        }
        ele[i].style.background = "#f06292";
        let min_index = i;
        for(let j = i+1; j < ele.length; j++){
            if(hasPressedStop){
                return;
            }
            ele[j].style.background = '#ffd54f';

            await delayTime(interval);
            if(hasPressedStop){
                return;
            }
            if(parseFloat(ele[j].style.height) < parseFloat(ele[min_index].style.height)){
                if(min_index !== i){
                    ele[min_index].style.background = '#695cfe';
                }
                min_index = j;
            }
            else{
                ele[j].style.background = '#695cfe';
            }
        }
        await delayTime(interval);
        if(hasPressedStop){
            return;
        }
        swap(ele[min_index], ele[i]);
        ele[min_index].style.background = '#695cfe';
        ele[i].style.background = '#695cfe';
    }
}

async function insertionSort(ele){
    ele[0].style.background = '#695cfe';
    for(let i = 1; i < ele.length; i++){
        if(hasPressedStop){
            return;
        }
        let j = i - 1;
        let key = ele[i].style.height;
        ele[i].style.background = '#ffd54f';

        await delayTime(interval);
        if(hasPressedStop){
            return;
        }

        while(j >= 0 && (parseFloat(ele[j].style.height) > parseFloat(key))){
            if(hasPressedStop){
                return;
            }
            ele[j].style.background = '#ffd54f';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await delayTime(interval);
            if(hasPressedStop){
                return;
            }
            for(let k = i; k >= 0; k--){
                ele[k].style.background = '#695cfe';
            }
        }
        ele[j + 1].style.height = key;
        ele[i].style.background = '#695cfe';
    }
}

async function bubbleSort(ele) {
    for(let i = 0; i < ele.length - 1; i++){
        for(let j = 0; j < ele.length - i - 1; j++){
            if(hasPressedStop){
                return;
            }
            ele[j].style.background = '#ffd54f';
            ele[j + 1].style.background = '#ffd54f';
            if(parseFloat(ele[j].style.height) > parseFloat(ele[j + 1].style.height)){
                await delayTime(interval);
                swap(ele[j], ele[j + 1]);
            }
            ele[j].style.background = '#695cfe';
            ele[j + 1].style.background = '#695cfe';
        }
        ele[ele.length - 1 - i].style.background = '#695cfe';
    }
}

async function shellSort(elements) {
    const n = elements.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            if (hasPressedStop) {
                return;
            }

            const current = elements[i];
            const currentValue = parseFloat(current.style.height);
            let j = i;

            while (j >= gap && parseFloat(elements[j - gap].style.height) > currentValue) {
                if (hasPressedStop) {
                    return;
                }

                elements[j].style.background = '#ffd54f';
                elements[j - gap].style.background = '#ffd54f';

                await delayTime(interval);

                if (hasPressedStop) {
                    return;
                }

                swap(elements[j], elements[j - gap]);

                elements[j].style.background = '#695cfe';
                elements[j - gap].style.background = '#695cfe';

                j -= gap;
            }
        }
        if (hasPressedStop) {
            return;
        }

        gap = Math.floor(gap / 2);
        for(let i = 0; gap > 0 && i < n; i++){
            elements[i].style.background = '#695cfe';
        }
        await delayTime(interval);
    }
}

async function partitionLomuto(ele, l, r){
    let i = l - 1;
    ele[r].style.background = '#ffd54f';
    for(let j = l; j <= r - 1; j++){
        if(hasPressedStop){
            return;
        }
        ele[j].style.background = 'yellow';
        await delayTime(interval);
        if(hasPressedStop){
            return;
        }
        if(parseFloat(ele[j].style.height) < parseFloat(ele[r].style.height)){
            i++;
            swap(ele[i], ele[j]);
            ele[i].style.background = 'orange';
            if(i != j) ele[j].style.background = 'orange';
            await delayTime(interval);
        }
        else{
            ele[j].style.background = 'pink';
        }
    }
    i++; 
    if(hasPressedStop){
        return;
    }
    await delayTime(interval);
    if(hasPressedStop){
        return;
    }
    swap(ele[i], ele[r]);
    ele[r].style.background = 'pink';

    if(hasPressedStop){
        return;
    }
    await delayTime(interval);
    if(hasPressedStop){
        return;
    }
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != '#338a3e'){
            ele[k].style.background = '#695cfe';
        }
    }

    return i;
}

async function quickSort(ele, l, r){
    if(l < r){
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }
}

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

    if (l < n && parseFloat(arr[l].style.height) > parseFloat(arr[largest].style.height)) {
        largest = l;
        swap(arr[largest], arr[l]);
    }

    if (r < n && parseFloat(arr[r].style.height) > parseFloat(arr[largest].style.height)) {
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

async function merge(ele, low, mid, high){
    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        if(hasPressedStop){
            return;
        }
        await delayTime(interval);
        ele[low + i].style.background = '#ff5555';
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        if(hasPressedStop){
            return;
        }
        await delayTime(interval);
        ele[mid + 1 + i].style.background = '#55ffff';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await delayTime(interval);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        if(hasPressedStop){
            return;
        }
        await delayTime(interval);
        
        if(parseFloat(left[i]) <= parseFloat(right[j])){
            ele[k].style.background = '#695cfe';
            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            ele[k].style.background = '#695cfe';
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
        if(hasPressedStop){
            return;
        }
        await delayTime(interval);
        ele[k].style.background = '#695cfe';
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        if(hasPressedStop){
            return;
        }
        await delayTime(interval);
        ele[k].style.background = '#695cfe';
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSort(ele, l, r){
    if(l >= r){
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

async function radixSort(ele, arrOfNums) {
    let maxDigitCount = mostDigits(arrOfNums);
    for (let k = 0; k < maxDigitCount; k++) {
        if(hasPressedStop){
            return;
        }
        let digitBuckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < arrOfNums.length; i++) {
            let digit = getDigit(arrOfNums[i], k);
            digitBuckets[digit].push(arrOfNums[i]);
            ele[i].style.background = "#f06292";
            await delayTime(interval);
            if(hasPressedStop){
                return;
            }
        }
        arrOfNums = [].concat(...digitBuckets);
        if(hasPressedStop){
            return;
        }
        for(let i = 0; i < arrOfNums.length; i++){
            ele[i].style.height = 100 * arrOfNums[i] / size + '%';
            ele[i].style.background = "#695cfe";
            await delayTime(interval);
            if(hasPressedStop){
                return;
            }
        }
    }
}

function getDigit(num, p){
    return Math.floor(Math.abs(num) / Math.pow(10, p)) % 10;
}

function digitCount(num) {
    if (num === 0){
        return 1;
    }
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        if(hasPressedStop){
            return;
        }
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}