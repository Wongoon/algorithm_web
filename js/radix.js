const radixSortbtn = document.querySelector("#play");
async function radix(){
    barArray.forEach(element => {
        let num = getDigit(element, 2);
        console.log(num);
    });
}
function getDigit(num, p){
    return Math.floor(Math.abs(num) / Math.pow(10, p)) % 10
}
radixSortbtn.addEventListener('click', async function(){
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await radix();
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