// Function to sort the tracks by track timestamp on the webpage
function sortByTrackTimestamp() {
    document.querySelector('.select__wrapper')?.children[0].click();
    document.querySelector('a[data-link-id="track-timestamp"]')?.click();
}

// Define the config for the observers
const config = { childList: true, subtree: true };
                
let initialSortComplete = false;

const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === 1) {
                /** On page load, wait for the wrapper containing the button to get added */
                if (!initialSortComplete && node.matches('.select__wrapper')) {
                    sortByTrackTimestamp();
                    initialSortComplete = true;
                }
                /** On page change, wait for 200ms before trying to click the button */
                /** TODO: Figure out how to remove the timeout by observing changes within the listenDetails div  */
                if (node.className === 'listenDetails') {
                    setTimeout(sortByTrackTimestamp, 200);
                }
                /** TODO: When going back or forward, the automatic sorting is not working yet */
            }
        }
    }
});

observer.observe(document.body, config);
