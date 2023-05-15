const bubSortbtn = document.querySelector("#play");

async function bubble() {
    const ele = document.querySelectorAll(".bar");
    for(let i = 0; i < ele.length - 1; i++){
        for(let j = 0; j < ele.length - i - 1; j++){
            if(hasPressedStop){
                return;
            }
            ele[j].style.background = '#ffd54f';
            ele[j + 1].style.background = '#ffd54f';
            if(parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)){
                await delayTime(interval);
                swap(ele[j], ele[j + 1]);
            }
            ele[j].style.background = '#695cfe';
            ele[j + 1].style.background = '#695cfe';
        }
        ele[ele.length - 1 - i].style.background = '#338a3e';
    }
    ele[0].style.background = '#338a3e';
}

bubSortbtn.addEventListener('click', async function(){
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await bubble();
    if(hasPressedStop){
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});