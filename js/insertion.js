const inSortbtn = document.querySelector("#play");
async function insertion(){
    const ele = document.querySelectorAll(".bar");
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
    for(let i = 0; i < ele.length; i++){
        ele[i].style.background = '#338a3e';
        await delayTime(interval / 8);
    }
}

inSortbtn.addEventListener('click', async function(){
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await insertion();
    if(hasPressedStop){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});