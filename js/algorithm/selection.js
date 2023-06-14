const selectionSortbtn = document.querySelector("#play");
async function selection(){
    const ele = document.querySelectorAll(".bar");
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

selectionSortbtn.addEventListener('click', async function(){
    const ele = document.querySelectorAll('.bar');
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await selection();
    if(hasPressedStop){
        disableSpeedSlider();
    }
    else{
        enableSizeSlider();
        for(let i = 0; i < ele.length; i++){
            ele[i].style.background = '#338a3e';
            await delayTime(interval);
        }
    }
    enableResetBtn();
    enableNewArrayBtn();
    disableStopSortingBtn();
});