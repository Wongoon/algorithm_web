const shellSortbtn = document.querySelector("#play");
async function shellSort() {
    const elements = document.querySelectorAll('.bar');
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

shellSortbtn.addEventListener('click', async function () {
    const ele = document.querySelectorAll('.bar');
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await shellSort();
    if (hasPressedStop == true) {
        disableSpeedSlider();
    }
    else {
        enableSizeSlider();
        for(let i = 0; i < ele.length; i++){
            ele[i].style.background = '#338a3e';
            await delayTime(10);
        }
    }
    enableResetBtn();
    enableNewArrayBtn();
    disableStopSortingBtn();
});