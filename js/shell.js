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
            const currentValue = parseInt(current.style.height);
            let j = i;

            while (j >= gap && parseInt(elements[j - gap].style.height) > currentValue) {
                if (hasPressedStop) {
                    return;
                }

                elements[j].style.background = 'cyan';
                elements[j - gap].style.background = 'cyan';

                await delayTime(interval);

                if (hasPressedStop) {
                    return;
                }

                swap(elements[j], elements[j - gap]);

                elements[j].style.background = '#695cfe';
                elements[j - gap].style.background = '#695cfe';

                j -= gap;
            }

            elements[j].style.background = 'green';
        }

        gap = Math.floor(gap / 2);
        for(let i = 0; gap > 0 && i < n; i++){
            elements[i].style.background = '#695cfe';
        }

        await delayTime(interval);
    }
    for(let i = 0; i < n; i++){
        elements[i].style.background = 'green';
        await delayTime(interval / 8);
    }
}

shellSortbtn.addEventListener('click', async function () {
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();
    await shellSort();
    if (hasPressedStop == true) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});