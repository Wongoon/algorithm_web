const quickSortbtn = document.querySelector("#play");
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

quickSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = ele.length - 1;
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await quickSort(ele, l, r);
    if(hasPressedStop){
        disableSpeedSlider();
    }
    else {
        enableSizeSlider();
        for(let i = 0; i < ele.length; i++){
            ele[i].style.background = '#338a3e';
            await delayTime(interval / 8);
        }
    }
    enableResetBtn();
    enableNewArrayBtn();
    disableStopSortingBtn();
});