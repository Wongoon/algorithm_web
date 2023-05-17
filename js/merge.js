const mergeSortbtn = document.querySelector("#play");
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
            if((n1 + n2) === ele.length){
                ele[k].style.background = '#338a3e';
            }
            else{
                ele[k].style.background = '#695cfe';
            }
            
            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            if((n1 + n2) === ele.length){
                ele[k].style.background = '#338a3e';
            }
            else{
                ele[k].style.background = '#695cfe';
            } 
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
        if((n1 + n2) === ele.length){
            ele[k].style.background = '#338a3e';
        }
        else{
            ele[k].style.background = '#695cfe';
        }
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        if(hasPressedStop){
            return;
        }
        await delayTime(interval);
        if((n1 + n2) === ele.length){
            ele[k].style.background = '#338a3e';
        }
        else{
            ele[k].style.background = '#695cfe';
        }
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

mergeSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    hasPressedStop = false;
    let r = parseFloat(ele.length) - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await mergeSort(ele, l, r);
    if(hasPressedStop){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});