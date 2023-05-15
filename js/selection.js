const selectionSortbtn = document.querySelector("#play");
async function selection(){
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < ele.length; i++){
        if(hasPressedStop){
            return;
        }
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
            if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){
                if(min_index !== i){
                    ele[min_index].style.background = '#695cfe';
                }
                min_index = j;
            }
            else{
                ele[j].style.background = '#695cfe';
            }
        }
        ele[min_index].style.background = "#f06292";
        ele[i].style.background = "#f06292";
        await delayTime(interval);
        if(hasPressedStop){
            return;
        }
        swap(ele[min_index], ele[i]);
        ele[min_index].style.background = '#695cfe';
        ele[i].style.background = '#338a3e';
    }
}

selectionSortbtn.addEventListener('click', async function(){
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
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});