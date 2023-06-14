const radixSortbtn = document.querySelector("#play");
async function radix(arrOfNums) {
    const ele = document.querySelectorAll('.bar');
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
radixSortbtn.addEventListener('click', async function(){
    const ele = document.querySelectorAll('.bar');
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await radix(barArray);
    if(hasPressedStop){
        disableSpeedSlider();
    }
    else{
        enableSizeSlider();
        for(let i = 0; i < ele.length; i++){
            ele[i].style.background = "#338a3e";
            await delayTime(interval);
        }
    }
    enableResetBtn();
    enableNewArrayBtn();
    disableStopSortingBtn();
});