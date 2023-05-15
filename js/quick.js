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
        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
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
    ele[i].style.background = '#338a3e';

    if(hasPressedStop){
        return;
    }
    await delayTime(interval);
    if(hasPressedStop){
        return;
    }
    
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != '#338a3e')
            ele[k].style.background = '#695cfe';
    }

    return i;
}

async function quickSort(ele, l, r){
    if(l < r){
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }
    else{
        if(l >= 0 && r >= 0 && l < ele.length && r < ele.length){
            ele[r].style.background = '#338a3e';
            ele[l].style.background = '#338a3e';
        }
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
    for(let i = 0; i < ele.length; i++){
        ele[i].style.background = '#338a3e';
    }
    if(hasPressedStop){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});