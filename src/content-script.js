document.addEventListener('selectionchange', function (event) {
    let selectionText = window.getSelection().toString();
    if (selectionText.length)
        chrome.runtime.sendMessage({
            message: selectionText
        }).catch(e => console.error(e))
})